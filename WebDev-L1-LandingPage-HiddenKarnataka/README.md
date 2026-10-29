# Hidden Karnataka — Hampi Travel Landing Page

> **"Discover the Stories Written in Stone."**  
> A premium, responsive travel-editorial landing page celebrating the ancient UNESCO World Heritage destination of **Hampi, Karnataka, India**.

---

## 📌 Project Overview

**Hidden Karnataka** is a fictional travel discovery brand created to inspire travellers, photographers, history enthusiasts, and students to explore the magnificent historic ruins, monolithic temples, boulder-strewn hills, and sacred riverscapes of **Hampi**, the legendary 14th-century capital of the Vijayanagara Empire.

This project has been developed as part of the **Oasis Infobyte Web Development & Designing Internship — Task 1: Landing Page**.

---

## 🏛️ Internship & Task Details

- **Organization:** Oasis Infobyte (OIBSIP)
- **Domain:** Web Development and Designing
- **Task:** Task 1 — Landing Page
- **Project Name:** Hidden Karnataka — Hampi Travel Landing Page
- **Brand Identity:**
  - **Destination:** Hampi, Karnataka, India
  - **Tagline:** *Discover the Stories Written in Stone.*
  - **Personality:** Cultural, adventurous, authentic, peaceful, and visually memorable.
  - **Target Audience:** Students, weekend travellers, heritage enthusiasts, photographers, solo travellers, and domestic tourists.

---

## 🎨 Visual Design Direction & Brand Palette

The design is inspired by heritage travel magazines and modern editorial travel websites, combining warm sandstone tones with rich charcoal contrast and muted natural olive accents:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Charcoal** | `#20231F` | High-contrast backgrounds, typography, and premium dark experience cards |
| **Heritage Sandstone** | `#C58B58` | Brand accent color, primary CTA buttons, badges, and ornamental rules |
| **Warm Cream** | `#F6F0E5` | Editorial backgrounds, cards, and warm structural framing |
| **Muted Olive Green** | `#747B54` | Nature-inspired accents and historical time markers |
| **Pure White** | `#FFFFFF` | Landmark cards, containers, and crisp card surfaces |
| **Secondary Text** | `#65665F` | Highly readable body paragraphs and metadata descriptions |

### Typography
- **Headlines & Display:** `Playfair Display` (Google Fonts serif) for timeless elegance and editorial sophistication.
- **Body & UI Controls:** `Inter` (Google Fonts sans-serif) for legibility across all screen sizes.

---

## 🚀 Key Features Implemented

1. **Sticky Glassmorphic Navigation Bar:**
   - Translucent cream background with CSS backdrop blur (`backdrop-filter`).
   - SVG brand emblem and clear typography.
   - Jump links to `#home`, `#story`, `#explore`, `#experiences`, `#itinerary`, `#why-us`, and `#contact`.
   - Prominent **"Plan Your Visit"** action button.
   - **Zero JavaScript:** Fully accessible, wrapped navigation designed to work seamlessly across mobile, tablet, and desktop without requiring a JavaScript hamburger menu.

2. **Full-Width Cinematic Hero Section:**
   - Authentic photograph of the iconic Stone Chariot at Vijaya Vittala Temple.
   - UNESCO World Heritage badge and location coordinates (`15.3350° N, 76.4600° E`).
   - Editorial headline and compelling introductory lead.
   - Dual CTA buttons: *"Explore Hampi"* and *"Discover Experiences"*.
   - Subtle CSS-only animated mouse scroll indicator.

3. **Section 3 — The Story of Hampi (Two-Column Layout):**
   - Narrative of the 14th-century Vijayanagara Empire founded along the Tungabhadra River.
   - Editorial photo frame with foundation badge (`1336 CE`).
   - Three structured heritage pillars: *Ancient Vijayanagara Heritage*, *Granite Boulder Landscapes*, and *Temples & Cultural Experiences*.

4. **Section 4 — Explore Hampi (Featured Landmark Cards):**
   - Responsive CSS Grid displaying 4 iconic monuments:
     1. **Virupaksha Temple** (7th–15th Century Living Temple)
     2. **Vijaya Vittala Temple & Stone Chariot** (16th Century Architectural Wonder)
     3. **Lotus Mahal** (Zenana Enclosure Indo-Islamic Arches)
     4. **Hemakuta Hill** (Pre-Vijayanagara Shrines & Panoramic Vistas)
   - Micro-interactions with CSS-only hover lifts (`transform: translateY(-8px)`), subtle image zoom, and glowing sandstone shadows.

