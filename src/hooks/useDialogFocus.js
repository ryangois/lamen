import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useDialogFocus(containerRef, active = true) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined;
    const previousFocus = document.activeElement;
    const container = containerRef.current;
    const availableElements = () => [...container.querySelectorAll(FOCUSABLE)]
      .filter((element) => !element.hidden && element.getClientRects().length > 0);
    const focusable = availableElements();
    (focusable[0] || container).focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const available = availableElements();
      if (available.length === 0) {
        event.preventDefault();
        return;
      }
      const first = available[0];
      const last = available[available.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [active, containerRef]);
}
