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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileLanguageValidation } from '@/validations/ProfileLanguageValidation';

type ProfileLanguageFormValues = z.infer<
  ReturnType<typeof ProfileLanguageValidation>
>;

const ProfileLanguagePage = () => {
  const t = useTranslations('ProfileLanguages');
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
  } = useForm<ProfileLanguageFormValues>({
    resolver: zodResolver(ProfileLanguageValidation(t)),
    defaultValues: {
      languages: [
        {
          language: '',
          proficiency: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  useEffect(() => {
    const fetchLatestLanguagesVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs?.languages) {
          if (latestCIDs.languages.latestVersion) {
            setLatestVersion(latestCIDs.languages.latestVersion);
          }

          if (latestCIDs.languages.latestCID) {
            const data = await fetchFromIPFS(latestCIDs.languages.latestCID);

            setValue('languages', data.languages || []);
          }
        }
      } catch (error) {
        throw new Error('Error fetching latest Languages section');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestLanguagesVersion();
  }, [publicKey, setValue]);

  const onSubmit: SubmitHandler<ProfileLanguageFormValues> = async (data) => {
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
          'languages',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion);
        }
      }
    } catch (error) {
      throw new Error('Error submitting Languages section');
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
              className="mb-4 border-b border-gray-700 pb-4 last:border-0"
            >
              <div className="space-y-4">
                {/* Language */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`languages.${index}.language`}
                    className="text-gray-200"
                  >
                    {t('language')}
                  </Label>
                  <Input
                    id={`languages.${index}.language`}
                    placeholder={t('language_placeholder')}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    {...register(`languages.${index}.language`)}
                  />
                  {errors.languages?.[index]?.language && (
                    <p className="text-xs text-red-500">
                      {errors.languages[index]?.language?.message}
                    </p>
                  )}
                </div>

                {/* Proficiency */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`languages.${index}.proficiency`}
                    className="text-gray-200"
                  >
                    {t('proficiency')}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(`languages.${index}.proficiency`, value)
                    }
                    defaultValue={field.proficiency || ''}
                  >
                    <SelectTrigger className="border-gray-600 bg-gray-700 text-white">
                      <SelectValue placeholder={t('proficiency_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="native">
                        {t('proficiency_value_native')}
                      </SelectItem>
                      <SelectItem value="full-professional">
                        {t('proficiency_value_full')}
                      </SelectItem>
                      <SelectItem value="professional">
                        {t('proficiency_value_professional')}
                      </SelectItem>
                      <SelectItem value="limited-working">
                        {t('proficiency_value_limited')}
                      </SelectItem>
                      <SelectItem value="elementary">
                        {t('proficiency_value_elementary')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.languages?.[index]?.proficiency && (
                    <p className="text-xs text-red-500">
                      {errors.languages[index]?.proficiency?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Remove Language Button */}
              {fields.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-4"
                >
                  <Trash2 className="mr-2 size-4" />
                  {t('remove_language')}
                </Button>
              )}
            </div>
          ))}

          <Button
            onClick={() =>
              append({
                language: '',
                proficiency: '',
              })
            }
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 size-4" />
            {t('add_language')}
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

export default ProfileLanguagePage;
