import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/utils/Helpers';

const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const user = await currentUser();

  return (
    <>
      <p>
        👋{' '}
        {t('hello_message', { email: user?.emailAddresses[0]?.emailAddress })}
      </p>
      <p>
        Looking to automate your CV creation?{' '}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href={getBaseUrl()}
        >
          CV Mate SaaS
        </a>{' '}
        can help you build one.
      </p>
    </>
  );
};

export { Hello };
