'use client';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

interface ShareButtonsProps {
  title?: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState('');
  const t = useTranslations();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title || '');

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{t('blog.shareThisPost')}:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-muted rounded-full p-2 hover:text-blue-600 transition-colors"
      >
        <FaFacebook size={16} />
      </a>

      <a
        href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-muted rounded-full p-2 hover:text-sky-400 transition-colors"
      >
        <FaTwitter size={16} />
      </a>
    </div>
  );
}
