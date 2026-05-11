/**
 * Timeline Animations — controls the progress bar animation,
 * dot pulses, and shimmer effect on the timeline component.
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 9.3
 */

import { animate } from '@motionone/dom';
import { shouldAnimate } from '../utils/reduced-motion';

/**
 * Animates the timeline progress bar width from 0% to 95%
 * over the given duration with an ease-in-out curve.
 *
 * If reduced motion is preferred, sets the bar to 95% immediately.
 */
export function animateTimelineProgress(bar: HTMLElement, duration: number = 1500): void {
  if (!shouldAnimate()) {
    bar.style.width = '95%';
    return;
  }

  animate(
    bar,
    { width: ['0%', '95%'] },
    { duration: duration / 1000, easing: 'ease-in-out' }
  );
}

/**
 * Pulses a timeline dot by scaling it from 1.5 to 1.0 over 300ms.
 * No-op if reduced motion is preferred.
 */
export function pulseTimelineDot(dot: HTMLElement): void {
  if (!shouldAnimate()) {
    return;
  }

  animate(
    dot,
    { transform: ['scale(1.5)', 'scale(1.0)'] },
    { duration: 0.3, easing: 'ease-out' }
  );
}

/**
 * Activates the `.timeline-shimmer` class on the bar element
 * with a repeating cycle. The shimmer CSS animation runs on a
 * 4-second loop (defined in animations.css).
 *
 * If reduced motion is preferred, the shimmer is not started.
 *
 * @param bar - The progress bar element to apply shimmer to
 * @param interval - Cycle interval in ms (default 4000, matches CSS keyframe)
 */
export function initTimelineShimmer(bar: HTMLElement, interval: number = 4000): void {
  if (!shouldAnimate()) {
    return;
  }

  bar.classList.add('timeline-shimmer');
}
