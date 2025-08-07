'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TransitionOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 400); // độ dài hiệu ứng

    const cleanup = setTimeout(() => {
      setShouldRender(false);
    }, 800); // đợi hiệu ứng exit xong mới xóa hoàn toàn

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, [pathname]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={pathname}
          className="absolute inset-0 z-10 pointer-events-none bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        />
      )}
    </AnimatePresence>
  );
}
