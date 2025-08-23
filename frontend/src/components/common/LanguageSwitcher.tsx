'use client';

import {Check, Globe2} from 'lucide-react';
import {useSearchParams} from 'next/navigation'; // lấy query hiện tại
import {useLocale, useTranslations} from 'next-intl';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {usePathname, useRouter} from '@/i18n/navigation'; // phải re-export từ 'next-intl/navigation'
import {cn} from '@/lib/utils';

const LANGUAGES = [
  {value: 'en', label: 'English'},
  {value: 'vi', label: 'Tiếng Việt'}
] as const;

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (newLocale: (typeof LANGUAGES)[number]['value']) => {
    if (newLocale === locale) return;

    // Giữ nguyên query string khi đổi locale
    const qs = searchParams.toString();
    const href = qs ? `${pathname}?${qs}` : pathname;

    // next-intl sẽ tự thêm/bỏ prefix theo 'localePrefix'
    router.replace({pathname: href}, {locale: newLocale});
  };

  const current = LANGUAGES.find(l => l.value === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-auto justify-between"
          aria-label={t('languageSwitcher.chooseLanguage')}
        >
          <Globe2 size={18} className="mr-1"/>
          <span>{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {LANGUAGES.map(lang => {
          const isCurrent = lang.value === locale;
          return (
            <DropdownMenuItem
              key={lang.value}
              className={cn(
                'flex items-center justify-between',
                isCurrent && 'font-semibold'
              )}
              // Ngăn menu đóng khi click vào ngôn ngữ hiện tại
              onSelect={e => {
                if (isCurrent) e.preventDefault();
                else handleLocaleChange(lang.value);
              }}
            >
              <span>{lang.label}</span>
              {isCurrent && <Check size={16}/>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
