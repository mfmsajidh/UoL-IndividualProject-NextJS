'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Loading from '@/app/[locale]/(auth)/dashboard/profile/_components/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileAboutValidation } from '@/validations/ProfileAboutValidation';

type ProfileAboutFormValues = z.infer<
  ReturnType<typeof ProfileAboutValidation>
>;

const ProfileAboutPage = () => {
  const t = useTranslations('ProfileAbout');
  const { publicKey, signXDR } = useWallet();
  const [latestVersion, setLatestVersion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileAboutFormValues>({
    resolver: zodResolver(ProfileAboutValidation(t)),
    defaultValues: {
      name: '',
      headline: '',
      about: '',
      address: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    const fetchLatestAboutVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs?.about) {
          if (latestCIDs.about.latestVersion) {
            setLatestVersion(latestCIDs.about.latestVersion);
          }

          if (latestCIDs.about.latestCID) {
            const data = await fetchFromIPFS(latestCIDs.about.latestCID);
            setValue('name', data.name);
            setValue('headline', data.headline);
            setValue('about', data.about);
            setValue('address', data.address);
            setValue('email', data.email);
            setValue('phoneNumber', data.phoneNumber);
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
  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="mt-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                {t('full_name')}
              </Label>
              <Input
                id="name"
                placeholder={t('full_name_placeholder')}
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
                {t('headline')}
              </Label>
              <Input
                id="headline"
                placeholder={t('headline_placeholder')}
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
                {t('about')}
              </Label>
              <Textarea
                id="about"
                placeholder={t('about_placeholder')}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                {...register('about')}
              />
              {errors.about?.message && (
                <div className="my-2 text-xs italic text-red-500">
                  {errors.about.message}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-200">
                {t('address')}
              </Label>
              <Input
                id="address"
                placeholder={t('address_placeholder')}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                {...register('address')}
              />
              {errors.address?.message && (
                <div className="my-2 text-xs italic text-red-500">
                  {errors.address.message}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                {t('email')}
              </Label>
              <Input
                id="email"
                placeholder={t('email_placeholder')}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                {...register('email')}
              />
              {errors.email?.message && (
                <div className="my-2 text-xs italic text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-200">
                {t('phone_number')}
              </Label>
              <Input
                id="phoneNumber"
                placeholder={t('phone_number_placeholder')}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber?.message && (
                <div className="my-2 text-xs italic text-red-500">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('save') : t('save_profile')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileAboutPage;
