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
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileEducationValidation } from '@/validations/ProfileEducationValidation';

type ProfileEducationFormValues = z.infer<
  ReturnType<typeof ProfileEducationValidation>
>;

const ProfileEducationPage = () => {
  const t = useTranslations('ProfileEducation');
  const { publicKey, signXDR } = useWallet();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ProfileEducationFormValues>({
    resolver: zodResolver(ProfileEducationValidation(t)),
    defaultValues: {
      educations: [
        {
          school: '',
          startDate: '',
          endDate: '',
          degree: '',
          fieldOfStudy: '',
          grade: '',
          activities: '',
          description: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestVersion, setLatestVersion] = useState<number>(0);

  useEffect(() => {
    const fetchLatestEducationVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs?.education) {
          if (latestCIDs.education.latestVersion) {
            setLatestVersion(latestCIDs.education.latestVersion);
          }

          if (latestCIDs.education.latestCID) {
            const data = await fetchFromIPFS(latestCIDs.education.latestCID);
            setValue('educations', data.educations || []);
          }
        }
      } catch (error) {
        throw new Error('Error fetching latest education section');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEducationVersion();
  }, [publicKey, setValue]);

  const onSubmit: SubmitHandler<ProfileEducationFormValues> = async (data) => {
    if (!publicKey) return;

    try {
      setIsSubmitting(true);

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

        const newVersion = latestVersion + 1;
        const signedXDR = await storeSectionHashOnStellar(
          ipfsHash,
          publicKey,
          'education',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion);
        }
      }
    } catch (error) {
      throw new Error('Error submitting education form');
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
                {/* School */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor={`educations.${index}.school`}
                      className="text-gray-200"
                    >
                      {t('school')}
                    </Label>
                    <Hint text={t('school_hint')} />
                  </div>
                  <Input
                    id={`educations.${index}.school`}
                    placeholder={t('school_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.school`)}
                  />
                  {errors.educations?.[index]?.school && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.school?.message}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`educations.${index}.startDate`}
                      className="text-gray-200"
                    >
                      {t('start_date')}
                    </Label>
                    <Input
                      id={`educations.${index}.startDate`}
                      type="month"
                      className="border-gray-600 bg-gray-700 text-white"
                      {...register(`educations.${index}.startDate`)}
                    />
                    {errors.educations?.[index]?.startDate && (
                      <p className="text-xs text-red-500">
                        {errors.educations[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label
                      htmlFor={`educations.${index}.endDate`}
                      className="text-gray-200"
                    >
                      {t('end_date')}
                    </Label>
                    <Input
                      id={`educations.${index}.endDate`}
                      type="month"
                      className="border-gray-600 bg-gray-700 text-white"
                      {...register(`educations.${index}.endDate`)}
                    />
                    {errors.educations?.[index]?.endDate && (
                      <p className="text-xs text-red-500">
                        {errors.educations[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Degree */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`educations.${index}.degree`}
                    className="text-gray-200"
                  >
                    {t('degree')}
                  </Label>
                  <Input
                    id={`educations.${index}.degree`}
                    placeholder={t('degree_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.degree`)}
                  />
                  {errors.educations?.[index]?.degree && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.degree?.message}
                    </p>
                  )}
                </div>

                {/* Field of Study */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`educations.${index}.fieldOfStudy`}
                    className="text-gray-200"
                  >
                    {t('field_of_study')}
                  </Label>
                  <Input
                    id={`educations.${index}.fieldOfStudy`}
                    placeholder={t('field_of_study_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.fieldOfStudy`)}
                  />
                  {errors.educations?.[index]?.fieldOfStudy && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.fieldOfStudy?.message}
                    </p>
                  )}
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor={`educations.${index}.grade`}
                      className="text-gray-200"
                    >
                      {t('grade')}
                    </Label>
                    <Hint text={t('grade_hint')} />
                  </div>
                  <Input
                    id={`educations.${index}.grade`}
                    placeholder={t('grade_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.grade`)}
                  />
                  {errors.educations?.[index]?.grade && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.grade?.message}
                    </p>
                  )}
                </div>

                {/* Activities & Societies */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`educations.${index}.activities`}
                    className="text-gray-200"
                  >
                    {t('activities_societies')}
                  </Label>
                  <Textarea
                    id={`educations.${index}.activities`}
                    placeholder={t('activities_societies_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.activities`)}
                  />
                  {errors.educations?.[index]?.activities && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.activities?.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`educations.${index}.description`}
                    className="text-gray-200"
                  >
                    {t('description')}
                  </Label>
                  <Textarea
                    id={`educations.${index}.description`}
                    placeholder={t('description_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`educations.${index}.description`)}
                  />
                  {errors.educations?.[index]?.description && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index]?.description?.message}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                {fields.length > 1 && (
                  <Button
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-4"
                  >
                    <Trash2 className="mr-2 size-4" />
                    {t('remove_education')}
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Add education button */}
          <Button
            onClick={() =>
              append({
                school: '',
                startDate: '',
                endDate: '',
                degree: '',
                fieldOfStudy: '',
                grade: '',
                activities: '',
                description: '',
              })
            }
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 size-4" /> {t('add_education')}
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

export default ProfileEducationPage;
