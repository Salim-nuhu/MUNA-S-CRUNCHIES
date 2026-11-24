/**
 * MUNA'S CRUNCHIES - Main Application Engine
 * Handles State, Audio Synthesis, Cart Drawer, Quick View Modal,
 * Menu Filtering, Easter Eggs, and GSAP Scroll Interactions.
 */

// ==========================================================================
// 1. Artisanal Product Database
// ==========================================================================
const BAKERY_PRODUCTS = [
  {
    id: 'cruffin-pistachio',
    name: 'The Golden Pistachio Cruffin',
    category: 'viennoiserie',
    badge: 'Bestseller',
    price: 6.50,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    shortDesc: '81-layer croissant dough muffin rolled in crushed Sicilian pistachios, injected with silky cardamom pastry cream.',
    details: 'Hand-laminated over 3 days using AOP Charentes-Poitou cultured butter. Baked in fluted molds until caramelized and crowned with roasted Bronte pistachios.',
    tastingNotes: ['Toasted Pistachio', 'Fresh Green Cardamom', 'Sweet Butter Caramel', 'Wildflower Honey'],
    allergens: ['Wheat / Gluten', 'Tree Nuts (Pistachio)', 'Dairy', 'Eggs']
  },
  {
    id: 'biscotti-honey-almond',
    name: "Muna's Honey Butter Biscotti",
    category: 'crunchies',
    badge: 'Signature',
    price: 8.00,
    rating: 5.0,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Double-baked Italian-style crunchies infused with orange blossom essence, wildflower honey, and roasted California almonds.',
    details: 'The original crunch that inspired our name. Double-baked to an intoxicating snap that softens into pure caramelized almond bliss when dipped into hot espresso.',
    tastingNotes: ['Orange Blossom', 'Warm Honey', 'Toasted Almond', 'Madagascar Vanilla'],
    allergens: ['Wheat / Gluten', 'Tree Nuts (Almond)', 'Dairy', 'Eggs']
  },
  {
    id: 'cookie-valrhona-sea-salt',
    name: 'Valrhona Triple Choc Sourdough Cookie',
    category: 'crunchies',
    badge: 'Chef Favorite',
    price: 4.75,
    rating: 4.95,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Crispy blistered caramelized rim with a warm, molten 72% dark chocolate center, finished with Brittany fleur de sel.',
    details: 'Infused with a dollop of our 6-year-old sourdough starter for deep, complex depth of flavor and irresistible chew.',
    tastingNotes: ['Smoked Cocoa', 'Maldon Sea Salt', 'Molasses', 'Brown Butter Nutty Finish'],
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs', 'Soy Lecithin']
  },
  {
    id: 'sourdough-country-batard',
    name: 'Heritage Country Sourdough Batard',
    category: 'sourdough',
    badge: '48h Ferment',
    price: 9.50,
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Stone-ground organic heirloom flour batard with blistered crunchy ear, open custard crumb, and mild yogurt tang.',
    details: 'Wild-yeast fermented for 48 cold hours. Baked directly on blazing 240°C granite deck ovens with steam injection.',
    tastingNotes: ['Toasted Malt', 'Wild Yeast Tang', 'Caramelized Crust', 'Earthy Wheat'],
    allergens: ['Wheat / Gluten']
  },
  {
    id: 'tart-caramel-pecan',
    name: 'Salted Caramel Pecan Tartlet',
    category: 'patisserie',
    badge: 'Seasonal',
    price: 7.25,
    rating: 4.85,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Ultra-crisp sablé crust filled with amber salted caramel, roasted Georgia pecans, and dark chocolate ganache.',
    details: 'A decadent harmony of textures: crunchy butter pastry, chewy caramelized nuts, and velvety smooth single-origin ganache.',
    tastingNotes: ['Salted Butter Toffee', 'Roasted Pecan', 'Dark Ganache', 'Vanilla Bean'],
    allergens: ['Wheat / Gluten', 'Tree Nuts (Pecan)', 'Dairy', 'Eggs']
  },
  {
    id: 'brioche-raspberry-rose',
    name: 'Raspberry Rose Cloud Brioche',
    category: 'patisserie',
    badge: 'Floral Special',
    price: 5.80,
    rating: 4.88,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Feather-light golden brioche swirled with tart organic raspberry reduction, glazed in pink rosewater glaze and candied petals.',
    details: 'Enriched with farm-fresh pasture egg yolks and European butter, yielding a pillowy crumb that practically melts upon contact.',
    tastingNotes: ['Tart Wild Raspberry', 'Damask Rose', 'Sweet Vanilla Brioche'],
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs']
  },
  {
    id: 'crunch-almond-brittle',
    name: 'Toffee Almond Brittle Crunch Jar',
    category: 'crunchies',
    badge: 'Pantry Staple',
    price: 7.00,
    rating: 4.92,
    reviews: 79,
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Shattered shards of golden butter toffee studded with slow-toasted almonds and dusted in Dutch cocoa.',
    details: 'Packed in airtight reusable glass jars to preserve the explosive snap and buttery goodness.',
    tastingNotes: ['Burnt Sugar', 'Slow Toasted Almond', 'Cacao Dust', 'Sea Salt'],
    allergens: ['Tree Nuts (Almond)', 'Dairy']
  },
  {
    id: 'morning-bun-cardamom',
    name: 'Spiced Cardamom Morning Bun',
    category: 'viennoiserie',
    badge: 'Morning Ritual',
    price: 5.50,
    rating: 4.96,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Laminated pastry scraps spun with dark brown sugar, Ceylon cinnamon, and fresh cracked green cardamom in cast iron.',
    details: 'The bakery team favorite. The bottom caramelizes into a chewy toffee glaze while the top remains delightfully crisp.',
    tastingNotes: ['Ceylon Cinnamon', 'Cracked Cardamom Pod', 'Muscovado Toffee', 'Crispy Pastry'],
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs']
  }
];

