'use client';

import {Check, Globe2} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {usePathname, useRouter} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

const LANGUAGES = [
  {value: 'en', label: 'English'},
  {value: 'vi', label: 'Tiếng Việt'}
] as const;

/** Ghi cookie NEXT_LOCALE cho 1 năm, dùng domain cấp cao nếu cần dùng chung www và non-www */
function writeNextLocaleCookie(locale: string) {
  const parts = [
    `NEXT_LOCALE=${encodeURIComponent(locale)}`,
    'Path=/',
    'Max-Age=31536000', // 1 năm
    'SameSite=Lax'
  ];

  if (location.protocol === 'https:') parts.push('Secure');

  // Nếu site có cả www.ontoolaz.com và ontoolaz.com, nên để cookie ở .ontoolaz.com
  if (location.hostname.endsWith('ontoolaz.com')) {
    parts.push('Domain=.ontoolaz.com');
  }

  document.cookie = parts.join('; ');
}

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (newLocale: typeof LANGUAGES[number]['value']) => {
    if (newLocale === locale) return;

    // 1) Ghi cookie để middleware nhớ lựa chọn mới
    writeNextLocaleCookie(newLocale);

    // 2) Giữ nguyên pathname + query khi đổi locale
    const qs = searchParams.toString();
    const href = qs ? `${pathname}?${qs}` : pathname;

    // 3) Điều hướng bằng navigation API của next-intl (xử lý prefix en/vi đúng theo routing)
    router.replace({pathname: href}, {locale: newLocale});

    // Nếu bạn muốn CHẮC CHẮN middleware chạy để set cookie từ server (không chỉ client):
    // window.location.assign(router.href({pathname: href}, {locale: newLocale}));
    // (chỉ bật khi cần hard reload)
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
              className={cn('flex items-center justify-between', isCurrent && 'font-semibold')}
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
