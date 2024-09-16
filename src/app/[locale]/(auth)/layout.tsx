import {
  arSA,
  csCZ,
  daDK,
  deDE,
  elGR,
  enUS,
  esES,
  frFR,
  itIT,
  jaJP,
  nbNO,
  nlNL,
  plPL,
  ptPT,
  ruRU,
  svSE,
  ukUA,
  zhCN,
} from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { LocalizationResource } from '@clerk/types';
import type { ReactNode } from 'react';

export default function AuthLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  let clerkLocale: LocalizationResource;
  let signInUrl = '/sign-in';
  let signUpUrl = '/sign-up';
  let dashboardUrl = '/dashboard/cv-generator';

  switch (props.params.locale) {
    case 'ar':
      clerkLocale = arSA;
      break;
    case 'cs':
      clerkLocale = csCZ;
      break;
    case 'da':
      clerkLocale = daDK;
      break;
    case 'de':
      clerkLocale = deDE;
      break;
    case 'el':
      clerkLocale = elGR;
      break;
    case 'es':
      clerkLocale = esES;
      break;
    case 'fr':
      clerkLocale = frFR;
      break;
    case 'it':
      clerkLocale = itIT;
      break;
    case 'ja':
      clerkLocale = jaJP;
      break;
    case 'nl':
      clerkLocale = nlNL;
      break;
    case 'no':
      clerkLocale = nbNO;
      break;
    case 'pl':
      clerkLocale = plPL;
      break;
    case 'pt':
      clerkLocale = ptPT;
      break;
    case 'ru':
      clerkLocale = ruRU;
      break;
    case 'sv':
      clerkLocale = svSE;
      break;
    case 'uk':
      clerkLocale = ukUA;
      break;
    case 'zh':
      clerkLocale = zhCN;
      break;
    default:
      clerkLocale = enUS;
      break;
  }

  if (props.params.locale !== 'en') {
    signInUrl = `/${props.params.locale}${signInUrl}`;
    signUpUrl = `/${props.params.locale}${signUpUrl}`;
    dashboardUrl = `/${props.params.locale}${dashboardUrl}`;
  }

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