// ==========================================================================
// 2. Synthesized Web Audio Sound Engine (Zero external audio assets)
// ==========================================================================
class BakeryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('munas_audio_muted') === 'true';
    this.updateToggleIcon();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('munas_audio_muted', this.isMuted);
    this.updateToggleIcon();
    if (!this.isMuted) {
      this.playChime();
    }
  }

  updateToggleIcon() {
    const iconBtn = document.getElementById('audio-toggle-btn');
    if (!iconBtn) return;
    const iconSpan = iconBtn.querySelector('.audio-icon');
    if (iconSpan) {
      iconSpan.textContent = this.isMuted ? '🔇' : '🔔';
    }
    iconBtn.setAttribute('title', this.isMuted ? 'Sound effects disabled' : 'Artisanal sound effects active');
  }

  /**
   * Harmonious golden bell chime for cart adds & celebrations
   */
  playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [659.25, 880.0, 1174.66]; // E5, A5, D6 harmonic chime

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.0);
    });
  }

  /**
   * Tactile organic click for tabs and buttons
   */
  playWoodClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Classic bakery shop front doorbell ding!
   */
  playBakeryBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Dual bell strike
    [1318.51, 1567.98].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.3);
    });
  }
}

// ==========================================================================
// 3. Cart State & Drawer Controller
// ==========================================================================
class CartController {
  constructor(audio) {
    this.audio = audio;
    this.items = JSON.parse(localStorage.getItem('munas_cart_items') || '[]');
    this.freeShippingThreshold = 45.00;

    // Cache elements
    this.drawer = document.getElementById('cart-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.cartItemsContainer = document.getElementById('cart-items-container');
    this.cartSubtotalEl = document.getElementById('cart-subtotal');
    this.freeShippingBar = document.getElementById('free-shipping-progress');
    this.freeShippingText = document.getElementById('free-shipping-text');
    this.emptyCartState = document.getElementById('empty-cart-state');
    this.cartContentWrapper = document.getElementById('cart-content-wrapper');

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Open drawer triggers
    document.querySelectorAll('.trigger-open-cart').forEach((btn) => {
      btn.addEventListener('click', () => this.open());
    });

    // Close drawer triggers
    document.querySelectorAll('.trigger-close-cart').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => {
        this.close();
        if (window.quickView) window.quickView.close();
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.simulateCheckout());
    }

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    if (this.drawer && this.backdrop) {
      this.backdrop.classList.add('active');
      this.drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.audio.playWoodClick();
    }
  }

  close() {
    if (this.drawer && this.backdrop) {
      this.drawer.classList.remove('active');
      this.backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  addItem(productId, quantity = 1, event = null) {
    const product = BAKERY_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex((item) => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: quantity
      });
    }

    this.save();
    this.render();
    this.audio.playChime();

    // Trigger visual particle celebration
    if (event && window.particlesInstance) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      window.particlesInstance.emitBurst(x, y, 30, 'honey');
    }

