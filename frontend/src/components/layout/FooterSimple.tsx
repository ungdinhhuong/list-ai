import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import ReCaptchaPolicy from '@/components/section/newsletter/ReCaptchaPolicy'
import { SOCIAL_ICONS } from '@/constants/constants'
import { APP_NAME } from '@/constants/env'
import { ROUTES } from '@/constants/routes'
import { SiteSettingType } from '@/types/site-setting.type'

interface FooterSimpleProps {
  siteSetting: SiteSettingType
}

const FooterSimple = ({ siteSetting }: FooterSimpleProps) => {
  const t = useTranslations()
  return (
    <footer
      className="bg-background text-foreground border-t border-border"
      role="contentinfo"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      <div className="w-full mx-auto px-4 py-4 text-center lg:text-left">
        <div className="flex flex-col-reverse gap-4 lg:flex-row justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm mb-1">
              © 2025 <span className="font-semibold">{APP_NAME}</span>. All rights reserved.
            </p>
            <ReCaptchaPolicy />
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <nav aria-label="Footer Navigation" className="flex space-x-6">
              <Link
                href={ROUTES.POLICY}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('common.policy')}
              </Link>
              <Link
                href={ROUTES.ABOUT}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('common.about')}
              </Link>
            </nav>
            <span className="text-muted-foreground">{t('common.followUs')}:</span>
            <div className="flex space-x-3">
              {(siteSetting.socialLinks || []).map((social) => {
                const platform = (social.platform || '').toLowerCase().trim()
                const Icon = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) {
                  console.warn(`No icon found for platform: ${platform}`)
                  return null
                }

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSimple
