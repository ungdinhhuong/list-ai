import React from 'react';
import {APP_NAME} from "@/constants/env";
import {SOCIALS} from "@/constants/constants";
import ReCaptchaPolicy from "@/components/section/newsletter/ReCaptchaPolicy";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import {useTranslations} from "next-intl";

const FooterSimple = () => {
  const t = useTranslations();

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="w-full mx-auto px-4 py-4 text-center lg:text-left">
        <div className="flex flex-col-reverse gap-4 flex-d lg:flex-row justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm mb-1">
              © 2025 {APP_NAME}. All rights reserved.
            </p>
            <ReCaptchaPolicy/>
          </div>


          <div className="flex items-center space-x-6 sm:mt-0  text-sm">
            <Link href={ROUTES.POLICY} className="text-muted-foreground hover:text-foreground transition-colors">
              {t('common.policy')}
            </Link>
            <span className="text-muted-foreground"> {t('common.followUs')}:</span>
            <div className="flex space-x-3">
              {Object.values(SOCIALS).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;
