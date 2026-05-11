/**
 * Detects the user's `prefers-reduced-motion` preference and exposes
 * a reactive `shouldAnimate()` function for use across animation modules.
 *
 * Returns `true` when animations are allowed (no reduced motion preference)
 * and `false` when the user prefers reduced motion.
 */

let prefersReducedMotion = false;

function initReducedMotionDetection(): void {
  if (typeof window === 'undefined') return;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion = mediaQuery.matches;

  mediaQuery.addEventListener('change', (event) => {
    prefersReducedMotion = event.matches;
  });
}

// Initialize on module load (client-side only)
initReducedMotionDetection();

/**
 * Returns whether animations should play.
 * `true` = animations allowed, `false` = user prefers reduced motion.
 */
export function shouldAnimate(): boolean {
  return !prefersReducedMotion;
}
