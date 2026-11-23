# 🥐 MUNA'S CRUNCHIES — Artisanal Bakery & Patisserie
> *“Crunch into Happiness” / “Handcrafted Joy, One Bite at a Time”*

Welcome to the official codebase for **MUNA'S CRUNCHIES**, a luxury interactive single-page web experience crafted for a modern artisanal bakery.

---

## 🎨 Creative & Sensory Vision

The website is engineered to feel **alive, warm, and delicious** — recreating the emotional nostalgia of stepping into a bakery at sunrise:
- **Atmospheric Palette**: Warm Cream (`#FDF6E9`), Soft Caramel (`#E8C9A0`), Rich Chocolate Brown (`#4A2C0A`), Golden Honey (`#F4A261`), Soft Blush Pink (`#E9C4C4`), and Deep Espresso (`#2C1810`).
- **Tactile Paper Feeling**: Subtle SVG fractal noise grain overlay across the entire viewport mimicking authentic bakery parchment paper.
- **Micro-Interactions Everywhere**: Magnetic buttons that pull toward the cursor, 3D perspective card tilt with dynamic specular glare, interactive flour/crumb particle bursts when hovering key story words, and Web Audio API synthesized bakery chimes.

---

## 📂 Project Architecture

```
munas-crunchies/
├── index.html            # Complete semantic HTML5 markup with ARIA dialogs & structured microdata
├── css/
│   └── style.css         # Artisanal bakery design system, typography, cursor states & animations
├── js/
│   ├── particles.js      # High-DPI Canvas physics engine (flour dust, crumbs & sparkle bursts)
│   ├── cursor.js         # Dual-stage lerp magnetic cursor & radial ambient spotlight
│   ├── tilt.js           # 3D perspective tilt & specular glare calculation on mousemove
│   └── main.js           # State management, cart drawer, Web Audio synthesizer & GSAP triggers
└── README.md             # Architecture, animation explanations & integration guide
```

---

## ✨ Key Animation & Interaction Techniques

### 1. Canvas Physics Particle Engine (`js/particles.js`)
- Runs a lightweight 60fps canvas loop with automatic DPR scaling (`window.devicePixelRatio`).
- **Ambient Drift**: Fine particles representing stone-ground flour, golden honey specks, and caramelized pastry crumbs gently wobble and drift downwards with sine-wave oscillation.
- **Mouse Repulsion**: When the cursor passes near ambient particles, a calculated radial force pushes them outward with smooth fluid drag.
- **Explosive Burst Emitter (`emitBurst(x, y, count, theme)`)**: Hovering highlighted words in *Our Story* (`flour`, `cultured butter`, `golden honey`, `roasted cacao`) or clicking *Add to Cart* emits color-matched dust clouds with gravity and rotational decay.

### 2. Magnetic Buttons & Dual-Stage Custom Cursor (`js/cursor.js`)
- **Linear Interpolation (Lerp)**:
  - Inner dot: `lerp(dotPos, mousePos, 0.40)` (tight, immediate feedback)
  - Outer golden ring: `lerp(ringPos, mousePos, 0.16)` (buttery organic lag)
- **True Magnetic Pull**: Buttons with `.btn-magnetic` calculate the cursor offset from the element's bounding center. When the cursor is near, the button translates up to `28%` toward the cursor, giving a physical magnetic sensation.
- **Touch Screen Graceful Fallback**: Uses media queries `(hover: none) and (pointer: coarse)` to automatically disable the custom cursor on mobile and tablet devices, guaranteeing standard native touch behavior.

### 3. Real-Time 3D Card Tilt with Specular Glare (`js/tilt.js`)
- Product cards and the hero headline track mouse coordinates relative to their center.
- Calculates normalized percentages `(-1.0 to +1.0)` and computes rotational transforms:
  ```javascript
  const rotateY = percentX * maxTilt;
  const rotateX = -percentY * maxTilt;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
  ```
- Also dynamically updates an overlay radial gradient (`.tilt-glare`) giving the appearance of light reflecting off a polished surface.

### 4. Zero-Asset Web Audio API Synthesizer (`js/main.js`)
- No external `.mp3` or `.wav` network requests required!
- Uses pure synthesized audio oscillators:
  - **Golden Chime**: Dual harmonic frequencies (E5, A5, D6) with gentle exponential decay for cart additions.
  - **Wood Click**: Triangle wave pitch-dropped from 420Hz to 140Hz for filter tabs and buttons.
  - **Oven Ding**: Authentic brass shop bell dual strike for the storefront easter egg (`#easter-egg-bell`).
  - Includes a quick mute/unmute bell toggle in the navigation bar that saves user preferences to `localStorage`.

---

## 📸 Replacing Placeholder Images

The website is pre-configured with curated, high-resolution bakery photography from Unsplash. To use your own images:

1. Place your `.webp`, `.jpg`, or `.png` files inside the `assets/` folder (e.g. `assets/cruffin.webp`, `assets/biscotti.webp`).
2. Open `js/main.js` and update the `image` property inside the `BAKERY_PRODUCTS` array:
   ```javascript
   {
     id: 'cruffin-pistachio',
     name: 'The Golden Pistachio Cruffin',
     image: 'assets/cruffin.webp',
     ...
   }
   ```
3. Update the hero and craft preview images directly in `index.html`.

---

## 🛒 Connecting a Real Backend or E-Commerce Cart

### 1. Stripe Checkout Integration
To convert the current cart drawer into live Stripe Checkout:
```javascript
// Inside CartController.simulateCheckout() in js/main.js:
async function handleStripeCheckout(cartItems) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems })
  });
  const session = await response.json();
  window.location.href = session.url;
}
```

### 2. Shopify Storefront API
To sync with a Shopify inventory:
- Replace `BAKERY_PRODUCTS` in `js/main.js` with a `fetch()` call to your Shopify GraphQL Storefront endpoint (`/api/2024-01/graphql.json`).
- Send the `variantId` and quantity directly to create a Shopify checkout web URL.

### 3. Contact & Catering Form
The `#contact-catering-form` is set up with standard event listeners. You can hook it directly to:
- **Formspree / EmailJS**: Add `action="https://formspree.io/f/your-id"` and `method="POST"`.
- **Firebase / Supabase**: Insert the submission object into a `catering_inquiries` table.

---

## 🚀 Running the Project Locally

Because this project is built with clean vanilla web standards, you can preview it immediately:
1. Open `index.html` directly in any modern browser (Chrome, Edge, Safari, Firefox).
2. Or use any local static server:
   ```bash
   # Using Python:
   python -m http.server 8080
   # Or using npx serve:
   npx serve .
   ```
3. Set your active workspace in Antigravity to:
   `C:\Users\USER\.gemini\antigravity\scratch\munas-crunchies`
