import {
  getAddress,
  getNetwork,
  isAllowed,
  isConnected,
  setAllowed,
  signTransaction,
} from '@stellar/freighter-api';
import type { Account } from '@stellar/stellar-sdk';
import { Networks } from '@stellar/stellar-sdk';
import { useEffect, useState } from 'react';

import { Env } from '@/libs/Env';
import { getAccount } from '@/libs/Stellar';

interface Balance {
  balance: string;
  asset_type: string;
}

interface ExtendedAccount extends Account {
  balances?: Balance[];
}

export const useWallet = () => {
  const [hasFreighter, setHasFreighter] = useState<boolean>(false);
  const [isFreighterAllowed, setIsFreighterAllowed] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string | undefined>();
  const [network, setNetwork] = useState<string | undefined>();
  const [account, setAccount] = useState<ExtendedAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to fetch network and public key
  const fetchNetworkAndPublicKey = async () => {
    try {
      const networkRes = await getNetwork();
      setNetwork(networkRes.network);

      const addressRes = await getAddress();
      setPublicKey(addressRes.address);
    } catch (err) {
      setError('Error fetching network or public key');
    }
  };

  // Fetch account details based on public key
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        if (!publicKey) return;

        setIsLoading(true);
        setError(null);
        const accountData = await getAccount(publicKey);
        setAccount(accountData);
      } catch (err) {
        setError('Error fetching account');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [publicKey]);

  // Initial fetch for Freighter connection, network, and public key
  useEffect(() => {
    const fetchFreighterData = async () => {
      try {
        const connectionRes = await isConnected();
        setHasFreighter(connectionRes.isConnected);

        if (connectionRes.isConnected) {
          const isAllowedRes = await isAllowed();
          setIsFreighterAllowed(isAllowedRes.isAllowed);

          if (isAllowedRes.isAllowed) {
            await fetchNetworkAndPublicKey();
          }
        }
      } catch (err) {
        setError('Error initializing Freighter data');
      }
    };

    fetchFreighterData();

    // Poll for changes every 5 seconds
    const interval = setInterval(fetchFreighterData, 5000);

    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const isAllowedRes = await setAllowed();
      setIsFreighterAllowed(isAllowedRes.isAllowed);

      if (isAllowedRes.isAllowed) {
        await fetchNetworkAndPublicKey();
      }
    } catch (err) {
      setError('Error requesting access to Freighter');
    } finally {
      setIsLoading(false);
    }
  };

  // @ts-ignore
  const signXDR = async (xdr: string) => {
    if (!hasFreighter) {
      setError('Freighter not installed');
      return;
    }

    if (!isFreighterAllowed) {
      try {
        const isAllowedRes = await setAllowed();
        setIsFreighterAllowed(isAllowedRes.isAllowed);

        if (!isAllowedRes.isAllowed) {
          return;
        }
      } catch (err) {
        setError('Error requesting access to Freighter');
        return;
      }
    }

    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    try {
      // eslint-disable-next-line consistent-return
      return await signTransaction(xdr, {
        networkPassphrase:
          Networks[Env.NEXT_PUBLIC_STELLAR_NETWORK as keyof typeof Networks],
        address: publicKey,
      });
    } catch (err) {
      setError('Error signing transaction');
    }
  };

  return {
    publicKey,
    network,
    hasFreighter,
    isFreighterAllowed,
    account,
    isLoading,
    error,
    connectWallet,
    signXDR,
  };
};