    // Trigger toast notification
    showToast(`Added ${quantity}× "${product.name}" to your morning basket!`);
  }

  updateQuantity(productId, delta) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.items = this.items.filter((i) => i.id !== productId);
      showToast(`Removed "${item.name}" from your basket.`);
    }

    this.save();
    this.render();
    this.audio.playWoodClick();
  }

  save() {
    localStorage.setItem('munas_cart_items', JSON.stringify(this.items));
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  render() {
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Update count badges
    this.cartCountBadges.forEach((badge) => {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    });

    if (count === 0) {
      if (this.emptyCartState) this.emptyCartState.classList.remove('hidden');
      if (this.cartContentWrapper) this.cartContentWrapper.classList.add('hidden');
      return;
    }

    if (this.emptyCartState) this.emptyCartState.classList.add('hidden');
    if (this.cartContentWrapper) this.cartContentWrapper.classList.remove('hidden');

    // Update Subtotal
    if (this.cartSubtotalEl) {
      this.cartSubtotalEl.textContent = `GH₵${subtotal.toFixed(2)}`;
    }

    // Free Shipping Progress
    if (this.freeShippingBar && this.freeShippingText) {
      const remaining = this.freeShippingThreshold - subtotal;
      const progressPercent = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
      this.freeShippingBar.style.width = `${progressPercent}%`;

      if (remaining <= 0) {
        this.freeShippingText.innerHTML = `🎉 <strong>Complimentary Artisanal Gift Box Unlocked!</strong>`;
        this.freeShippingBar.classList.add('bg-emerald-500');
      } else {
        this.freeShippingText.innerHTML = `Add <strong>GH₵${remaining.toFixed(2)}</strong> more for <em>Complimentary Artisanal Box Delivery</em>`;
        this.freeShippingBar.classList.remove('bg-emerald-500');
      }
    }

    // Render items
    if (this.cartItemsContainer) {
      this.cartItemsContainer.innerHTML = this.items
        .map(
          (item) => `
        <div class="flex items-center gap-4 p-3 bg-white/70 rounded-xl border border-[#E8C9A0]/30 shadow-sm transition hover:shadow-md">
          <img src="${item.image}" alt="${item.name}" class="w-18 h-18 rounded-lg object-cover w-[72px] h-[72px] border border-[#E8C9A0]/40 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="font-serif font-bold text-[#2C1810] text-sm truncate">${item.name}</h4>
            <p class="text-xs text-[#8A6E5D] font-medium mt-0.5">GH₵${item.price.toFixed(2)} each</p>
            <div class="flex items-center gap-3 mt-2">
              <div class="inline-flex items-center border border-[#E8C9A0] rounded-full bg-[#FFFDF9] overflow-hidden text-xs">
                <button onclick="window.cart.updateQuantity('${item.id}', -1)" class="px-2.5 py-0.5 text-[#2C1810] hover:bg-[#F5E8D3] transition font-bold" aria-label="Decrease quantity">−</button>
                <span class="px-2 font-semibold text-[#2C1810]">${item.qty}</span>
                <button onclick="window.cart.updateQuantity('${item.id}', 1)" class="px-2.5 py-0.5 text-[#2C1810] hover:bg-[#F5E8D3] transition font-bold" aria-label="Increase quantity">+</button>
              </div>
              <button onclick="window.cart.updateQuantity('${item.id}', -${item.qty})" class="text-xs text-[#E76F51] hover:underline font-medium">Remove</button>
            </div>
          </div>
          <div class="text-right">
            <span class="font-bold text-[#2C1810] text-sm">GH₵${(item.price * item.qty).toFixed(2)}</span>
          </div>
        </div>
      `
        )
        .join('');
    }
  }

  simulateCheckout() {
    this.audio.playChime();
    if (window.particlesInstance) {
      window.particlesInstance.emitBurst(window.innerWidth / 2, window.innerHeight / 2, 60, 'honey');
    }
    
    // Receipt Modal display
    const checkoutReceipt = document.getElementById('checkout-receipt-modal');
    if (checkoutReceipt) {
      document.getElementById('receipt-order-id').textContent = 'MC-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('receipt-total').textContent = `GH₵${this.getSubtotal().toFixed(2)}`;
      checkoutReceipt.classList.add('active');
    }

    this.items = [];
    this.save();
    this.render();
    this.close();
  }
}

