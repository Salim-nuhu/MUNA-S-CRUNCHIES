/**
 * MUNA'S CRUNCHIES - 3D Perspective Tilt & Specular Glare System
 * Gives cards, hero headline, and feature images tactile, responsive depth
 * that reacts naturally to mouse movement.
 */

class InteractiveTilt {
  constructor() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }
    this.init();
  }

  init() {
    this.bindTiltCards();
    this.bindHeroHeadlineTilt();
  }

  bindTiltCards() {
    const cards = document.querySelectorAll('.tilt-card, [data-tilt]');

    cards.forEach((card) => {
      // Ensure glare overlay exists
      let glare = card.querySelector('.tilt-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'tilt-glare';
        card.appendChild(glare);
      }

      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 12; // degrees
      const scale = parseFloat(card.getAttribute('data-tilt-scale')) || 1.025;

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        // Calculate rotation angles
        const rotateY = percentX * maxTilt;
        const rotateX = -percentY * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        // Move glare specular highlight
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  bindHeroHeadlineTilt() {
    const heroSection = document.querySelector('#hero');
    const heroTitle = document.querySelector('.hero-tilt-headline');
    const heroBadge = document.querySelector('.hero-tilt-badge');
    const heroImages = document.querySelectorAll('.hero-parallax-item');

    if (!heroSection || !heroTitle) return;

    heroSection.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Subtle 3D tilt for the main brand title
      heroTitle.style.transform = `perspective(800px) rotateY(${offsetX * 6}deg) rotateX(${-offsetY * 6}deg) translate3d(${offsetX * 12}px, ${offsetY * 12}px, 0)`;

      if (heroBadge) {
        heroBadge.style.transform = `translate3d(${offsetX * 18}px, ${offsetY * 18}px, 0)`;
      }

      // Parallax floating decorative items
      heroImages.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 25;
        item.style.transform = `translate3d(${offsetX * speed}px, ${offsetY * speed}px, 0)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroTitle.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      heroTitle.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)';

      if (heroBadge) {
        heroBadge.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        heroBadge.style.transform = 'translate3d(0, 0, 0)';
      }

      heroImages.forEach((item) => {
        item.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.transform = 'translate3d(0, 0, 0)';
      });

      setTimeout(() => {
        heroTitle.style.transition = '';
        if (heroBadge) heroBadge.style.transition = '';
        heroImages.forEach((item) => (item.style.transition = ''));
      }, 800);
    });
  }
}

window.InteractiveTilt = InteractiveTilt;
