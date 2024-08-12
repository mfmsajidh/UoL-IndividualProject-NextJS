import { Footer } from 'antd/lib/layout/layout';
import type { FC } from 'react';

import { AppConfig } from '@/utils/AppConfig';

interface AppFooterProps {
  stringTranslation: string;
}

export const AppFooter: FC<AppFooterProps> = ({ stringTranslation }) => {
  return (
    <Footer className="text-center">
      © Copyright {new Date().getFullYear()} {AppConfig.name}.
      {` ${stringTranslation} 🖤 `}
      <a
        href="https://github.com/mfmsajidh/"
        className="text-blue-700 hover:border-b-2 hover:border-blue-700"
      >
        Sajidh Farook
      </a>
      .
    </Footer>
  );
};
