import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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
    <main className="container mx-auto flex-1 py-12 md:py-24 lg:py-32">
      <h1 className="mb-8 text-4xl font-bold text-white">{t('meta_title')}</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('introduction_title')}
        </h2>
        <p className="mb-4">{t('introduction_content_1')}</p>
        <p>{t('introduction_content_2')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('information_we_collect_title')}
        </h2>
        <p className="mb-4">{t('information_we_collect_content_1')}</p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>{t('information_we_collect_content_2')}</li>
          <li>{t('information_we_collect_content_3')}</li>
          <li>{t('information_we_collect_content_4')}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('how_we_use_your_information_title')}
        </h2>
        <p className="mb-4">{t('how_we_use_your_information_content_1')}</p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>{t('how_we_use_your_information_content_2')}</li>
          <li>{t('how_we_use_your_information_content_3')}</li>
          <li>{t('how_we_use_your_information_content_4')}</li>
          <li>{t('how_we_use_your_information_content_5')}</li>
          <li>{t('how_we_use_your_information_content_6')}</li>
          <li>{t('how_we_use_your_information_content_7')}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('blockchain_and_data_storage_title')}
        </h2>
        <p className="mb-4">{t('blockchain_and_data_storage_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('data_security_title')}
        </h2>
        <p className="mb-4">{t('data_security_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('your_data_protection_rights_title')}
        </h2>
        <p className="mb-4">{t('your_data_protection_rights_content_1')}</p>
        <p>{t('your_data_protection_rights_content_2')}</p>
        <ul className="ml-4 mt-4 list-inside list-disc space-y-2">
          <li>{t('your_data_protection_rights_content_3')}</li>
          <li>{t('your_data_protection_rights_content_4')}</li>
          <li>{t('your_data_protection_rights_content_5')}</li>
          <li>{t('your_data_protection_rights_content_6')}</li>
          <li>{t('your_data_protection_rights_content_7')}</li>
          <li>{t('your_data_protection_rights_content_8')}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('changes_to_this_privacy_policy_title')}
        </h2>
        <p className="mb-4">{t('changes_to_this_privacy_policy_content_1')}</p>
        <p>{t('changes_to_this_privacy_policy_content_2')}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('contact_us_title')}
        </h2>
        <p className="mb-4">{t('contact_us_content_1')}</p>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            {t('contact_us_content_2')}{' '}
            <a href="mailto:msmf2@student.le.ac.uk" className="hover:underline">
              msmf2@student.le.ac.uk
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
