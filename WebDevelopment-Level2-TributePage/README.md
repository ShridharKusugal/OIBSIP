# A Tribute to Dr. A. P. J. Abdul Kalam — The Missile Man of India

> **"Dream is not that which you see while sleeping; it is something that does not let you sleep."**  
> — *Dr. A. P. J. Abdul Kalam (Wings of Fire)*

A dignified, fully responsive, and accessible tribute website honoring the life, scientific genius, constitutional leadership, and enduring teachings of **Dr. Avul Pakir Jainulabdeen Abdul Kalam** (1931–2015), the 11th President of the Republic of India.

Developed as part of the **Oasis Infobyte Internship Program (OIBSIP)** under **Web Development and Designing — Level 2, Task 2**.

---

## 📌 Project Overview

- **Project Title:** A Tribute to Dr. A. P. J. Abdul Kalam
- **Domain:** Web Development and Designing
- **Internship Level & Task:** Level 2 — Task 2
- **Developer:** Shridhar Kusugal
- **Repository:** [ShridharKusugal/OIBSIP](https://github.com/ShridharKusugal/OIBSIP)
- **Architecture:** Pure Semantic HTML5, Modular CSS3, and Vanilla JavaScript (Zero external frameworks, Zero build tools, Zero `eval()`)

---

## 🛠️ Technology Stack

| Technology | Purpose & Implementation Details |
| :--- | :--- |
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`), ARIA labels, accessible skip links, and schema metadata. |
| **CSS3** | Custom properties (CSS variables), modern CSS Grid, Flexbox, responsive typography clamp, subtle keyframes, reduced-motion media queries, and tricolor accents. |
| **Vanilla JavaScript (ES6+)** | Dynamic scroll reading progress indicator, sticky header state, mobile hamburger drawer, active link ScrollSpy with `IntersectionObserver`, interactive quotes explorer with clipboard copy, category filters for achievements, and a youth pledge tracker. |

---

## ✨ Features & User Experience

### 1. Navigation & Header
- **Dignified Branding:** Features the custom emblem, title, and life span subtitle.
- **Sticky Blur Header:** Semi-transparent midnight navy navbar with glassmorphism backdrop blur that elevates with a shadow on scroll.
- **Reading Progress Bar:** Real-time top progress indicator reflecting reader progression down the page.
- **ScrollSpy Highlighting:** Dynamically updates the active navigation link corresponding to the section in view.
- **Mobile Responsive Drawer:** Accessible hamburger menu toggle with keyboard (`Escape` key), click-outside dismissal, and ARIA state management.

### 2. Editorial Hero Section
- **Authentic Portrait:** Crisp, optimized presidential portrait of Dr. Kalam in a dignified frame with an authentic signature plaque.
- **Core Statistics:** Quick summary statistics highlighting 40+ honorary doctorates, 1st satellite launch leadership, 5 guided missile programs, and his presidency.
- **Direct Calls to Action:** Instant smooth scroll to his biographical journey or quotes.

### 3. Chronological Biography
- **Four Editorial Chapters:**
  1. *Humble Roots & Early Discipline (1931–1954)* — Childhood in Rameswaram, distributing newspapers, and foundational physics studies at St. Joseph's College.
  2. *Passion for Aeronautics & Scientific Genesis (1955–1969)* — MIT aeronautical engineering, hovercraft *Nandi*, and mentorship under Dr. Vikram Sarabhai.
  3. *Architect of Space & Defense Sovereignty (1970–1999)* — Directing the historic SLV-III Rohini satellite launch, spearheading the Integrated Guided Missile Development Programme (Agni, Prithvi, Akash, Trishul, Nag), and Pokhran-II.
  4. *The People's President & Eternal Teacher (2000–2015)* — The 11th presidency, demystifying Rashtrapati Bhavan, mentoring 18+ million youth, and his final lecture at IIM Shillong.
- **Profile at a Glance Sidebar:** Quick reference card summarizing birthplace, education, major portfolios, and supreme civilian honors.

### 4. Interactive Timeline of Milestones
- **Vertical Timeline:** Clean central spine on desktop and left-aligned spine on mobile screens.
- **Verified Milestones:**
  - **1931** — Birth in Rameswaram, Tamil Nadu.
  - **1960** — Joined DRDO Aeronautical Development Establishment.
  - **1969** — Appointed Project Director of SLV-III at ISRO.
  - **1980** — Historic launch of Rohini-1 (RS-1) satellite into orbit.
  - **1982–1983** — Directed the Integrated Guided Missile Development Programme (IGMDP).
  - **1997** — Conferred the Bharat Ratna (India's highest civilian decoration).
  - **1998** — Operation Shakti (Pokhran-II nuclear tests).
  - **2002** — Sworn in as 11th President of India ("The People's President").
  - **2007** — Return to academia at IIMs, IITs, and Anna University.
  - **2015** — Final lecture at IIM Shillong and peaceful departure.

### 5. Multi-Faceted Achievements & Filter Grid
- **Category Filter Tabs:** Filter achievements across *All*, *Space & Defense*, *Honors & Awards*, *Books & Youth*, and *Healthcare Innovation*.
- **Highlighted Innovations:**
  - *SLV-III Orbital Launch Vehicle* (ISRO)
  - *IGMDP Strategic Deterrence Systems* (DRDO)
  - *Civilian Honors: Bharat Ratna, Padma Vibhushan, Padma Bhushan*
  - *People's Presidency & PURA rural framework*
  - *Literary Contributions: Wings of Fire, Ignited Minds*
  - *Biomedical Engineering: The Kalam-Raju Stent and Kalam-Raju Tablet*

### 6. Curated Quotes Explorer
- **Interactive Carousel:** Cycle through verified authentic quotes with category pills, book sources, and pagination dots.
- **One-Click Clipboard Copy:** Seamlessly copies the selected quote and citation with immediate visual confirmation.
- **Quotations Grid:** Additional six verified quotes on ambition, resilience, optimism, and excellence.

### 7. Dr. Kalam's 10-Point Youth Oath
- **Interactive Tracker:** Interactive checklist of Dr. Kalam's famous 10-point oath for students and youth.
- **Visual Progress Bar:** Real-time meter tracking how many principles the user has accepted, with a celebratory completion notice.

---

## 📂 Project Directory Structure

```text
OIBSIP/
└── WebDevelopment-Level2-TributePage/
    ├── index.html                  # Semantic HTML5 document
    ├── style.css                   # Custom CSS3 styling and responsive layout
    ├── script.js                   # Vanilla JavaScript interactivity
    ├── README.md                   # Comprehensive documentation
    ├── assets/
    │   └── images/
    │       ├── kalam-hero.jpg      # Optimized authentic portrait (88 KB)
    │       └── kalam-signature.svg # Vector facsimile of Dr. Kalam's signature
    └── screenshots/
        ├── .gitkeep                # Git tracking placeholder
        ├── tribute-desktop.png     # Desktop viewport capture (1280px+)
        └── tribute-mobile.png      # Mobile viewport capture (375px)
```

---

## 🚀 How to Run the Website Locally

Since the application uses pure vanilla web standards, it requires no build steps, Node packages, or compilers.

### Method 1: Direct File Launch
1. Clone or download the repository to your local computer.
2. Navigate to `OIBSIP/WebDevelopment-Level2-TributePage/`.
3. Double-click `index.html` or right-click and choose **Open with > Google Chrome** (or your preferred modern web browser).

### Method 2: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and select `WebDevelopment-Level2-TributePage` (or the repository root).
3. If you have the **Live Server** extension installed (`ritwickdey.liveserver`), right-click `index.html` and click **"Open with Live Server"**.
4. The website will launch automatically at `http://127.0.0.1:5500/index.html`.

### Method 3: Python Built-in HTTP Server
Open your terminal inside the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Open your browser and visit `http://localhost:8000`.

---

## 📸 Screenshots

| Viewport | Preview |
| :---: | :---: |
| **Desktop (1280px+)** | ![Desktop Preview](./screenshots/tribute-desktop.png) |
| **Mobile (375px)** | ![Mobile Preview](./screenshots/tribute-mobile.png) |

*(Screenshots can be captured directly from your local browser or Live Server and saved into the `screenshots/` directory).*

---

## 📚 Image Credits & Authentic Sources

- **Dr. A. P. J. Abdul Kalam Portrait:** Official Presidential Portrait, Government of India (Public Domain / GODL-India), hosted on [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam.jpg).
- **Dr. Kalam's Signature:** Vector facsimile hosted on [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam_signature.svg).
- **Biographical & Historical Records:**
  - *Wings of Fire: An Autobiography* (Universities Press, 1999)
  - *Ignited Minds: Unleashing the Power Within India* (Penguin Books, 2002)
  - Official Archives of the President of India ([presidentofindia.nic.in](https://presidentofindia.nic.in))
  - Indian Space Research Organisation Space History ([isro.gov.in](https://www.isro.gov.in))
  - Defence Research and Development Organisation Heritage ([drdo.gov.in](https://www.drdo.gov.in))

---

## 🎯 Key Learning Outcomes

1. **Semantic HTML5 Architecture:** Designing an editorial, publication-grade page using appropriate landmark tags, ARIA roles, and section hierarchies.
2. **Editorial UI/UX Design:** Combining a dignified color palette (deep navy `#0a192f`, crisp white `#ffffff`, and restrained saffron `#d97706`) with serif and sans-serif typography.
3. **Responsive Timeline Engineering:** Constructing a responsive alternating timeline on desktop that collapses into a left-anchored vertical rail on mobile devices without layout distortion.
4. **Vanilla JavaScript State & DOM Management:** Implementing an interactive carousel, filterable tabbed grid, and multi-checkbox oath meter cleanly without heavy JS libraries or insecure `eval()`.
5. **Accessibility & Performance:** Meeting WCAG AA contrast standards, implementing full physical keyboard navigation, supporting `prefers-reduced-motion`, and keeping total page weight under 300 KB for instantaneous loading.

---

## 📄 Disclaimer

This project is an educational tribute created as part of the **Oasis Infobyte Internship Program**. It is not an official government portal nor does it claim endorsement by Oasis Infobyte. All historical citations and media are used under fair academic use.
