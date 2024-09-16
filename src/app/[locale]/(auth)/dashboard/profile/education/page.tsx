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
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import {
  fetchLatestSectionCIDs,
  storeSectionHashOnStellar,
  submitTransaction,
} from '@/libs/Stellar'; // Stellar SDK functions
import { ProfileEducationValidation } from '@/validations/ProfileEducationValidation';

// Define the Zod validation schema for the education section
type ProfileEducationFormValues = z.infer<typeof ProfileEducationValidation>;

const ProfileEducationPage = () => {
  const { publicKey, signXDR } = useWallet();

  const {
    control,
    handleSubmit,
    register,
    setValue, // Hook to set form values dynamically
    formState: { errors },
  } = useForm<ProfileEducationFormValues>({
    resolver: zodResolver(ProfileEducationValidation),
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

  // Initialize field array to handle dynamic form fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations', // Name of the field array
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestVersion, setLatestVersion] = useState<number>(0);

  // Fetch the latest version and CID of the education section from Stellar
  useEffect(() => {
    const fetchLatestEducationVersion = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);
        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        // Check if the education section exists before accessing properties
        if (latestCIDs?.education) {
          if (latestCIDs.education.latestVersion) {
            setLatestVersion(latestCIDs.education.latestVersion);
          }

          if (latestCIDs.education.latestCID) {
            // Fetch the education data from Pinata using the CID
            const response = await fetch(
              `/api/pinata?cid=${latestCIDs.education.latestCID}`,
            );

            if (response.ok) {
              const data = await response.json();

              // Populate the form with the fetched data
              setValue('educations', data.educations || []);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching latest education section:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEducationVersion();
  }, [publicKey, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<ProfileEducationFormValues> = async (data) => {
    if (!publicKey) return;

    try {
      setIsSubmitting(true);

      // Save the education data to Pinata
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
          'education',
          newVersion,
        );
        const signedTransaction = await signXDR(signedXDR);

        if (signedTransaction) {
          await submitTransaction(signedTransaction.signedTxXdr);
          setLatestVersion(newVersion); // Update the version locally after success
        }
      }
    } catch (error) {
      console.error('Error submitting education form:', error);
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
                  className="mb-6 border-b border-gray-700 pb-6 last:border-0"
                >
                  <div className="space-y-4">
                    {/* School */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`educations.${index}.school`}
                        className="text-gray-200"
                      >
                        School
                      </Label>
                      <Input
                        id={`educations.${index}.school`}
                        placeholder="School Name"
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
                          Start Date
                        </Label>
                        <Input
                          id={`educations.${index}.startDate`}
                          type="date"
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
                          End Date
                        </Label>
                        <Input
                          id={`educations.${index}.endDate`}
                          type="date"
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
                        Degree
                      </Label>
                      <Input
                        id={`educations.${index}.degree`}
                        placeholder="Degree"
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
                        Field of Study
                      </Label>
                      <Input
                        id={`educations.${index}.fieldOfStudy`}
                        placeholder="Field of Study"
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
                      <Label
                        htmlFor={`educations.${index}.grade`}
                        className="text-gray-200"
                      >
                        Grade
                      </Label>
                      <Input
                        id={`educations.${index}.grade`}
                        placeholder="Grade"
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
                        Activities & Societies
                      </Label>
                      <Textarea
                        id={`educations.${index}.activities`}
                        placeholder="Activities & Societies"
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
                        Description
                      </Label>
                      <Textarea
                        id={`educations.${index}.description`}
                        placeholder="Education Description"
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
                        <Trash2 className="mr-2 size-4" /> Remove Education
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
                <PlusCircle className="mr-2 size-4" /> Add Education
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

export default ProfileEducationPage;
