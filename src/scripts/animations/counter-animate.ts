/**
 * Animated Counter Stats — counts up from 0 to a target value
 * when the element becomes visible in the viewport.
 *
 * Uses IntersectionObserver with threshold 0.5 to trigger.
 * Respects the user's reduced-motion preference.
 */

import { shouldAnimate } from '../utils/reduced-motion';

/**
 * Easing function (ease-out cubic) for smooth deceleration.
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Initializes counter animations for all elements with [data-count-target]
 * within the given container.
 *
 * Each element animates from 0 to its target value over ~1.2 seconds.
 * The suffix from data-count-suffix is appended after the number.
 */
export function initCounterAnimations(container: HTMLElement): void {
  const elements = container.querySelectorAll<HTMLElement>('[data-count-target]');
  if (elements.length === 0) return;

  // If reduced motion, show final values immediately
  if (!shouldAnimate()) {
    elements.forEach((el) => {
      const target = parseInt(el.dataset.countTarget || '0', 10);
      const suffix = el.dataset.countSuffix || '';
      el.textContent = `${target}${suffix}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          animateCounter(el);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
}

function animateCounter(el: HTMLElement): void {
  const target = parseInt(el.dataset.countTarget || '0', 10);
  const suffix = el.dataset.countSuffix || '';
  const duration = 1200; // ms
  const startTime = performance.now();

  function update(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.round(easedProgress * target);

    el.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
