/**
 * Content Transitions — orchestrates smooth exit/enter animations
 * when switching between sections in the content area.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 9.3
 */

import { animate, stagger } from '@motionone/dom';
import { shouldAnimate } from '../utils/reduced-motion';

export interface TransitionConfig {
  exitDuration: number;    // 200ms
  enterDuration: number;   // 400ms
  staggerDelay: number;    // 80ms
  exitScale: number;       // 0.98
  enterOffset: number;     // 20px
}

export const DEFAULT_TRANSITION_CONFIG: TransitionConfig = {
  exitDuration: 200,
  enterDuration: 400,
  staggerDelay: 80,
  exitScale: 0.98,
  enterOffset: 20,
};

// Track the current animation so it can be cancelled on rapid clicks
let currentAnimation: Animation | null = null;

/**
 * Transitions content within a container using exit and enter animations.
 * Cancels any in-progress animation if called rapidly.
 * Respects `prefers-reduced-motion` — replaces content immediately if disabled.
 */
export async function transitionContent(
  container: HTMLElement,
  newContent: string,
  config: TransitionConfig = DEFAULT_TRANSITION_CONFIG
): Promise<void> {
  // Cancel any previous animation in progress
  if (currentAnimation) {
    currentAnimation.cancel();
    currentAnimation = null;
  }

  // Preserve any canvas elements (e.g., particle engine) that should persist across transitions
  const persistentElements = Array.from(
    container.querySelectorAll('canvas[aria-hidden="true"]')
  );

  // If reduced motion is preferred, replace content immediately
  if (!shouldAnimate()) {
    container.innerHTML = newContent;
    persistentElements.forEach(el => container.insertBefore(el, container.firstChild));
    return;
  }

  // Exit animation: fade out + scale down
  const exitControls = animate(
    container,
    { opacity: [1, 0], transform: [`scale(1)`, `scale(${config.exitScale})`] },
    { duration: config.exitDuration / 1000, easing: 'ease-in' }
  );

  currentAnimation = exitControls.finished as unknown as Animation;

  try {
    await exitControls.finished;
  } catch {
    // Animation was cancelled (rapid click) — proceed with content swap
  }

  // Replace content after exit completes, preserving persistent elements
  container.innerHTML = newContent;
  persistentElements.forEach(el => container.insertBefore(el, container.firstChild));

  // Entry animation: fade in + scale up + translate from offset
  const enterControls = animate(
    container,
    {
      opacity: [0, 1],
      transform: [
        `scale(${config.exitScale}) translateY(${config.enterOffset}px)`,
        `scale(1) translateY(0px)`,
      ],
    },
    { duration: config.enterDuration / 1000, easing: 'ease-out' }
  );

  currentAnimation = enterControls.finished as unknown as Animation;

  // Apply stagger to direct children
  const children = container.children;
  if (children.length > 0) {
    animate(
      container.children as unknown as Element[],
      {
        opacity: [0, 1],
        transform: [`translateY(${config.enterOffset}px)`, 'translateY(0px)'],
      },
      {
        duration: config.enterDuration / 1000,
        easing: 'ease-out',
        delay: stagger(config.staggerDelay / 1000),
      }
    );
  }

  try {
    await enterControls.finished;
  } catch {
    // Animation was cancelled — content is already swapped, nothing else to do
  }

  currentAnimation = null;
}
