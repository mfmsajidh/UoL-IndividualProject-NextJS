'use client';

import { ExternalLink, Link as LinkIcon, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('StellarConnectCard');
  const { publicKey, account, network, connectWallet, isLoading } = useWallet();

  const nativeBalance =
    account?.balances?.find((b) => b.asset_type === 'native')?.balance ?? 0;

  let loadingText;
  if (isLoading) {
    loadingText = t('loading_connecting');
  } else if (publicKey) {
    loadingText = `${t('loading_connected')}  ${network}`;
  } else {
    loadingText = t('loading_connect');
  }

  return (
    <div className="container flex flex-1 items-center justify-center py-6">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            {t('connect_to_wallet')}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {t('connect_to_wallet_description')}
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
                {`${t('wallet')} ${shortenStellarAddress(publicKey)}`}
              </p>
              <p className="flex items-center text-green-400">
                {`${t('you_have')} ${nativeBalance} XLMs`}
              </p>
            </>
          )}
          <a
            href="https://www.stellar.org/learn/intro-to-stellar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            {t('learn_more')}
            <ExternalLink className="ml-1 size-4" />
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};
