import Link from 'next/link';
import type { FC } from 'react';

import { AppConfig } from '@/utils/AppConfig';

interface AppFooterProps {
  stringTranslation?: string;
}

export const AppFooter: FC<AppFooterProps> = () => {
  return (
    <footer className="w-full bg-gray-900 py-6 text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {AppConfig.name}
            </h3>
            <p className="text-sm">
              Revolutionising CV creation with AI and Blockchain
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-blue-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-blue-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-blue-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/mfmsajidh"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mfmsajidh/"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:msmf2@student.le.ac.uk"
                  className="hover:text-blue-400"
                  target="_blank"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          {`© ${new Date().getFullYear()} ${AppConfig.name}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};
