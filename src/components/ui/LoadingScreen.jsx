import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-surface flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary-400/30 border-t-accent-light animate-spin" />
    </div>
  );
}
