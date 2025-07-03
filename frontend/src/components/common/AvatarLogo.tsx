import { char2BgColor } from "@/data/constants";
import Image from "next/image";

interface AvatarLogoProps {
  text: string;
  img?: string;
}
export default function AvatarLogo({ text, img }: AvatarLogoProps) {
  const firstChar = text.charAt(0).toUpperCase();

  if (img) {
    return (
      <div className="w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 bg-gray-100">
        <Image
          src={img}
          alt={text}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`w-14 h-14 ${char2BgColor[firstChar] || "bg-gray-300"} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {firstChar}
    </div>
  );
}
