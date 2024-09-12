import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Heading } from '@/app/[locale]/(unauth)/(terms)/_components/Heading';
import { TitleContent } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContent';
import { TitleContentContact } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContentContact';
import { TitleContentList } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContentList';
import { TitleTwoContent } from '@/app/[locale]/(unauth)/(terms)/_components/TitleTwoContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'PrivacyPolicy',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const PrivacyPolicy = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('PrivacyPolicy');

  return (
    <>
      <Heading title={t('meta_title')} />

      <TitleTwoContent
        title={t('introduction_title')}
        content={t('introduction_content_1')}
        content2={t('introduction_content_2')}
      />

      <TitleContentList
        title={t('information_we_collect_title')}
        content={t('information_we_collect_content_1')}
        contentList={[
          t('information_we_collect_content_2'),
          t('information_we_collect_content_3'),
          t('information_we_collect_content_4'),
        ]}
      />

      <TitleContentList
        title={t('how_we_use_your_information_title')}
        content={t('how_we_use_your_information_content_1')}
        contentList={[
          t('how_we_use_your_information_content_2'),
          t('how_we_use_your_information_content_3'),
          t('how_we_use_your_information_content_4'),
          t('how_we_use_your_information_content_5'),
          t('how_we_use_your_information_content_6'),
          t('how_we_use_your_information_content_7'),
        ]}
      />

      <TitleContent
        title={t('blockchain_and_data_storage_title')}
        content={t('blockchain_and_data_storage_content')}
      />

      <TitleContent
        title={t('data_security_title')}
        content={t('data_security_content')}
      />

      <TitleContentList
        title={t('your_data_protection_rights_title')}
        content={`${t('your_data_protection_rights_content_1')} ${t('your_data_protection_rights_content_2')}`}
        contentList={[
          t('your_data_protection_rights_content_3'),
          t('your_data_protection_rights_content_4'),
          t('your_data_protection_rights_content_5'),
          t('your_data_protection_rights_content_6'),
          t('your_data_protection_rights_content_7'),
          t('your_data_protection_rights_content_8'),
        ]}
      />

      <TitleTwoContent
        title={t('changes_to_this_privacy_policy_title')}
        content={t('changes_to_this_privacy_policy_content_1')}
        content2={t('changes_to_this_privacy_policy_content_2')}
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

export default PrivacyPolicy;
