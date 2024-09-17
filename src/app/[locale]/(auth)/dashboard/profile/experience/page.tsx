'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Hint } from '@/app/[locale]/(auth)/dashboard/profile/_components/Hint';
import Loading from '@/app/[locale]/(auth)/dashboard/profile/_components/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar'; // Stellar SDK functions
import { ProfileExperienceValidation } from '@/validations/ProfileExperienceValidation';

type ProfileExperienceFormValues = z.infer<
  ReturnType<typeof ProfileExperienceValidation>
>;

const ProfileExperiencePage = () => {
  const t = useTranslations('ProfileExperience');
  const { publicKey, signXDR } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [latestVersion, setLatestVersion] = useState<number>(0); // Track the latest version

  const {
    control,
    handleSubmit,
    register,
    setValue, // Hook to set form values dynamically
    formState: { errors },
  } = useForm<ProfileExperienceFormValues>({
    resolver: zodResolver(ProfileExperienceValidation(t)),
    defaultValues: {
      experiences: [
        {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
          location: '',
          employmentType: '', // Properly initialize the field
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  useEffect(() => {
    const fetchLatestExperienceVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs?.experience) {
          if (latestCIDs.experience.latestVersion) {
            setLatestVersion(latestCIDs.experience.latestVersion);
          }

          if (latestCIDs.experience.latestCID) {
            const data = await fetchFromIPFS(latestCIDs.experience.latestCID);
            setValue('experiences', data.experiences || []);
          }
        }
      } catch (error) {
        throw new Error('Error fetching latest Experience section');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestExperienceVersion();
  }, [publicKey, setValue]);

  const onSubmit: SubmitHandler<ProfileExperienceFormValues> = async (data) => {
    if (!publicKey) return;

    try {
      setIsSubmitting(true);

      // Save the experience data to Pinata
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
          'experience',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion); // Update the version locally after success
        }
      }
    } catch (error) {
      throw new Error('Error submitting Experience section');
    } finally {
      setIsSubmitting(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="mt-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-6 border-b border-gray-700 pb-6 last:border-0"
            >
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`experiences.${index}.title`}
                    className="text-gray-200"
                  >
                    {t('title')}
                  </Label>
                  <Input
                    id={`experiences.${index}.title`}
                    placeholder={t('title_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`experiences.${index}.title`)}
                  />
                  {errors.experiences?.[index]?.title && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index]?.title?.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`experiences.${index}.company`}
                    className="text-gray-200"
                  >
                    {t('company')}
                  </Label>
                  <Input
                    id={`experiences.${index}.company`}
                    placeholder={t('company_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`experiences.${index}.company`)}
                  />
                  {errors.experiences?.[index]?.company && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index]?.company?.message}
                    </p>
                  )}
                </div>

                {/* Start Date and End Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`experiences.${index}.startDate`}
                      className="text-gray-200"
                    >
                      {t('start_date')}
                    </Label>
                    <Input
                      id={`experiences.${index}.startDate`}
                      type="date"
                      className="border-gray-600 bg-gray-700 text-white"
                      {...register(`experiences.${index}.startDate`)}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-xs text-red-500">
                        {errors.experiences[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`experiences.${index}.endDate`}
                      className="text-gray-200"
                    >
                      {t('end_date')}
                    </Label>
                    <Input
                      id={`experiences.${index}.endDate`}
                      type="date"
                      className="border-gray-600 bg-gray-700 text-white"
                      {...register(`experiences.${index}.endDate`)}
                    />
                    {errors.experiences?.[index]?.endDate && (
                      <p className="text-xs text-red-500">
                        {errors.experiences[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor={`experiences.${index}.description`}
                      className="text-gray-200"
                    >
                      {t('description')}
                    </Label>
                    <Hint text={t('description_hint')} />
                  </div>
                  <Textarea
                    id={`experiences.${index}.description`}
                    placeholder={t('description_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`experiences.${index}.description`)}
                  />
                  {errors.experiences?.[index]?.description && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index]?.description?.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`experiences.${index}.location`}
                    className="text-gray-200"
                  >
                    {t('location')}
                  </Label>
                  <Input
                    id={`experiences.${index}.location`}
                    placeholder={t('location_description')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`experiences.${index}.location`)}
                  />
                  {errors.experiences?.[index]?.location && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index]?.location?.message}
                    </p>
                  )}
                </div>

                {/* Employment Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`experiences.${index}.employmentType`}
                    className="text-gray-200"
                  >
                    {t('employment')}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(`experiences.${index}.employmentType`, value)
                    } // Integrate with RHF
                    defaultValue={field.employmentType || ''} // Ensure the fetched value is displayed
                  >
                    <SelectTrigger className="border-gray-600 bg-gray-700 text-white">
                      <SelectValue placeholder={t('employment_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">
                        {t('employment_value_full_time')}
                      </SelectItem>
                      <SelectItem value="part-time">
                        {t('employment_value_part_time')}
                      </SelectItem>
                      <SelectItem value="contract">
                        {t('employment_value_contract')}
                      </SelectItem>
                      <SelectItem value="freelance">
                        {t('employment_value_freelance')}
                      </SelectItem>
                      <SelectItem value="internship">
                        {t('employment_value_internship')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experiences?.[index]?.employmentType && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index]?.employmentType?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-4"
                >
                  <Trash2 className="mr-2 size-4" />
                  {t('remove_experience')}
                </Button>
              )}
            </div>
          ))}

          <Button
            onClick={() =>
              append({
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
                location: '',
                employmentType: '',
              })
            }
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 size-4" />
            {t('add_experience')}
          </Button>
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

export default ProfileExperiencePage;
