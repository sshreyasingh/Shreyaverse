export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Height of the fixed navbar, so anchored sections aren't hidden beneath it.
const SCROLL_OFFSET = -80;

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  // Delegate to Lenis when it's active so nav jumps share the page's easing.
  if (window.__lenis) {
    window.__lenis.scrollTo(element, { offset: SCROLL_OFFSET, duration: 1.2 });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.2 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
