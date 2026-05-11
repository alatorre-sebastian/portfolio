/**
 * Rotating Typewriter Effect — cycles through multiple phrases
 * with a type → pause → delete → pause → retype loop.
 *
 * Shows a blinking cursor (.typing-cursor) during the animation.
 * Respects the user's reduced-motion preference.
 */

import { shouldAnimate } from '../utils/reduced-motion';

export interface TypewriterConfig {
  typeSpeed: number;       // ms per character typed (default: 60)
  deleteSpeed: number;     // ms per character deleted (default: 30)
  pauseBetween: number;    // ms pause between phrases (default: 1800)
}

const DEFAULT_CONFIG: TypewriterConfig = {
  typeSpeed: 60,
  deleteSpeed: 30,
  pauseBetween: 1800,
};

/**
 * Initializes a rotating typewriter effect on the given element.
 * Cycles through the provided phrases indefinitely.
 *
 * Returns a destroy function to stop the animation and clean up.
 */
export function initTypewriterRotate(
  element: HTMLElement,
  phrases: string[],
  config: TypewriterConfig = DEFAULT_CONFIG
): { destroy(): void } {
  if (!phrases.length) {
    return { destroy() {} };
  }

  // If reduced motion is preferred, show first phrase statically
  if (!shouldAnimate()) {
    element.textContent = phrases[0];
    return { destroy() {} };
  }

  let destroyed = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let phraseIndex = 0;

  // Clear element and set up structure
  element.textContent = '';
  const textNode = document.createTextNode('');
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  element.appendChild(textNode);
  element.appendChild(cursor);

  function scheduleTimeout(fn: () => void, delay: number): void {
    if (destroyed) return;
    timeoutId = setTimeout(() => {
      if (!destroyed) fn();
    }, delay);
  }

  function typePhrase(): void {
    const phrase = phrases[phraseIndex];
    let charIndex = 0;

    function typeNext(): void {
      if (destroyed) return;
      if (charIndex < phrase.length) {
        textNode.textContent += phrase[charIndex];
        charIndex++;
        scheduleTimeout(typeNext, config.typeSpeed);
      } else {
        // Pause after typing, then delete
        scheduleTimeout(deletePhrase, config.pauseBetween);
      }
    }

    typeNext();
  }

  function deletePhrase(): void {
    const currentText = textNode.textContent || '';

    function deleteNext(): void {
      if (destroyed) return;
      const text = textNode.textContent || '';
      if (text.length > 0) {
        textNode.textContent = text.slice(0, -1);
        scheduleTimeout(deleteNext, config.deleteSpeed);
      } else {
        // Move to next phrase and start typing after a short pause
        phraseIndex = (phraseIndex + 1) % phrases.length;
        scheduleTimeout(typePhrase, config.deleteSpeed * 5);
      }
    }

    deleteNext();
  }

  // Start the cycle
  typePhrase();

  return {
    destroy() {
      destroyed = true;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      // Clean up DOM — restore static text
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      textNode.textContent = phrases[0];
    },
  };
}
