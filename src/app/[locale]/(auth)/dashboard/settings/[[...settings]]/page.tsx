import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { getTranslations } from 'next-intl/server';

import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

const SettingsPage = (props: { params: { locale: string } }) => (
  <div className="flex min-h-screen flex-col items-center">
    <div className="my-6 grow">
      <UserProfile
        path={getI18nPath('/dashboard/settings', props.params.locale)}
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  </div>
);

export default SettingsPage;
