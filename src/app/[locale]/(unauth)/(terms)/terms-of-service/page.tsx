import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Heading } from '@/app/[locale]/(unauth)/(terms)/_components/Heading';
import { TitleContent } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContent';
import { TitleContentContact } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContentContact';
import { TitleTwoContent } from '@/app/[locale]/(unauth)/(terms)/_components/TitleTwoContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'TermsOfService',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const TermsOfService = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('TermsOfService');

  return (
    <>
      <Heading title={t('meta_title')} />

      <TitleContent
        title={t('acceptance_of_terms_title')}
        content={t('acceptance_of_terms_content')}
      />

      <TitleContent
        title={t('description_of_service_title')}
        content={t('description_of_service_content')}
      />

      <TitleContent
        title={t('user_accounts_title')}
        content={t('user_accounts_content')}
      />

      <TitleTwoContent
        title={t('user_content_title')}
        content={t('user_content_content_1')}
        content2={t('user_content_content_2')}
      />

      <TitleContent
        title={t('intellectual_property_title')}
        content={t('intellectual_property_content')}
      />

      <TitleContent
        title={t('blockchain_verification_title')}
        content={t('blockchain_verification_content')}
      />

      <TitleContent
        title={t('ai_generated_content_title')}
        content={t('ai_generated_content_content')}
      />

      <TitleContent
        title={t('limitation_of_liability_title')}
        content={t('limitation_of_liability_content')}
      />

      <TitleContent
        title={t('modifications_to_service_title')}
        content={t('modifications_to_service_content')}
      />

      <TitleContent
        title={t('governing_law_title')}
        content={t('governing_law_content')}
      />

      <TitleContent
        title={t('changes_to_terms_title')}
        content={t('changes_to_terms_content')}
      />

      <TitleContentContact
        title={t('contact_us_title')}
        content={t('contact_us_content_1')}
        contentList={[
          {
            name: t('contact_us_content_2'),
            url: 'mailto:msmf2@student.le.ac.uk',
            contact: 'msmf2@student.le.ac.uk',
          },
        ]}
      />
    </>
  );
};

export default TermsOfService;
