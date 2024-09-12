import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AppConfig } from '@/utils/AppConfig';

export const AppFooter = () => {
  const t = useTranslations('AppFooter');
  return (
    <footer className="w-full bg-gray-900 py-6 text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {AppConfig.name}
            </h3>
            <p className="text-sm">{t('description')}</p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="hover:text-blue-400">
                  {t('features')}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-blue-400">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-blue-400">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('legal')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400">
                  {t('privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-400">
                  {t('terms_of_service')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('connect')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/mfmsajidh"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  {t('github')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mfmsajidh/"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  {t('linkedin')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:msmf2@student.le.ac.uk"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          {`© ${new Date().getFullYear()} ${AppConfig.name}. ${t('all_rights_reserved')}`}
        </div>
      </div>
    </footer>
  );
};
