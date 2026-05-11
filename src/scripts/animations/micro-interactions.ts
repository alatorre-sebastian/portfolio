/**
 * Micro-interactions — hover effects, click pulses, and animated indicators
 * for sidebar buttons, skill badges, and the profile photo.
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 10.1, 10.2, 10.3, 9.3
 */

import { animate, stagger } from '@motionone/dom';
import { shouldAnimate } from '../utils/reduced-motion';

/**
 * Color mapping for sidebar button hover glow.
 * Based on the action type: blue for page.goto/page.evaluate,
 * green for click/hover, yellow for scroll.
 */
const BUTTON_GLOW_COLORS: Record<string, string> = {
  'btn-intro': '#3b82f6',    // blue — page.goto
  'btn-exp': '#22c55e',      // green — click
  'btn-skills': '#22c55e',   // green — hover
  'btn-edu': '#fbbf24',      // yellow — scroll
  'btn-projects': '#22c55e', // green — click
  'btn-contact': '#3b82f6',  // blue — page.evaluate
};

/**
 * Registers hover, click, and active-state interactions on sidebar buttons.
 *
 * - Hover: 4px horizontal displacement to the right in 150ms
 * - Click: pulse effect scale 1.02 → 1.0 in 200ms
 * - Active: inserts `.active-indicator` element (2px blue bar with pulsing glow)
 * - Hover glow: left border glow colored by action type
 */
export function initSidebarInteractions(buttons: NodeListOf<Element>): void {
  if (!shouldAnimate()) return;

  buttons.forEach((btn) => {
    const element = btn as HTMLElement;

    // Hover: displacement + glow
    element.addEventListener('mouseenter', () => {
      animate(
        element,
        { transform: 'translateX(4px)' },
        { duration: 0.15, easing: 'ease-out' }
      );

      const glowColor = BUTTON_GLOW_COLORS[element.id] || '#3b82f6';
      element.style.boxShadow = `inset 3px 0 8px -2px ${glowColor}`;
    });

    element.addEventListener('mouseleave', () => {
      animate(
        element,
        { transform: 'translateX(0px)' },
        { duration: 0.15, easing: 'ease-out' }
      );

      element.style.boxShadow = '';
    });

    // Click: pulse effect
    element.addEventListener('click', () => {
      animate(
        element,
        { transform: ['scale(1.02)', 'scale(1)'] },
        { duration: 0.2, easing: 'ease-out' }
      );

      // Update active indicator
      setActiveIndicator(buttons, element);
    });
  });

  // Set initial active indicator on the currently active button
  const activeBtn = Array.from(buttons).find((btn) =>
    btn.classList.contains('active-btn')
  );
  if (activeBtn) {
    setActiveIndicator(buttons, activeBtn as HTMLElement);
  }
}

/**
 * Inserts the `.active-indicator` element on the target button
 * and removes it from all other buttons.
 */
function setActiveIndicator(
  buttons: NodeListOf<Element>,
  target: HTMLElement
): void {
  // Remove existing indicators
  buttons.forEach((btn) => {
    const existing = btn.querySelector('.active-indicator');
    if (existing) existing.remove();
  });

  // Ensure relative positioning for the indicator
  if (!target.style.position || target.style.position === 'static') {
    target.style.position = 'relative';
  }

  // Create and insert the indicator
  const indicator = document.createElement('span');
  indicator.className = 'active-indicator';
  target.appendChild(indicator);
}

/**
 * Registers staggered entry and hover interactions on skill badges.
 * Called after the skills section content is rendered.
 *
 * - Entry: staggered appearance from below with 50ms delay between badges
 * - Hover: scale 1.08, border glow in category color, colored shadow in 150ms
 * - Mouse leave: revert with ease-out in 200ms
 */
export function initSkillBadgeInteractions(container: HTMLElement): void {
  if (!shouldAnimate()) return;

  const badges = container.querySelectorAll(
    '.skill-badge, [data-skill-badge]'
  );
  if (badges.length === 0) return;

  // Staggered entry animation from below
  animate(
    badges as unknown as Element[],
    {
      opacity: [0, 1],
      transform: ['translateY(12px)', 'translateY(0px)'],
    },
    {
      duration: 0.3,
      easing: 'ease-out',
      delay: stagger(0.05),
    }
  );

  // Hover interactions for each badge
  badges.forEach((badge) => {
    const element = badge as HTMLElement;

    element.addEventListener('mouseenter', () => {
      // Determine category color from data attribute or fallback
      const categoryColor =
        element.dataset.categoryColor || '#3b82f6';

      animate(
        element,
        { transform: 'scale(1.08)' },
        { duration: 0.15, easing: 'ease-out' }
      );

      element.style.boxShadow = `0 4px 15px ${categoryColor}40, 0 0 8px ${categoryColor}30`;
      element.style.borderColor = categoryColor;
    });

    element.addEventListener('mouseleave', () => {
      animate(
        element,
        { transform: 'scale(1)' },
        { duration: 0.2, easing: 'ease-out' }
      );

      element.style.boxShadow = '';
      element.style.borderColor = '';
    });
  });
}

/**
 * Registers hover interaction on the profile photo element.
 *
 * - Hover: adds `.profile-ring` class to wrapper and scales 1.05 in 300ms ease-out
 * - Mouse leave: reverts both effects in 400ms
 */
export function initProfilePhotoInteraction(photo: HTMLElement): void {
  if (!shouldAnimate()) return;

  const wrapper = photo.parentElement;

  photo.addEventListener('mouseenter', () => {
    if (wrapper) {
      wrapper.classList.add('profile-ring');
    }

    animate(
      photo,
      { transform: 'scale(1.05)' },
      { duration: 0.3, easing: 'ease-out' }
    );
  });

  photo.addEventListener('mouseleave', () => {
    if (wrapper) {
      wrapper.classList.remove('profile-ring');
    }

    animate(
      photo,
      { transform: 'scale(1)' },
      { duration: 0.4, easing: 'ease-out' }
    );
  });
}
