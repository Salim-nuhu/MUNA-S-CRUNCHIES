/**
 * MUNA'S CRUNCHIES - Luxury Magnetic Cursor & Mouse Interaction Engine
 * Features:
 * - Fluid dual-stage lerp tracking (smooth inner dot & lagging golden ring)
 * - True Magnetic Button attraction physics (buttons physically pull toward cursor)
 * - Contextual cursor morphing (view, hover, click, drag)
 * - Radial ambient spotlight mouse tracking
 * - Automatic touch screen disabling for optimal mobile performance
 */

class LuxuryCursor {
  constructor() {
    // Touch screen safeguard
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    this.text = document.querySelector('.cursor-text');
    this.spotlight = document.querySelector('.mouse-spotlight');

    if (!this.dot || !this.ring) return;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.dotPos = { x: this.mouse.x, y: this.mouse.y };
    this.ringPos = { x: this.mouse.x, y: this.mouse.y };
    this.spotlightPos = { x: this.mouse.x, y: this.mouse.y };

    this.isHovering = false;
    this.isClicking = false;
    this.activeMagnetic = null;

    this.init();
  }

  init() {
    this.bindMouseEvents();
    this.bindMagneticElements();
    this.bindContextualHovers();
    this.renderLoop();
  }

  bindMouseEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', () => {
      this.isClicking = true;
      document.body.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
      this.isClicking = false;
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.ring.style.opacity = '0';
      if (this.spotlight) this.spotlight.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.dot.style.opacity = '1';
      this.ring.style.opacity = '1';
      if (this.spotlight) this.spotlight.style.opacity = '1';
    });
  }

  /**
   * Sets up magnetic button physics
   */
  bindMagneticElements() {
    const magnetics = document.querySelectorAll('.btn-magnetic, [data-magnetic]');

    magnetics.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic strength factor (0.28 pulls gently towards cursor)
        const pullFactor = 0.28;
        const moveX = distanceX * pullFactor;
        const moveY = distanceY * pullFactor;

        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

        // Optional inner text magnetic amplification
        const innerText = el.querySelector('.btn-text, span');
        if (innerText) {
          innerText.style.transform = `translate3d(${moveX * 0.4}px, ${moveY * 0.4}px, 0)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0px, 0px, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        const innerText = el.querySelector('.btn-text, span');
        if (innerText) {
          innerText.style.transform = 'translate3d(0px, 0px, 0)';
          innerText.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        setTimeout(() => {
          el.style.transition = '';
          if (innerText) innerText.style.transition = '';
        }, 400);
      });
    });
  }

  /**
   * Bind contextual cursor states (hover, view, crunch)
   */
  bindContextualHovers() {
    // Standard interactive items
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, select, .interactive-hover');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // Product cards (Show "VIEW" or "CRUNCH" in cursor)
    const viewTargets = document.querySelectorAll('[data-cursor-view]');
    viewTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
        if (this.text) {
          this.text.textContent = target.getAttribute('data-cursor-view') || 'VIEW';
        }
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });
    });
  }

  // Linear interpolation helper
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  renderLoop() {
    // Dot tracks tightly
    this.dotPos.x = this.lerp(this.dotPos.x, this.mouse.x, 0.4);
    this.dotPos.y = this.lerp(this.dotPos.y, this.mouse.y, 0.4);

    // Ring lags with organic buttery damping
    this.ringPos.x = this.lerp(this.ringPos.x, this.mouse.x, 0.16);
    this.ringPos.y = this.lerp(this.ringPos.y, this.mouse.y, 0.16);

    // Spotlight tracks smoothly
    if (this.spotlight) {
      this.spotlightPos.x = this.lerp(this.spotlightPos.x, this.mouse.x, 0.08);
      this.spotlightPos.y = this.lerp(this.spotlightPos.y, this.mouse.y, 0.08);
      this.spotlight.style.transform = `translate3d(${this.spotlightPos.x}px, ${this.spotlightPos.y}px, 0)`;
    }

    this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
    this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;
    if (this.text) {
      this.text.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

window.LuxuryCursor = LuxuryCursor;
