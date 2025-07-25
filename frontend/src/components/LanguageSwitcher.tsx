"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Nếu bạn đã có hàm cn để merge class, nếu không có thì bỏ

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
];

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  const current = LANGUAGES.find((l) => l.value === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-auto justify-between"
          aria-label={t("languageSwitcher.chooseLanguage")}
        >
          <Globe2 size={18} className="mr-1" />
          <span>{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            className={cn(
              "flex items-center justify-between",
              lang.value === locale && "font-semibold"
            )}
            onClick={() => handleLocaleChange(lang.value)}
          >
            <span>{lang.label}</span>
            {lang.value === locale && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
