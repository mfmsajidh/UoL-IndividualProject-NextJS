import {
  BASE_FEE,
  Horizon,
  Keypair,
  Networks,
  Operation,
  StrKey,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import { Env } from '@/libs/Env';

const server = new Horizon.Server(Env.NEXT_PUBLIC_STELLAR_SERVER_URL);

export const getAccount = async (publicKey: string) => {
  return server.loadAccount(publicKey);
};

export const storeHashOnStellar = async (
  ipfsHash: string,
  userSecret: string,
  version: number = 0,
) => {
  try {
    const userKeypair = Keypair.fromSecret(userSecret);
    const platformAccount = await server.loadAccount(userKeypair.publicKey());

    const transaction = new TransactionBuilder(platformAccount, {
      fee: BASE_FEE,
      networkPassphrase:
        Networks[Env.NEXT_PUBLIC_STELLAR_NETWORK as keyof typeof Networks],
    })
      .addOperation(
        Operation.manageData({
          name: `UserProfileCID_V${version}`,
          value: ipfsHash,
        }),
      )
      .setTimeout(180)
      .build();

    transaction.sign(userKeypair);

    // Send XDR for client to sign
    return transaction.toXDR();
  } catch (e) {
    // console.log(e);
    throw new Error('Stellar record creation failed');
  }
};

export const fetchHashHistory = async (publicKey: string) => {
  const account = await server.loadAccount(publicKey);
  const dataEntries = account.data_attr;

  return Object.entries(dataEntries)
    .filter(([key]) => key.startsWith('TrustLoop_'))
    .map(([key, value]) => {
      const decodedValue = StrKey.decodeEd25519PublicKey(value);
      const ipfsHash = Buffer.from(decodedValue).toString('hex');
      return { key, ipfsHash };
    });
};

// @ts-ignore
export const getManageDataOperationFromTransactionHash = async (
  transactionHash: string,
) => {
  try {
    const transaction = await server
      .transactions()
      .transaction(transactionHash)
      .call();

    if (!transaction) {
      // console.log('Transaction not found');
      return;
    }

    const operations = await server
      .operations()
      .forTransaction(transactionHash)
      .call();

    if (!operations || !operations.records) {
      // console.log('No operations found');
      return;
    }

    const manageDataOperation = operations.records.find(
      (operation) => operation.type === 'manage_data',
    );

    if (!manageDataOperation) {
      // console.log('No manage_data operation found in the transaction');
      return;
    }

    // @ts-ignore
    // eslint-disable-next-line consistent-return
    return Buffer.from(manageDataOperation.value, 'base64').toString('utf8');
  } catch (error) {
    // console.log('Error fetching transaction or operation:', error);
  }
};
