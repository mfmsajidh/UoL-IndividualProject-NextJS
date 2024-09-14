import { UserProfile } from '@clerk/nextjs';
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
  <div className="my-6 -ml-16">
    <UserProfile
      path={getI18nPath('/new-dashboard/settings', props.params.locale)}
    />
  </div>
);

export default SettingsPage;
