'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar'; // Stellar SDK functions
import { ProfileAboutValidation } from '@/validations/ProfileAboutValidation';

// Zod validation schema for the about section
type ProfileAboutFormValues = z.infer<typeof ProfileAboutValidation>;

const ProfileAboutPage = () => {
  const { publicKey, signXDR } = useWallet();
  const [latestVersion, setLatestVersion] = useState<number>(0); // Track the latest version
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    setValue, // Hook to set form values dynamically
    formState: { errors },
  } = useForm<ProfileAboutFormValues>({
    resolver: zodResolver(ProfileAboutValidation),
    defaultValues: {
      name: '', // Set default empty values
      headline: '', // Set default empty values
      about: '', // Set default empty values
    },
  });

  // Fetch the latest version of the about section on page load
  useEffect(() => {
    const fetchLatestAboutVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        // Check if about section exists before accessing properties
        if (latestCIDs?.about) {
          if (latestCIDs.about.latestVersion) {
            setLatestVersion(latestCIDs.about.latestVersion);
          }

          if (latestCIDs.about.latestCID) {
            // Fetch the about data from Pinata
            const response = await fetch(
              `/api/pinata?cid=${latestCIDs.about.latestCID}`,
            );

            if (response.ok) {
              const data = await response.json();

              // Set form values with fetched data
              setValue('name', data.name);
              setValue('headline', data.headline);
              setValue('about', data.about);
            }
          }
        }
      } catch (error) {
        throw new Error('Error fetching latest About section');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestAboutVersion();
  }, [publicKey, setValue]);

  // Function to handle form submission
  const onSubmit: SubmitHandler<ProfileAboutFormValues> = async (data) => {
    if (!publicKey) return;

    try {
      setIsSubmitting(true);

      // Save the about data to Pinata
      const response = await fetch('/api/pinata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const uploadResult = await response.json();
      if (response.ok) {
        const ipfsHash = uploadResult.cid;

        // Store the IPFS hash on Stellar with the incremented version
        const newVersion = latestVersion + 1;
        const signedXDR = await storeSectionHashOnStellar(
          ipfsHash,
          publicKey,
          'about',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion); // Update the version locally after success
        }
      }
    } catch (error) {
      throw new Error('Error updating About section');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form UI with loading and error handling
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                  {...register('name')}
                />
                {errors.name?.message && (
                  <div className="my-2 text-xs italic text-red-500">
                    {errors.name.message}
                  </div>
                )}
              </div>

              {/* Professional Headline */}
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-gray-200">
                  Professional Headline
                </Label>
                <Input
                  id="headline"
                  placeholder="e.g., Senior Software Engineer"
                  className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                  {...register('headline')}
                />
                {errors.headline?.message && (
                  <div className="my-2 text-xs italic text-red-500">
                    {errors.headline.message}
                  </div>
                )}
              </div>

              {/* About */}
              <div className="space-y-2">
                <Label htmlFor="about" className="text-gray-200">
                  About
                </Label>
                <Textarea
                  id="about"
                  placeholder="Tell us about yourself"
                  className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                  {...register('about')}
                />
                {errors.about?.message && (
                  <div className="my-2 text-xs italic text-red-500">
                    {errors.about.message}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileAboutPage;
