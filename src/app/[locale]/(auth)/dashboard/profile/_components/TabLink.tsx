import Link from 'next/link';
import type { FC } from 'react';

export const TabLink: FC<{
  tabLink: string;
  tabName: string;
  activeTab?: string;
}> = ({ tabLink, tabName, activeTab }) => {
  return (
    <Link href={`/dashboard/profile/${tabLink}`} key={tabLink}>
      <button
        type="button"
        key={tabLink}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
          activeTab === tabLink
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {tabName}
      </button>
    </Link>
  );
};
