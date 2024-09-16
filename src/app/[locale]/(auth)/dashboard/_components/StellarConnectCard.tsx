'use client';

import { ExternalLink, Link as LinkIcon, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useWallet } from '@/hooks/useWallet';
import { shortenStellarAddress } from '@/utils/StellarUtil';

export const StellarConnectCard = () => {
  const { publicKey, account, network, connectWallet, isLoading } = useWallet();

  const nativeBalance =
    account?.balances?.find((b) => b.asset_type === 'native')?.balance ?? 0;

  let loadingText;
  if (isLoading) {
    loadingText = 'Connecting...';
  } else if (publicKey) {
    loadingText = `Connected to ${network}`;
  } else {
    loadingText = 'Connect Wallet';
  }

  return (
    <div className="container flex flex-1 items-center justify-center py-6">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Connect to Stellar Wallet
          </CardTitle>
          <CardDescription className="text-gray-400">
            Securely connect your Stellar wallet to access blockchain features
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-blue-500">
            <Wallet className="size-12 text-white" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button
            className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={connectWallet}
            disabled={isLoading || !!publicKey}
          >
            {loadingText}
          </Button>
          {publicKey && (
            <>
              <p className="flex items-center text-green-400">
                <LinkIcon className="mr-2 size-4" />
                {`Wallet ${shortenStellarAddress(publicKey)}`}
              </p>
              <p className="flex items-center text-green-400">
                {`You have ${nativeBalance} XLMs`}
              </p>
            </>
          )}
          <a
            href="https://www.stellar.org/learn/intro-to-stellar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            Learn more about Stellar
            <ExternalLink className="ml-1 size-4" />
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};
