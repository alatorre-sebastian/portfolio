/**
 * Particle Engine — renders subtle floating particles on a canvas
 * positioned as background of the content area.
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 9.1, 9.2
 */

import { shouldAnimate } from '../utils/reduced-motion';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

export interface ParticleEngineConfig {
  container: HTMLElement;
  maxParticles?: number;
  colors?: string[];
  maxOpacity?: number;
  targetFps?: number;
}

export interface ParticleState {
  particles: Particle[];
  animationFrameId: number | null;
  lastFrameTime: number;
  isRunning: boolean;
}

const DEFAULT_MAX_PARTICLES = 50;
const DEFAULT_COLORS = ['#3b82f6', '#22c55e', '#a78bfa'];
const DEFAULT_MAX_OPACITY = 0.15;
const DEFAULT_TARGET_FPS = 30;

function createParticle(width: number, height: number, colors: string[], maxOpacity: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 2 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * maxOpacity,
  };
}

function updateParticle(particle: Particle, width: number, height: number): void {
  // Smooth organic direction changes
  particle.vx += (Math.random() - 0.5) * 0.02;
  particle.vy += (Math.random() - 0.5) * 0.02;

  // Clamp velocities to keep movement slow
  const maxVelocity = 0.4;
  particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
  particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));

  particle.x += particle.vx;
  particle.y += particle.vy;

  // Wrap around edges
  if (particle.x < 0) particle.x = width;
  if (particle.x > width) particle.x = 0;
  if (particle.y < 0) particle.y = height;
  if (particle.y > height) particle.y = 0;
}

export function createParticleEngine(config: ParticleEngineConfig) {
  const {
    container,
    maxParticles = DEFAULT_MAX_PARTICLES,
    colors = DEFAULT_COLORS,
    maxOpacity = DEFAULT_MAX_OPACITY,
    targetFps = DEFAULT_TARGET_FPS,
  } = config;

  // Don't initialize if reduced motion is preferred
  if (!shouldAnimate()) {
    return {
      start() {},
      stop() {},
      destroy() {},
    };
  }

  // Create canvas dynamically
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.setAttribute('aria-hidden', 'true');

  // Verify 2D context support
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      start() {},
      stop() {},
      destroy() {},
    };
  }

  // Insert canvas as first child of container
  container.insertBefore(canvas, container.firstChild);

  const state: ParticleState = {
    particles: [],
    animationFrameId: null,
    lastFrameTime: 0,
    isRunning: false,
  };

  const frameInterval = 1000 / targetFps;

  // Size the canvas to match container
  function resizeCanvas(): void {
    const rect = container.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 600;
    canvas.width = width;
    canvas.height = height;
  }

  // Use ResizeObserver if available, otherwise use fixed dimensions
  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);
  } else {
    resizeCanvas();
  }

  // Initialize particles
  function initParticles(): void {
    resizeCanvas();
    const count = Math.min(maxParticles, DEFAULT_MAX_PARTICLES);
    state.particles = [];
    for (let i = 0; i < count; i++) {
      state.particles.push(createParticle(canvas.width, canvas.height, colors, maxOpacity));
    }
  }

  function render(): void {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of state.particles) {
      updateParticle(particle, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(timestamp: number): void {
    if (!state.isRunning) return;

    const elapsed = timestamp - state.lastFrameTime;

    if (elapsed >= frameInterval) {
      state.lastFrameTime = timestamp - (elapsed % frameInterval);
      render();
    }

    state.animationFrameId = requestAnimationFrame(loop);
  }

  function start(): void {
    if (state.isRunning) return;
    initParticles();
    state.isRunning = true;
    state.lastFrameTime = performance.now();
    state.animationFrameId = requestAnimationFrame(loop);
  }

  function stop(): void {
    state.isRunning = false;
    if (state.animationFrameId !== null) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }
  }

  function destroy(): void {
    stop();
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    state.particles = [];
  }

  return { start, stop, destroy };
}
