/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'checkly';
import { EmailAlertChannel, Frequency } from 'checkly/constructs';

const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'msmf2@student.le.ac.uk',
  sendDegraded: true,
});

export const config = defineConfig({
  projectName: 'CV Mate',
  logicalId: 'cv-mate',
  repoUrl: 'https://github.com/mfmsajidh/UoL-IndividualProject-NextJS',
  checks: {
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website'],
    runtimeId: '2024.07',
    environmentVariables: [
      {
        key: 'PRODUCTION_URL',
        // FIXME: Add the production URL
        value: 'https://cvmate.com',
      },
    ],
    browserChecks: {
      frequency: Frequency.EVERY_24H,
      testMatch: '**/tests/e2e/**/*.check.spec.ts',
      alertChannels: [emailChannel],
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    reporters: ['list'],
  },
});

export default config;
