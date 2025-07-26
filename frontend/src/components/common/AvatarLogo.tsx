import Image from "next/image";

import { char2BgColor } from "@/constants/constants";
import {STRAPI_URL} from "@/constants/env";

interface AvatarLogoProps {
  text: string;
  img?: string;
}

export default function AvatarLogo({ text, img }: AvatarLogoProps) {
  const strapiBaseUrl = STRAPI_URL.endsWith("/") ? STRAPI_URL : STRAPI_URL + "/";
  const firstChar = text.charAt(0).toUpperCase();
  const fullUrl = strapiBaseUrl + img;

  if (img) {
    return (
      <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
        <Image
          src={fullUrl}
          alt={text}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        w-14 h-14
        ${char2BgColor[firstChar] || "bg-muted"}
        rounded-lg flex items-center justify-center
        text-foreground font-bold text-sm flex-shrink-0
      `}
    >
      {firstChar}
    </div>
  );
}