// ==========================================================================
// 4. Quick View Modal Controller
// ==========================================================================
class QuickViewController {
  constructor(audio) {
    this.audio = audio;
    this.modal = document.getElementById('quick-view-modal');
    this.backdrop = document.getElementById('drawer-backdrop');
    this.currentProduct = null;
    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = document.getElementById('close-quick-view');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    const addBtn = document.getElementById('qv-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        if (this.currentProduct && window.cart) {
          const qty = parseInt(document.getElementById('qv-qty-input').value, 10) || 1;
          window.cart.addItem(this.currentProduct.id, qty, e);
          this.close();
        }
      });
    }
  }

  open(productId) {
    const product = BAKERY_PRODUCTS.find((p) => p.id === productId);
    if (!product || !this.modal) return;

    this.currentProduct = product;

    // Populate modal content
    document.getElementById('qv-image').src = product.image;
    document.getElementById('qv-image').alt = product.name;
    document.getElementById('qv-badge').textContent = product.badge;
    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-price').textContent = `GH₵${product.price.toFixed(2)}`;
    document.getElementById('qv-desc').textContent = product.shortDesc;
    document.getElementById('qv-details').textContent = product.details;
    document.getElementById('qv-qty-input').value = 1;

    // Tasting notes tags
    const notesContainer = document.getElementById('qv-tasting-notes');
    if (notesContainer) {
      notesContainer.innerHTML = product.tastingNotes
        .map((note) => `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8C9A0]/30 text-[#4A2C0A] border border-[#E8C9A0]/50">${note}</span>`)
        .join('');
    }

    // Allergens tags
    const allergensContainer = document.getElementById('qv-allergens');
    if (allergensContainer) {
      allergensContainer.innerHTML = product.allergens
        .map((a) => `<span class="px-2 py-0.5 rounded text-[11px] bg-red-50 text-red-800 border border-red-200">${a}</span>`)
        .join('');
    }

    this.modal.classList.add('active');
    if (this.backdrop) this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.audio.playWoodClick();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    if (this.backdrop && !document.getElementById('cart-drawer').classList.contains('active')) {
      this.backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// ==========================================================================
// 5. Toast Notification System
// ==========================================================================
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `
    <span class="text-lg">🥐</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 350);
  }, 3800);
}

// ==========================================================================
// 6. Signature Menu Render & Filtering
// ==========================================================================
function setupMenu(audio) {
  const menuGrid = document.getElementById('product-grid');
  const filterTabs = document.querySelectorAll('.menu-filter-btn');

  function renderGrid(filter = 'all') {
    if (!menuGrid) return;

    const filtered = filter === 'all' 
      ? BAKERY_PRODUCTS 
      : BAKERY_PRODUCTS.filter(p => p.category === filter);

    menuGrid.innerHTML = filtered.map(product => `
      <article 
        class="product-card tilt-card group" 
        data-tilt 
        data-tilt-max="10" 
        data-cursor-view="CRUNCH"
        data-product-id="${product.id}"
      >
        <div class="product-card-img-wrap aspect-[4/3] relative">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy" 
            class="w-full h-full object-cover"
          />
          <span class="absolute top-3 left-3 bg-[#2C1810]/85 text-[#FDF6E9] backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-[#E8C9A0]/30 shadow-sm">
            ${product.badge}
          </span>
          <button 
            onclick="window.quickView.open('${product.id}')" 
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C1810] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            title="Quick view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </div>

        <div class="p-6 tilt-inner">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-serif font-bold text-xl text-[#2C1810] group-hover:text-[#4A2C0A] transition line-clamp-1">
              ${product.name}
            </h3>
            <span class="font-bold text-lg text-[#4A2C0A] whitespace-nowrap">
              GH₵${product.price.toFixed(2)}
            </span>
          </div>

          <p class="text-sm text-[#5C4334] line-clamp-2 mb-4 leading-relaxed font-normal">
            ${product.shortDesc}
          </p>

          <div class="flex items-center justify-between pt-3 border-t border-[#E8C9A0]/30">
            <div class="flex items-center gap-1 text-xs text-[#8A6E5D]">
              <span class="text-amber-500 font-bold">★ ${product.rating}</span>
              <span>(${product.reviews})</span>
            </div>

            <button 
              onclick="window.cart.addItem('${product.id}', 1, event)"
              class="btn-magnetic btn-primary px-4 py-2 text-xs font-bold rounded-full transition flex items-center gap-1.5 shadow-sm"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Rebind tilt & cursor view hooks
    if (window.tiltEngine) window.tiltEngine.bindTiltCards();
    if (window.cursorEngine) window.cursorEngine.bindContextualHovers();
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active', 'bg-[#4A2C0A]', 'text-white'));
      filterTabs.forEach(t => t.classList.add('bg-white/70', 'text-[#2C1810]'));
      
      tab.classList.add('active', 'bg-[#4A2C0A]', 'text-white');
      tab.classList.remove('bg-white/70', 'text-[#2C1810]');

      audio.playWoodClick();
      renderGrid(tab.getAttribute('data-filter'));
    });
  });

  renderGrid('all');
}

