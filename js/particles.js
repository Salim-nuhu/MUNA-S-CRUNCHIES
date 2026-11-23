/**
 * MUNA'S CRUNCHIES - Interactive Canvas Particle System
 * Simulates gentle drifting flour dust, golden honey specks, and pastry crumbs.
 * Features fluid mouse repulsion, dynamic bursts on interactive triggers,
 * and high-DPI canvas rendering.
 */

class BakeryParticleSystem {
  constructor(canvasId = 'particles-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.burstParticles = [];
    this.maxAmbientParticles = 55;
    
    // Mouse state with velocity & smoothing
    this.mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      active: false
    };

    // Color palettes for particles
    this.types = [
      { name: 'flour', color: 'rgba(255, 253, 249, 0.75)', sizeMin: 1.5, sizeMax: 3.2, speedY: 0.35 },
      { name: 'goldenHoney', color: 'rgba(244, 162, 97, 0.65)', sizeMin: 2, sizeMax: 4.5, speedY: 0.5 },
      { name: 'crumb', color: 'rgba(200, 153, 101, 0.6)', sizeMin: 1.2, sizeMax: 2.8, speedY: 0.45 },
      { name: 'amberSpark', color: 'rgba(231, 111, 81, 0.7)', sizeMin: 1.5, sizeMax: 3.5, speedY: 0.3 }
    ];

    this.init();
  }

  init() {
    this.resize();
    this.createAmbientParticles();
    this.bindEvents();
    this.loop();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);
  }

  createAmbientParticles() {
    this.particles = [];
    // Adjust density based on screen size
    const count = this.width < 768 ? 25 : this.maxAmbientParticles;

    for (let i = 0; i < count; i++) {
      this.particles.push(this.generateParticle());
    }
  }

  generateParticle(overrideY = null) {
    const type = this.types[Math.floor(Math.random() * this.types.length)];
    const size = Math.random() * (type.sizeMax - type.sizeMin) + type.sizeMin;

    return {
      x: Math.random() * this.width,
      y: overrideY !== null ? overrideY : Math.random() * this.height,
      size: size,
      baseSize: size,
      color: type.color,
      name: type.name,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * type.speedY + 0.15,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.3,
      baseOpacity: Math.random() * 0.5 + 0.3,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createAmbientParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Handle touch movement gently
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.active = false;
    });
  }

  /**
   * Triggers an explosive burst of crumbs or sparkles at (x, y)
   * Perfect for word hovering, button clicks, or adding to cart
   */
  emitBurst(x, y, count = 25, theme = 'honey') {
    let colors = ['rgba(244, 162, 97, 0.9)', 'rgba(231, 111, 81, 0.9)', 'rgba(200, 153, 101, 0.9)', 'rgba(255, 253, 249, 0.95)'];
    if (theme === 'flour') {
      colors = ['rgba(255, 255, 255, 0.95)', 'rgba(253, 246, 233, 0.85)', 'rgba(245, 232, 211, 0.75)'];
    } else if (theme === 'chocolate') {
      colors = ['rgba(74, 44, 10, 0.9)', 'rgba(120, 70, 30, 0.85)', 'rgba(44, 24, 16, 0.95)'];
    }

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const size = Math.random() * 3.5 + 1.5;

      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // slight upward boost
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.025 + 0.02,
        gravity: 0.12,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }
  }

  updateAmbient() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Oscillating drift
      p.angle += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.angle) * p.wobbleAmp * 0.3;
      p.y += p.speedY;

      // Mouse repulsion physics
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius && dist > 0) {
          const force = (1 - dist / this.mouse.radius) * 2.8;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
          p.opacity = Math.min(1, p.baseOpacity + 0.3);
        } else {
          p.opacity = p.baseOpacity;
        }
      }

      // Wrap around screen boundaries
      if (p.y > this.height + 10) {
        this.particles[i] = this.generateParticle(-10);
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
    }
  }

  updateBursts() {
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];
      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.vy += bp.gravity;
      bp.vx *= 0.96; // drag
      bp.vy *= 0.96;
      bp.rotation += bp.rotSpeed;
      bp.life -= bp.decay;

      if (bp.life <= 0) {
        this.burstParticles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw burst particles
    for (let i = 0; i < this.burstParticles.length; i++) {
      const bp = this.burstParticles[i];
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, bp.life);
      this.ctx.fillStyle = bp.color;
      this.ctx.translate(bp.x, bp.y);
      this.ctx.rotate(bp.rotation);
      // Soft rounded flake/crumb shape
      this.ctx.beginPath();
      this.ctx.roundRect(-bp.size / 2, -bp.size / 2, bp.size, bp.size * 1.2, 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  loop() {
    this.updateAmbient();
    this.updateBursts();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// Global instance exposed for interaction hooks
window.BakeryParticles = BakeryParticleSystem;
