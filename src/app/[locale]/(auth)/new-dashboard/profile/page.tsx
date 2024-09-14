'use client';

import { PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function NewProfilePage() {
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [educations, setEducations] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState(['']);
  const [languages, setLanguages] = useState([{ id: 1 }]);

  const addExperience = () =>
    setExperiences([...experiences, { id: Date.now() }]);
  const removeExperience = (id: number) =>
    setExperiences(experiences.filter((exp) => exp.id !== id));

  const addEducation = () => setEducations([...educations, { id: Date.now() }]);
  const removeEducation = (id: number) =>
    setEducations(educations.filter((edu) => edu.id !== id));

  const addSkill = () => setSkills([...skills, '']);
  const removeSkill = (index: number) =>
    setSkills(skills.filter((_, i) => i !== index));

  const addLanguage = () => setLanguages([...languages, { id: Date.now() }]);
  const removeLanguage = (id: number) =>
    setLanguages(languages.filter((lang) => lang.id !== id));

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">ML-Block CV Profile</span>
          </Link>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="border-gray-600 bg-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      placeholder="e.g., Senior Software Engineer"
                      className="border-gray-600 bg-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <Textarea
                      id="about"
                      placeholder="Tell us about yourself"
                      className="border-gray-600 bg-gray-700"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="mb-6 border-b border-gray-700 pb-6 last:border-0"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${exp.id}`}>Title</Label>
                        <Input
                          id={`title-${exp.id}`}
                          placeholder="Job Title"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>
                          Company Name
                        </Label>
                        <Input
                          id={`company-${exp.id}`}
                          placeholder="Company Name"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${exp.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`start-date-${exp.id}`}
                            type="date"
                            className="border-gray-600 bg-gray-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                          <Input
                            id={`end-date-${exp.id}`}
                            type="date"
                            className="border-gray-600 bg-gray-700"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${exp.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          placeholder="Job Description"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location</Label>
                        <Input
                          id={`location-${exp.id}`}
                          placeholder="Job Location"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`employment-type-${exp.id}`}>
                          Employment Type
                        </Label>
                        <Select>
                          <SelectTrigger className="border-gray-600 bg-gray-700">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">
                              Internship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {experiences.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeExperience(exp.id)}
                        className="mt-4"
                      >
                        <Trash2 className="mr-2 size-4" /> Remove Experience
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addExperience}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="mr-2 size-4" /> Add Experience
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="mb-6 border-b border-gray-700 pb-6 last:border-0"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`school-${edu.id}`}>School</Label>
                        <Input
                          id={`school-${edu.id}`}
                          placeholder="School Name"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-date-${edu.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`edu-start-date-${edu.id}`}
                            type="date"
                            className="border-gray-600 bg-gray-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-date-${edu.id}`}>
                            End Date
                          </Label>
                          <Input
                            id={`edu-end-date-${edu.id}`}
                            type="date"
                            className="border-gray-600 bg-gray-700"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          placeholder="Degree"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-of-study-${edu.id}`}>
                          Field of Study
                        </Label>
                        <Input
                          id={`field-of-study-${edu.id}`}
                          placeholder="Field of Study"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`grade-${edu.id}`}>Grade</Label>
                        <Input
                          id={`grade-${edu.id}`}
                          placeholder="Grade"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`activities-${edu.id}`}>
                          Activities & Societies
                        </Label>
                        <Textarea
                          id={`activities-${edu.id}`}
                          placeholder="Activities & Societies"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-description-${edu.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`edu-description-${edu.id}`}
                          placeholder="Education Description"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                    </div>
                    {educations.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeEducation(edu.id)}
                        className="mt-4"
                      >
                        <Trash2 className="mr-2 size-4" /> Remove Education
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addEducation}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="mr-2 size-4" /> Add Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {skills.map((skill, index) => (
                  <div key={skill} className="mb-2 flex items-center space-x-2">
                    <Input
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index] = e.target.value;
                        setSkills(newSkills);
                      }}
                      placeholder="Enter a skill"
                      className="border-gray-600 bg-gray-700"
                    />
                    {skills.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addSkill}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="mr-2 size-4" /> Add Skill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="mb-4 border-b border-gray-700 pb-4 last:border-0"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`language-${lang.id}`}>Language</Label>
                        <Input
                          id={`language-${lang.id}`}
                          placeholder="Language"
                          className="border-gray-600 bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`proficiency-${lang.id}`}>
                          Proficiency
                        </Label>
                        <Select>
                          <SelectTrigger className="border-gray-600 bg-gray-700">
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
                      </div>
                    </div>
                    {languages.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeLanguage(lang.id)}
                        className="mt-4"
                      >
                        <Trash2 className="mr-2 size-4" /> Remove Language
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addLanguage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="mr-2 size-4" /> Add Language
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Profile
          </Button>
        </div>
      </main>
    </div>
  );
}
