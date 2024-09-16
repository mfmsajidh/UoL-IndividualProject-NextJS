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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWallet } from '@/hooks/useWallet';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar';
import { ProfileLanguageValidation } from '@/validations/ProfileLanguageValidation'; // Validation schema

// Define the form type using zod
type ProfileLanguageFormValues = z.infer<typeof ProfileLanguageValidation>;

const ProfileLanguagePage = () => {
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
  } = useForm<ProfileLanguageFormValues>({
    resolver: zodResolver(ProfileLanguageValidation),
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

  // Fetch the latest version of the languages section on page load
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
            // Fetch the languages data from Pinata
            const response = await fetch(
              `/api/pinata?cid=${latestCIDs.languages.latestCID}`,
            );

            if (response.ok) {
              const data = await response.json();

              // Set form values with fetched data
              setValue('languages', data.languages || []);
            }
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

      // Save the languages data to Pinata
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
          'languages',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion); // Update the version locally after success
        }
      }
    } catch (error) {
      throw new Error('Error submitting Languages section');
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
                  className="mb-4 border-b border-gray-700 pb-4 last:border-0"
                >
                  <div className="space-y-4">
                    {/* Language */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`languages.${index}.language`}
                        className="text-gray-200"
                      >
                        Language
                      </Label>
                      <Input
                        id={`languages.${index}.language`}
                        placeholder="Language"
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
                        Proficiency
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(`languages.${index}.proficiency`, value)
                        }
                        defaultValue={field.proficiency || ''}
                      >
                        <SelectTrigger className="border-gray-600 bg-gray-700 text-white">
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="native">
                            Native or bilingual proficiency
                          </SelectItem>
                          <SelectItem value="full-professional">
                            Full professional proficiency
                          </SelectItem>
                          <SelectItem value="professional">
                            Professional working proficiency
                          </SelectItem>
                          <SelectItem value="limited-working">
                            Limited working proficiency
                          </SelectItem>
                          <SelectItem value="elementary">
                            Elementary proficiency
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
                      <Trash2 className="mr-2 size-4" /> Remove Language
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
                <PlusCircle className="mr-2 size-4" /> Add Language
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

export default ProfileLanguagePage;
