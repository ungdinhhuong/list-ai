"use client";

import { useTranslations } from "next-intl";

export default function NoTranslationMessage() {
  const t = useTranslations("Common");

  return (
    <div className="flex justify-center mt-10">
      <div
        className="
          bg-red-50 border border-red-200 text-red-700
          dark:bg-red-950 dark:border-red-900 dark:text-red-100
          rounded-xl px-6 py-5 max-w-md w-full text-center shadow-sm
        "
      >
        <div className="font-bold text-lg mb-1">
          {t("noTranslationTitle")}
        </div>
        <div className="text-base">
          {t("noTranslationDesc")}
        </div>
      </div>
    </div>
  );
}