// ==========================================================================
// 7. Interactive Story Words & Easter Eggs
// ==========================================================================
function setupStoryAndEasterEggs(audio) {
  // Story highlighted words trigger particle clouds
  document.querySelectorAll('.story-word-interactive').forEach((word) => {
    word.addEventListener('mouseenter', (e) => {
      const type = word.getAttribute('data-particle') || 'honey';
      const rect = word.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (window.particlesInstance) {
        window.particlesInstance.emitBurst(x, y, 22, type);
      }
      audio.playWoodClick();
    });
  });

  // Bakery Storefront Bell Ring
  const doorbellBtn = document.getElementById('easter-egg-bell');
  if (doorbellBtn) {
    doorbellBtn.addEventListener('click', (e) => {
      audio.playBakeryBell();
      const rect = doorbellBtn.getBoundingClientRect();
      if (window.particlesInstance) {
        window.particlesInstance.emitBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45, 'honey');
      }
      showToast("🔔 Ding dong! Muna is rolling fresh butter croissants in the back!");
    });
  }

  // Chimney aroma steam trigger
  const chimney = document.getElementById('bakery-chimney');
  if (chimney) {
    chimney.addEventListener('mouseenter', (e) => {
      const rect = chimney.getBoundingClientRect();
      if (window.particlesInstance) {
        window.particlesInstance.emitBurst(rect.left + rect.width / 2, rect.top, 30, 'flour');
      }
    });
  }

  // Contact form submission with celebration
  const contactForm = document.getElementById('contact-catering-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playChime();
      const rect = contactForm.getBoundingClientRect();
      if (window.particlesInstance) {
        window.particlesInstance.emitBurst(rect.left + rect.width / 2, rect.top + 80, 50, 'honey');
      }
      showToast("✨ Inquiry received! The baking team will reach out within 2 hours.");
      contactForm.reset();
    });
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playChime();
      const rect = newsletterForm.getBoundingClientRect();
      if (window.particlesInstance) {
        window.particlesInstance.emitBurst(rect.left + rect.width / 2, rect.top + 20, 40, 'honey');
      }
      showToast("🥐 Welcome to the Baker's Journal! Free Almond Crunchie voucher sent to your inbox.");
      newsletterForm.reset();
    });
  }
}

