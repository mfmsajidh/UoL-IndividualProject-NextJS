'use client';

// import { Hello } from '@/components/Hello';
import { useState } from 'react';

import { useWallet } from '@/hooks/useWallet';
import { storeHashOnStellar, submitTransaction } from '@/libs/Stellar';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { isLoading, publicKey, account, network, connectWallet, signXDR } =
    useWallet();

  const handleSubmit = async () => {
    try {
      if (!publicKey) {
        return;
      }
      setLoading(true);
      // Call the API to mint the asset
      const xdr = await storeHashOnStellar('ipfsHash', publicKey);

      // We need to submit the signed XDR to the Horizon API
      const signedXDR = await signXDR(xdr);
      // console.log('signedXDR: string', signedXDR);

      // Submit signed XDR to Horizon API
      if (signedXDR) {
        await submitTransaction(signedXDR.signedTxXdr);
      }
    } catch (err) {
      // console.error(err); // Failed to mint asset
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="[&_p]:my-6">
      {/* <Hello /> */}
      asd {loading}
      <button
        className="h-8 rounded-md border-black bg-black px-2 py-1 text-white"
        onClick={handleSubmit}
        type="button"
      >
        Handle Submit
      </button>
      asd {isLoading}
      <button
        className="h-8 rounded-md border-black bg-black px-2 py-1 text-white"
        onClick={connectWallet}
        type="button"
      >
        Connect Wallet
      </button>
      Connected to {network} publicKey {publicKey} account{' '}
      {JSON.stringify(account)}
    </div>
  );
};

export default Dashboard;
