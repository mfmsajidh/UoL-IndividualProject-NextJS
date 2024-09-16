'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';

import Loading from '@/app/[locale]/(auth)/dashboard/profile/_components/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileSkillsValidation } from '@/validations/ProfileSkillsValidation';

type ProfileSkillsFormValues = z.infer<
  ReturnType<typeof ProfileSkillsValidation>
>;

const ProfileSkillsPage = () => {
  const t = useTranslations('ProfileSkills');
  const { publicKey, signXDR } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [latestVersion, setLatestVersion] = useState<number>(0);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ProfileSkillsFormValues>({
    resolver: zodResolver(ProfileSkillsValidation(t)),
    defaultValues: {
      skills: [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

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
            const data = await fetchFromIPFS(latestCIDs.skills.latestCID);

            setValue('skills', data.skills || [{ name: '' }]);
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
          'skills',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion);
        }
      }
    } catch (error) {
      throw new Error('Error submitting Skills section');
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
            <div key={field.id} className="mb-2 flex items-center space-x-2">
              <Input
                {...register(`skills.${index}.name`)}
                placeholder={t('placeholder')}
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
            <PlusCircle className="mr-2 size-4" />
            {t('add_skill')}
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

export default ProfileSkillsPage;
