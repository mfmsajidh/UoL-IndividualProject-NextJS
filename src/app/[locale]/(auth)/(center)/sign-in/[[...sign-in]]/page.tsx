import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { getTranslations } from 'next-intl/server';

import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = (props: { params: { locale: string } }) => (
  <SignIn
    path={getI18nPath('/sign-in', props.params.locale)}
    appearance={{
      baseTheme: dark,
    }}
  />
);

export default SignInPage;
