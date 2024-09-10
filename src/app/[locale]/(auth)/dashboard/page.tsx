'use client';

// import { Hello } from '@/components/Hello';
import { useWallet } from '@/hooks/useWallet';

const Dashboard = () => {
  const { isLoading, publicKey, account, network, connectWallet } = useWallet();

  return (
    <div className="[&_p]:my-6">
      {/* <Hello /> */}
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