5. **Section 5 — Experiences (Contrasting Charcoal Atmosphere):**
   - Deep charcoal background (`#20231F`) creating a clean visual break.
   - 3 immersive experience cards with large photography, numbered markers, and time guides:
     1. **Heritage Walks**
     2. **Boulder Landscapes and Viewpoints**
     3. **Sunrise and Sunset Photography**
   - Clear advisory note indicating that these are self-guided travel discovery suggestions.

6. **Section 6 — Suggested 2-Day Hampi Itinerary:**
   - Clean card-based timeline layout breaking down a curated 48-hour journey:
     - **Day 1: Sacred Heritage & River Trails** (Virupaksha, Hemakuta Hill, Sasivekalu Ganesha, Sunset Shrines)
     - **Day 2: Architectural Wonders & Royal Center** (Vittala Stone Chariot, Lotus Mahal, Elephant Stables, Stepped Tank, Matanga Hill)
   - Practical traveler advisory regarding ASI timings, attire guidelines, and weather considerations.

7. **Section 7 — Why Discover Hampi with Hidden Karnataka:**
   - 4 core discovery benefits with custom inline SVG icons:
     - *Curated Landmark Guides*
     - *Suggested Travel Itineraries*
     - *Photography & Viewpoint Inspiration*
     - *Heritage & Cultural Discovery*
   - Transparent concept disclaimer badge.

8. **Section 8 — Call-to-Action (CTA) Banner:**
   - Evocative landscape panorama background with warm sandstone gradient overlay.
   - Headline: *"Your Hampi Story Starts Here."*
   - Jump buttons navigating to landmark exploration and the 2-day guide.

9. **Section 9 — Comprehensive Footer:**
   - Brand logo, emblem, and cultural tagline.
   - Quick navigation links and featured landmark directories.
   - Clearly labeled placeholder contact info (`hello@example.com`) and social media links.
   - Project copyright and educational attribution notice.

---

## 🛠️ Technology Stack & Constraints

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Pure CSS without any third-party frameworks.
  - CSS Flexbox & CSS Grid for dynamic layouts.
  - CSS Custom Properties (Variables) for color tokens and shadows.
  - Responsive typography using `clamp()`.
  - Accessible focus states (`:focus-visible`).
  - Smooth native scrolling with sticky header offset (`scroll-padding-top`).
  - Accessibility: Full `@media (prefers-reduced-motion: reduce)` support.
- **Strictly No JavaScript:** No React, Bootstrap, Tailwind, or client scripts.
- **No Backend / Database:** Fully static, lightweight, and blazing-fast.

---

## 📁 Project Folder Structure

```
OIBSIP/
└── WebDev-L1-LandingPage-HiddenKarnataka/
    ├── index.html                  # Semantic HTML5 Landing Page
    ├── style.css                   # Pure CSS3 Stylesheet & Design System
    ├── README.md                   # Comprehensive Project Documentation
    ├── assets/
    │   └── images/                 # Optimized, authentic Hampi photographs
    │       ├── cta-panorama.jpg
    │       ├── exp-boulders.jpg
    │       ├── exp-heritage-walk.jpg
    │       ├── exp-sunset.jpg
    │       ├── hemakuta-hill.jpg
    │       ├── hero-chariot.jpg
    │       ├── lotus-mahal.jpg
    │       ├── story-hampi.jpg
    │       ├── virupaksha-temple.jpg
    │       └── vittala-chariot.jpg
    └── screenshots/
        ├── homepage-desktop.png    # Desktop Viewport Screenshot (1280px)
        └── homepage-mobile.png     # Mobile Viewport Screenshot (375px)
```

---

## 🏃 How to Run the Website Locally

Since the project uses purely static HTML5 and CSS3, you do not need any build tools, Node.js packages, or compilers.

### Option 1: Direct File Open
1. Navigate into the project folder:
   ```
   OIBSIP/WebDev-L1-LandingPage-HiddenKarnataka/
   ```
2. Double-click `index.html` or right-click and select **Open with > Chrome / Firefox / Edge / Safari**.

