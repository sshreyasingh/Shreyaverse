import { useState, useEffect } from 'react';

/**
 * Tracks which section is currently under the navbar so it can highlight it.
 *
 * Uses scroll position rather than IntersectionObserver: sections here vary
 * wildly in height (the hero is min-h-screen, others are content-sized), and
 * an observer band either matches several at once or none at all. Comparing
 * each section's top against a fixed probe line is unambiguous.
 */
export default function useActiveSection(ids, { offset = 120 } = {}) {
  const [active, setActive] = useState(ids[0] || '');

  useEffect(() => {
    if (!ids.length) return undefined;

    let frame = null;

    const update = () => {
      frame = null;

      const scrollY = window.scrollY;
      const probe = scrollY + offset;

      // Bottom of the page: the last section can be too short to reach the
      // probe line, so award it explicitly.
      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + scrollY <= probe) current = id;
      }

      setActive(current);
    };

    const onScroll = () => {
      // Coalesce to one update per frame; scroll fires far more often.
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}
