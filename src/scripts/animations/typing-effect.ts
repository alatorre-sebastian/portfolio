/**
 * Typing effect module for the professional role subtitle.
 * Types text character by character with a blinking cursor,
 * respecting the user's reduced-motion preference.
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 9.3
 */

import { shouldAnimate } from '../utils/reduced-motion';

export interface TypingConfig {
  speed: number;           // ms per character (default: 50)
  cursorBlinkRate: number; // ms blink frequency (default: 530)
  cursorLingerTime: number; // ms cursor stays visible after typing completes (default: 2000)
}

/**
 * Types text into an element character by character with a blinking cursor.
 *
 * - Characters appear one at a time at the configured speed (50ms default).
 * - A blinking cursor (`.typing-cursor`) is shown during typing at 530ms frequency.
 * - After typing completes, the cursor lingers for 2 seconds then fades out.
 * - If `shouldAnimate()` returns false, the full text is shown immediately.
 * - Errors are caught and the full text is displayed without the effect.
 */
export function typeText(
  element: HTMLElement,
  text: string,
  config: TypingConfig
): Promise<void> {
  return new Promise<void>((resolve) => {
    try {
      // If reduced motion is preferred, show text immediately
      if (!shouldAnimate()) {
        element.textContent = text;
        resolve();
        return;
      }

      // Clear the element and create a text node + cursor
      element.textContent = '';

      const textNode = document.createTextNode('');
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      // Override the default CSS animation duration with the configured blink rate
      // The CSS uses 1.06s (2 * 530ms) for a full blink cycle
      cursor.style.animationDuration = `${config.cursorBlinkRate * 2}ms`;

      element.appendChild(textNode);
      element.appendChild(cursor);

      let charIndex = 0;

      const typeNextChar = (): void => {
        if (charIndex < text.length) {
          textNode.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeNextChar, config.speed);
        } else {
          // Typing complete — keep cursor visible for lingerTime, then fade out
          setTimeout(() => {
            cursor.style.transition = 'opacity 400ms ease-out';
            cursor.style.opacity = '0';
            // Remove cursor from DOM after fade completes
            setTimeout(() => {
              if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
              }
              resolve();
            }, 400);
          }, config.cursorLingerTime);
        }
      };

      // Start typing
      typeNextChar();
    } catch {
      // On any error, show the complete text without effect
      element.textContent = text;
      resolve();
    }
  });
}
