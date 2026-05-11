/**
 * Skill Progress Bars — animates bar widths from 0% to their
 * data-progress value with staggered timing and ease-out.
 *
 * Respects the user's reduced-motion preference.
 */

import { shouldAnimate } from '../utils/reduced-motion';

/**
 * Initializes progress bar animations for all .skill-progress elements
 * within the given container.
 *
 * Animates width from 0% to data-progress value over 1.5s with ease-out,
 * staggered by 150ms per bar.
 */
export function initProgressBars(container: HTMLElement): void {
  const bars = container.querySelectorAll<HTMLElement>('.skill-progress');
  if (bars.length === 0) return;

  // If reduced motion, set widths immediately
  if (!shouldAnimate()) {
    bars.forEach((bar) => {
      const target = bar.dataset.progress || '0';
      bar.style.width = `${target}%`;
    });
    return;
  }

  bars.forEach((bar, index) => {
    const target = bar.dataset.progress || '0';
    // Reset to 0 initially
    bar.style.width = '0%';
    bar.style.transition = 'none';

    setTimeout(() => {
      // Apply transition and animate to target
      bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
      bar.style.width = `${target}%`;
    }, 150 * index);
  });
}
