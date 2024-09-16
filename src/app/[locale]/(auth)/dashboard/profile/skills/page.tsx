'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/useWallet';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileSkillsValidation } from '@/validations/ProfileSkillsValidation';

// Define the form type using zod
type ProfileSkillsFormValues = z.infer<typeof ProfileSkillsValidation>;

const ProfileSkillsPage = () => {
  const { publicKey, signXDR } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [latestVersion, setLatestVersion] = useState<number>(0); // Track the latest version

  // Initialize the form with zod validation
  const {
    control,
    handleSubmit,
    register,
    setValue, // Hook to set form values dynamically
    formState: { errors },
  } = useForm<ProfileSkillsFormValues>({
    resolver: zodResolver(ProfileSkillsValidation),
    defaultValues: {
      skills: [{ name: '' }], // Initialize with a single empty skill object
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills', // The name must match the 'skills' array in your validation schema
  });

  // Fetch the latest version of the skills section on page load
  useEffect(() => {
    const fetchLatestSkillsVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs?.skills) {
          if (latestCIDs.skills.latestVersion) {
            setLatestVersion(latestCIDs.skills.latestVersion);
          }

          if (latestCIDs.skills.latestCID) {
            // Fetch the skills data from Pinata
            const response = await fetch(
              `/api/pinata?cid=${latestCIDs.skills.latestCID}`,
            );

            if (response.ok) {
              const data = await response.json();

              // Set form values with fetched data
              setValue('skills', data.skills || [{ name: '' }]);
            }
          }
        }
      } catch (error) {
        throw new Error('Error fetching latest Skills section');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestSkillsVersion();
  }, [publicKey, setValue]);

  const onSubmit: SubmitHandler<ProfileSkillsFormValues> = async (data) => {
    if (!publicKey) return;

    try {
      setIsSubmitting(true);

      // Save the skills data to Pinata
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
          'skills',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion); // Update the version locally after success
        }
      }
    } catch (error) {
      throw new Error('Error submitting Skills section');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-2 flex items-center space-x-2"
                >
                  <Input
                    {...register(`skills.${index}.name`)}
                    placeholder="Enter a skill"
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                  />
                  {errors.skills?.[index]?.name && (
                    <p className="text-xs text-red-500">
                      {errors.skills[index]?.name?.message}
                    </p>
                  )}
                  {fields.length > 1 && (
                    <Button variant="destructive" onClick={() => remove(index)}>
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                onClick={() => append({ name: '' })}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <PlusCircle className="mr-2 size-4" /> Add Skill
              </Button>
            </>
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

export default ProfileSkillsPage;