// ==========================================================================
// 8. Craft Process Interactive Tabs
// ==========================================================================
function setupCraftProcess(audio) {
  const steps = [
    {
      id: 1,
      title: 'The Sacred Starter & Grains',
      temp: '21°C Room Ferment',
      time: 'Day 1 • 06:00 AM',
      tag: '6-Year Wild Mother "Amira"',
      quote: '“True flavor takes patience. We mill ancient heirloom Khorasan and Emmer wheat berries every dawn.”',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      bullets: [
        '100% stone-ground unbleached organic grain',
        'Natural wild Lactobacillus fermentation',
        'Rich prebiotic sugars and natural enzymatic sweetness'
      ]
    },
    {
      id: 2,
      title: 'The Cold Lamination & Folding',
      temp: '4°C Chilled Marble',
      time: 'Day 2 • 04:30 AM',
      tag: '81 Gossamer Layers',
      quote: '“Butter is music. 84% fat Charentes cultured butter folded through gossamer sheets creates our signature shatter.”',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Slow double-turn lamination on chilled granite tables',
        'Normandy cultured butter with sea salt crystals',
        '24-hour resting period to relax gluten tension'
      ]
    },
    {
      id: 3,
      title: 'The Granite Hearth Fire',
      temp: '240°C Deck Blast',
      time: 'Day 3 • 05:00 AM',
      tag: 'Volcanic Steam Injection',
      quote: '“The blistered ear and golden amber crust come from intense stone heat and pressurized micro-steam.”',
      img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Baking on thick volcanic refractory stone tiles',
        'Immediate burst of fine steam for gelatinized crust',
        'Deep Maillard caramelization with resonant hollow thump'
      ]
    },
    {
      id: 4,
      title: 'The Honey Glaze & Curation',
      temp: 'Cooling Rack at 28°C',
      time: 'Day 3 • 07:00 AM',
      tag: 'Hand-Finished & Boxed',
      quote: '“Brushed while still crackling hot with raw local wildflower honey, then packed in breathable kraft paper.”',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Single-origin raw comb honey drizzle',
        'Packed in 100% biodegradable artisan boxes',
        'Served fresh to our morning line every morning'
      ]
    }
  ];

  const container = document.getElementById('craft-steps-list');
  const previewImg = document.getElementById('craft-preview-image');
  const previewTitle = document.getElementById('craft-preview-title');
  const previewQuote = document.getElementById('craft-preview-quote');
  const previewTemp = document.getElementById('craft-preview-temp');
  const previewTime = document.getElementById('craft-preview-time');
  const previewBullets = document.getElementById('craft-preview-bullets');

  if (!container) return;

  function setStep(index) {
    const s = steps[index];
    if (previewImg) previewImg.src = s.img;
    if (previewTitle) previewTitle.textContent = s.title;
    if (previewQuote) previewQuote.textContent = s.quote;
    if (previewTemp) previewTemp.textContent = s.temp;
    if (previewTime) previewTime.textContent = s.time;
    if (previewBullets) {
      previewBullets.innerHTML = s.bullets
        .map(b => `<li class="flex items-center gap-2 text-sm text-[#5C4334]"><span class="w-1.5 h-1.5 rounded-full bg-[#F4A261]"></span>${b}</li>`)
        .join('');
    }

    document.querySelectorAll('.craft-step-card').forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });
  }

  container.innerHTML = steps.map((s, idx) => `
    <button 
      class="craft-step-card w-full text-left p-4 rounded-xl transition ${idx === 0 ? 'active' : ''}"
      data-step-index="${idx}"
    >
      <div class="flex items-center justify-between text-xs font-semibold text-[#8A6E5D] mb-1">
        <span>STEP 0${s.id}</span>
        <span class="text-[#E76F51]">${s.tag}</span>
      </div>
      <h4 class="font-serif font-bold text-lg text-[#2C1810]">${s.title}</h4>
      <p class="text-xs text-[#5C4334] mt-1 line-clamp-1">${s.quote}</p>
    </button>
  `).join('');

  container.querySelectorAll('.craft-step-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-step-index'), 10);
      setStep(idx);
      audio.playWoodClick();
    });
  });

  setStep(0);
}

// ==========================================================================
// 9. Sticky Header & Mobile Drawer Navigation
// ==========================================================================
function setupNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  function toggleMobile(open) {
    if (!mobileDrawer) return;
    if (open) {
      mobileDrawer.classList.add('active');
      if (mobileBackdrop) mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('active');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobile(true));
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobile(false));
  }
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => toggleMobile(false));
  });
}

// ==========================================================================
// 10. GSAP Scroll Animations Setup
// ==========================================================================
function setupGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero entrance animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-badge-reveal', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2
  })
  .from('.hero-title-reveal', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15
  }, '-=0.5')
  .from('.hero-sub-reveal', {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, '-=0.6')
  .from('.hero-cta-reveal', {
    y: 25,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15
  }, '-=0.5')
  .from('.hero-image-reveal', {
    scale: 0.92,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out'
  }, '-=0.8');

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up sections on scroll
    gsap.utils.toArray('.scroll-reveal').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      });
    });
  }
}

// ==========================================================================
// App Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Canvas Particles
  window.particlesInstance = new BakeryParticleSystem('particles-canvas');

  // Initialize Audio Engine
  const audio = new BakeryAudioEngine();
  window.audioEngine = audio;

  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => audio.toggleMute());
  }

  // Initialize Cursors & 3D Tilt
  window.cursorEngine = new LuxuryCursor();
  window.tiltEngine = new InteractiveTilt();

  // Initialize Cart & Quick View
  window.cart = new CartController(audio);
  window.quickView = new QuickViewController(audio);

  // Setup Menu, Stories, Craft, and Nav
  setupMenu(audio);
  setupStoryAndEasterEggs(audio);
  setupCraftProcess(audio);
  setupNavigation();

  // Close Receipt Modal
  const closeReceiptBtn = document.getElementById('close-receipt-btn');
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      document.getElementById('checkout-receipt-modal').classList.remove('active');
    });
  }

  // Run GSAP entrance
  setupGSAPAnimations();
});
