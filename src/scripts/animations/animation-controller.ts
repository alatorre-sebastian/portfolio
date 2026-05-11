/**
 * Animation Controller — orchestrates all animation modules for the portfolio.
 * Acts as the central entry point that initializes sub-modules and coordinates
 * section transitions, timeline pulses, and lazy initialization of effects.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 3.3, 7.2, 9.1, 9.5
 */

import { createParticleEngine } from './particle-engine';
import { transitionContent, DEFAULT_TRANSITION_CONFIG } from './content-transitions';
import {
  initSidebarInteractions,
  initSkillBadgeInteractions,
  initProfilePhotoInteraction,
} from './micro-interactions';
import { typeText, type TypingConfig } from './typing-effect';
import {
  animateTimelineProgress,
  pulseTimelineDot,
  initTimelineShimmer,
} from './timeline-animations';

/**
 * Color mapping per section for dynamic border gradients and glows.
 */
export const SECTION_COLORS: Record<string, { border: string; glow: string }> = {
  'btn-intro':    { border: '#3b82f6', glow: 'rgba(59, 130, 246, 0.15)' },
  'btn-exp':      { border: '#22c55e', glow: 'rgba(34, 197, 94, 0.15)' },
  'btn-skills':   { border: '#a78bfa', glow: 'rgba(167, 139, 250, 0.15)' },
  'btn-edu':      { border: '#fbbf24', glow: 'rgba(251, 191, 36, 0.15)' },
  'btn-projects': { border: '#22c55e', glow: 'rgba(34, 197, 94, 0.15)' },
  'btn-contact':  { border: '#3b82f6', glow: 'rgba(59, 130, 246, 0.15)' },
};

/**
 * Maps section IDs to their corresponding timeline dot index.
 */
const SECTION_DOT_INDEX: Record<string, number> = {
  'btn-intro': 0,
  'btn-exp': 1,
  'btn-skills': 2,
  'btn-edu': 3,
  'btn-projects': 4,
  'btn-contact': 4,
};

const DEFAULT_TYPING_CONFIG: TypingConfig = {
  speed: 50,
  cursorBlinkRate: 530,
  cursorLingerTime: 2000,
};

export interface AnimationController {
  init(): void;
  onSectionChange(sectionId: string, newContent: string): Promise<void>;
  destroy(): void;
}

/**
 * Creates and returns an AnimationController instance that orchestrates
 * all animation modules for the portfolio site.
 */
export function createAnimationController(): AnimationController {
  let particleEngine: ReturnType<typeof createParticleEngine> | null = null;
  let contentArea: HTMLElement | null = null;
  let timelineBar: HTMLElement | null = null;
  let timelineDots: HTMLElement[] = [];
  let typingInitialized = false;

  function init(): void {
    // Get DOM references
    contentArea = document.getElementById('content-area');
    const sidebarButtons = document.querySelectorAll('.action-btn');

    // Use stable IDs added to Timeline.astro
    timelineBar = document.getElementById('timeline-progress-bar');
    timelineDots = Array.from(
      document.querySelectorAll('.timeline-dot')
    ) as HTMLElement[];

    // Start particle engine on #content-area
    if (contentArea) {
      particleEngine = createParticleEngine({
        container: contentArea,
      });
      particleEngine.start();
    }

    // Animate timeline progress
    if (timelineBar) {
      animateTimelineProgress(timelineBar);
      initTimelineShimmer(timelineBar);
    }

    // Init sidebar interactions
    if (sidebarButtons.length > 0) {
      initSidebarInteractions(sidebarButtons);
    }

    // Init profile photo interaction (intro section is loaded initially)
    initProfilePhoto();

    // Run typing effect on intro section (lazy: only on first load)
    if (contentArea && !typingInitialized) {
      runTypingEffect();
    }

    // Set initial section color
    updateSectionColor('btn-intro');
  }

  function runTypingEffect(): void {
    if (!contentArea) return;

    // Look for the typing target element in the intro section
    const typingTarget = contentArea.querySelector(
      '[data-typing-target], .typing-target'
    ) as HTMLElement | null;

    if (typingTarget) {
      const text = typingTarget.textContent || '';
      typingTarget.textContent = '';
      typingInitialized = true;
      typeText(typingTarget, text, DEFAULT_TYPING_CONFIG);
    }
  }

  function initProfilePhoto(): void {
    if (!contentArea) return;

    const photo = contentArea.querySelector(
      'img[src*="Profilee"], img[src*="profile"], [data-profile-photo]'
    ) as HTMLElement | null;

    if (photo) {
      initProfilePhotoInteraction(photo);
    }
  }

  function updateSectionColor(sectionId: string): void {
    if (!contentArea) return;

    const colors = SECTION_COLORS[sectionId];
    if (colors) {
      contentArea.style.setProperty('--section-color', colors.border);
      contentArea.style.setProperty('--section-glow', colors.glow);
    }
  }

  function onSectionChange(sectionId: string, newContent: string): Promise<void> {
    if (!contentArea) return Promise.resolve();

    // Update section colors (CSS custom properties)
    updateSectionColor(sectionId);

    // Pulse the corresponding timeline dot
    const dotIndex = SECTION_DOT_INDEX[sectionId];
    if (dotIndex !== undefined && timelineDots[dotIndex]) {
      pulseTimelineDot(timelineDots[dotIndex]);
    }

    // Orchestrate content transition and return the promise
    return transitionContent(contentArea, newContent, DEFAULT_TRANSITION_CONFIG).then(() => {
      // After transition completes, init section-specific interactions

      // Skill badge interactions — only in skills section
      if (sectionId === 'btn-skills' && contentArea) {
        initSkillBadgeInteractions(contentArea);
      }

      // Profile photo and typing effect — only in intro section
      if (sectionId === 'btn-intro') {
        initProfilePhoto();
        runTypingEffect();
      }
    });
  }

  function destroy(): void {
    if (particleEngine) {
      particleEngine.destroy();
      particleEngine = null;
    }

    contentArea = null;
    timelineBar = null;
    timelineDots = [];
  }

  return { init, onSectionChange, destroy };
}
