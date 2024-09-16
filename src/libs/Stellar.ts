import type { xdr } from '@stellar/stellar-sdk';
import {
  BASE_FEE,
  Horizon,
  Networks,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import { Env } from '@/libs/Env';

const server = new Horizon.Server(Env.NEXT_PUBLIC_STELLAR_SERVER_URL);

const getAccount = async (publicKey: string) => {
  return server.loadAccount(publicKey);
};

const storeSectionHashOnStellar = async (
  ipfsHash: string,
  publicKey: string,
  section: 'about' | 'experience' | 'education' | 'skills' | 'languages',
  version: number = 0,
) => {
  try {
    const account = await getAccount(publicKey);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase:
        Networks[Env.NEXT_PUBLIC_STELLAR_NETWORK as keyof typeof Networks],
    })
      .addOperation(
        Operation.manageData({
          name: `UserProfile_${section}_V${version}`,
          value: ipfsHash,
        }),
      )
      .setTimeout(180)
      .build();

    // Send XDR for client to sign
    return transaction.toXDR();
  } catch (e) {
    throw new Error('Stellar record creation failed');
  }
};

const submitTransaction = async (
  signedXdr: string | xdr.TransactionEnvelope,
) => {
  const transaction = TransactionBuilder.fromXDR(
    signedXdr,
    Networks[Env.NEXT_PUBLIC_STELLAR_NETWORK as keyof typeof Networks],
  );
  return server.submitTransaction(transaction).catch(() => {
    throw new Error('Error submitting transaction');
  });
};

const fetchSectionHashHistory = async (
  publicKey: string,
  section: 'about' | 'experience' | 'education' | 'skills' | 'languages',
) => {
  const account = await getAccount(publicKey);
  const dataEntries = account.data_attr;

  return Object.entries(dataEntries)
    .filter(([key]) => key.startsWith(`UserProfile_${section}_`))
    .map(([key, value]) => {
      const ipfsHash = Buffer.from(value, 'base64').toString('utf-8');
      return { key, ipfsHash };
    });
};

const fetchLatestSectionCIDs = async (publicKey: string) => {
  try {
    const account = await server.loadAccount(publicKey);

    const sections = [
      'about',
      'experience',
      'education',
      'skills',
      'languages',
    ];
    const sectionCIDs: Record<
      string,
      { latestVersion: number; latestCID: string }
    > = {};

    sections.forEach((section) => {
      let latestVersion = 0;
      let latestCID = '';

      for (const [key, value] of Object.entries(account.data_attr)) {
        if (key.startsWith(`UserProfile_${section}_V`)) {
          const versionString = key.split('_V')[1]; // Safely get version part

          // Safely parse the version only if versionString exists
          const version = versionString ? parseInt(versionString, 10) : 0;

          const decodedCID = Buffer.from(value, 'base64').toString('utf-8');

          if (version > latestVersion) {
            latestVersion = version;
            latestCID = decodedCID;
          }
        }
      }

      sectionCIDs[section] = {
        latestVersion,
        latestCID,
      };
    });

    return sectionCIDs;
  } catch (error) {
    throw new Error('Failed to fetch section CIDs');
  }
};

export {
  fetchLatestSectionCIDs,
  fetchSectionHashHistory,
  getAccount,
  storeSectionHashOnStellar,
  submitTransaction,
};