### Option 2: Using Python HTTP Server (Recommended)
1. Open a terminal or PowerShell in the project directory:
   ```bash
   cd OIBSIP/WebDev-L1-LandingPage-HiddenKarnataka
   ```
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000/
   ```

### Option 3: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## 📸 Screenshots

### 1. Desktop Viewport (1280 &times; 800)
![Desktop Landing Page Screenshot](screenshots/homepage-desktop.png)

### 2. Mobile Viewport (375 &times; 812)
![Mobile Landing Page Screenshot](screenshots/homepage-mobile.png)

---

## 📷 Image Sources & Attribution Details

All photographs used in this project are authentic images of Hampi monuments and landscapes, sourced from **Wikimedia Commons** under Creative Commons (CC BY-SA) and Public Domain licenses:

1. **Hero Section — Stone Chariot at Vittala Temple**  
   - Source: [Wikimedia Commons: File:Hampi chariot.jpg](https://commons.wikimedia.org/wiki/File:Hampi_chariot.jpg)  
   - Photographer: Dineshkannambadi  
   - License: CC BY-SA 3.0

2. **The Story of Hampi — Sunset on Matanga Hill**  
   - Source: [Wikimedia Commons: File:Hampi, India, Sunset on top of Matanga Hill.jpg](https://commons.wikimedia.org/wiki/File:Hampi,_India,_Sunset_on_top_of_Matanga_Hill.jpg)  
   - Photographer: Dey.sandip  
   - License: CC BY-SA 3.0

3. **Featured Landmark 1 — Virupaksha Temple Raya Gopuram**  
   - Source: [Wikimedia Commons: File:1 Virupaksha temple Gopuram Hampi Vijayanagar India.jpg](https://commons.wikimedia.org/wiki/File:1_Virupaksha_temple_Gopuram_Hampi_Vijayanagar_India.jpg)  
   - Photographer: Bernard Gagnon  
   - License: CC BY-SA 3.0

4. **Featured Landmark 2 — Vijaya Vittala Complex**  
   - Source: [Wikimedia Commons: File:Hampi chariot.jpg](https://commons.wikimedia.org/wiki/File:Hampi_chariot.jpg)  
   - Photographer: Dineshkannambadi  
   - License: CC BY-SA 3.0

5. **Featured Landmark 3 — Lotus Mahal (Kamal Mahal)**  
   - Source: [Wikimedia Commons: File:Hampi, India, Lotus Mahal.jpg](https://commons.wikimedia.org/wiki/File:Hampi,_India,_Lotus_Mahal.jpg)  
   - Photographer: Dey.sandip  
   - License: CC BY-SA 3.0

6. **Featured Landmark 4 — Hemakuta Hill & Shrines**  
   - Source: [Wikimedia Commons: File:Hampi - Hemakuta Hill, Virupaksha Temple.jpg](https://commons.wikimedia.org/wiki/File:Hampi_-_Hemakuta_Hill,_Virupaksha_Temple.jpg)  
   - Photographer: Aurobindo Biswas  
   - License: CC BY-SA 4.0

7. **Experience 1 — Heritage Walks (Pillared Mandapa)**  
   - Source: [Wikimedia Commons: File:Hampi - Platform, Pillars near Vittala Temple.jpg](https://commons.wikimedia.org/wiki/File:Hampi_-_Platform,_Pillars_near_Vittala_Temple.jpg)  
   - Photographer: Aurobindo Biswas  
   - License: CC BY-SA 4.0

8. **Experience 2 — Boulder Landscapes (Hemakuta Rock Formations)**  
   - Source: [Wikimedia Commons: File:Hemakuta Hill, Hampi.jpg](https://commons.wikimedia.org/wiki/File:Hemakuta_Hill,_Hampi.jpg)  
   - Photographer: Sanyam Bahga  
   - License: CC BY-SA 3.0

9. **Experience 3 & CTA Banner — Matanga Hill Sunset Horizon**  
   - Source: [Wikimedia Commons: File:Hampi, India, Sunset on top of Matanga Hill.jpg](https://commons.wikimedia.org/wiki/File:Hampi,_India,_Sunset_on_top_of_Matanga_Hill.jpg)  
   - Photographer: Dey.sandip  
   - License: CC BY-SA 3.0

---

## ⚖️ Project Disclaimer

*Hidden Karnataka* is an educational demonstration project prepared exclusively for **Oasis Infobyte Web Development & Designing Internship**. It is a creative design concept celebrating the cultural heritage of Karnataka and does not provide active commercial bookings, commercial tours, or travel transactions.

---

**Developed with ❤️ for Oasis Infobyte Internship Task 1.**
