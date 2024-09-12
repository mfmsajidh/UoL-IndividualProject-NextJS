import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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
    <main className="container mx-auto flex-1 py-12 md:py-24 lg:py-32">
      <h1 className="mb-8 text-4xl font-bold text-white">{t('meta_title')}</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('acceptance_of_terms_title')}
        </h2>
        <p className="mb-4">{t('acceptance_of_terms_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('description_of_service_title')}
        </h2>
        <p className="mb-4">{t('description_of_service_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('user_accounts_title')}
        </h2>
        <p className="mb-4">{t('user_accounts_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('user_content_title')}
        </h2>
        <p className="mb-4">{t('user_content_content_1')}</p>
        <p className="mb-4">{t('user_content_content_2')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('intellectual_property_title')}
        </h2>
        <p className="mb-4">{t('intellectual_property_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('blockchain_verification_title')}
        </h2>
        <p className="mb-4">{t('blockchain_verification_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('ai_generated_content_title')}
        </h2>
        <p className="mb-4">{t('ai_generated_content_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('limitation_of_liability_title')}
        </h2>
        <p className="mb-4">{t('limitation_of_liability_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('modifications_to_service_title')}
        </h2>
        <p className="mb-4">{t('modifications_to_service_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('governing_law_title')}
        </h2>
        <p className="mb-4">{t('governing_law_content')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue-400">
          {t('changes_to_terms_title')}
        </h2>
        <p className="mb-4">{t('changes_to_terms_content')}</p>
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

export default TermsOfService;
