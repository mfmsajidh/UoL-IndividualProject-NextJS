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

const storeHashOnStellar = async (
  ipfsHash: string,
  publicKey: string,
  version: number = 0,
) => {
  try {
    const platformAccount = await server.loadAccount(publicKey);

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

    // Send XDR for client to sign
    return transaction.toXDR();
  } catch (e) {
    // console.log(e);
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
  return server.submitTransaction(transaction).catch(() =>
    // error
    {
      // console.error(error);
    },
  );
};

export { getAccount, storeHashOnStellar, submitTransaction };
