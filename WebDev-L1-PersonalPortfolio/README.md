# Shridhar Kusugal — Personal Portfolio Website

> **"Building Ideas Into Digital Experiences."**  
> A modern, accessible, and high-performance personal developer portfolio showcasing projects, technical skills, and academic journey in software development.

---

## 📌 Project Overview

This personal developer portfolio was designed and built as part of the **Oasis Infobyte Web Development & Designing Internship — Task 2: Personal Portfolio**.

The portfolio serves as an interactive professional showcase for **Shridhar Kusugal**, an MCA candidate at **Chetan Business School, Hubballi**, aspiring to build a career in software development, Python backend engineering, relational database management (MySQL), and full-stack web applications.

---

## 🏛️ Internship & Task Details

- **Organization:** [Oasis Infobyte (OIBSIP)](https://oasisinfobyte.com/)
- **Domain:** Web Development and Designing
- **Task:** Task 2 — Personal Portfolio Website
- **Developer:** Shridhar Kusugal
- **Education:** Master of Computer Applications (MCA) @ Chetan Business School, Hubballi
- **Core Stack:** Python 3.x, MySQL, HTML5, CSS3, JavaScript, Git & GitHub
- **Live Repository:** [ShridharKusugal/OIBSIP](https://github.com/ShridharKusugal/OIBSIP)

---

## 🎨 Visual Design Direction & Theme Architecture

The portfolio implements a sleek glassmorphic aesthetic with high-contrast surfaces, luminous accent gradients, and native support for both **Dark Mode** and **Light Mode**:

| Color Token | Dark Mode Value | Light Mode Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#0B1020` | `#F4F6FB` | Base canvas background |
| **Secondary Background** | `rgba(17, 26, 46, 0.72)` | `rgba(235, 240, 249, 0.85)` | Navigation & section separation |
| **Card Surface** | `rgba(21, 31, 53, 0.78)` | `rgba(255, 255, 255, 0.88)` | Glassmorphic content cards |
| **Primary Accent** | `#8B5CF6` (Violet) | `#7C3AED` | Primary buttons, badges, highlights |
| **Secondary Accent** | `#22D3EE` (Cyan) | `#0284C7` | Links, tags, gradient transitions |
| **Primary Text** | `#F8FAFC` | `#0F172A` | Main headlines & high-emphasis text |
| **Secondary Text** | `#A7B2C7` | `#475569` | Body paragraphs & descriptions |

### Typography
- **Primary Interface Font:** `'Inter'`, system sans-serif for optimal readability.
- **Code & Tech Indicators:** `'JetBrains Mono'`, `'Fira Code'`, monospace for technical badges and stack highlights.

---

## 🚀 Key Features Implemented

1. **Dual Theme Engine (Dark / Light Mode):**
   - Seamless toggling between dark obsidian and crisp light themes.
   - User preference persisted via `localStorage`.
   - Dynamic SVGs for Sun and Moon indicators.

2. **Sticky Glassmorphic Navigation Bar:**
   - Translucent background with backdrop blur (`backdrop-filter: blur(14px)`).
   - Brand emblem with active developer status pulse dot.
   - Dynamic scroll elevation (`.scrolled` class on scroll).
   - Active scrollspy indicating current section in view.
   - Fully responsive mobile drawer navigation with animated hamburger toggle.

3. **Hero Section with Full Portrait Showcase:**
   - High-impact headline: *"Building Ideas Into Digital Experiences."*
   - Interactive full portrait showcase (`profile.jpg`) with gradient border halo and active collaboration status badge.
   - Smooth 3D cursor-reactive perspective tilt (`perspective(1200px)`).
   - Core tech stack inline tags and dual CTA action buttons (*"Explore My Projects"* & *"Contact Me"*).

4. **Section 3 — About Me:**
   - Professional portrait showcase card with academic details.
   - Narrative biography outlining MCA coursework and problem-solving passion.
   - Structured Career Objective box and personal details grid.

5. **Section 4 — Technical Skills & Competencies:**
   - 4 modular category cards:
     - **Programming & Scripting:** Python, JavaScript, Object-Oriented Design.
     - **Database & Data Management:** MySQL, Relational Schema Modeling, SQL Queries.
     - **Web Development & UI:** HTML5, CSS3, Responsive Design, DOM APIs.
     - **Tools & Workflow:** Git, GitHub, VS Code, MySQL Workbench.

6. **Section 5 — Featured Projects Showcase:**
   - Detailed project cards with category badges, description, tech stack tags, and repository links:
     - **Personal Portfolio Website:** Accessible, responsive developer showcase with dark/light theme.
     - **Database Management & Querying Utilities:** Python and MySQL data scripts and relational modeling.
     - **Academic Software Prototypes:** Practical coursework applications and algorithms.

7. **Section 6 — Educational Journey & Timeline:**
   - Chronological vertical timeline with glowing node indicators.
   - Highlights MCA degree program at Chetan Business School, Hubballi.
   - Key coursework: Advanced Software Engineering, Database Systems, Web Technologies.

8. **Section 7 — Areas of Interest & Research:**
   - Structured research cards detailing core focus areas:
     - Relational Database Systems & Optimization
     - Object-Oriented Software Design
     - Full-Stack Web Application Development
     - Python Programming & Data Access Patterns

9. **Section 8 — Let's Connect & Collaborate (Contact):**
   - Centered profile avatar showcase with live collaboration status indicator.
   - Direct connection links to **LinkedIn** and **GitHub**.
   - Verified availability note for internship and software developer trainee opportunities.

10. **Interactive Utilities & Accessibility:**
    - Smooth scroll-to-top floating action button with threshold detection.
    - Keyboard-friendly navigation with visible focus rings.
    - Respect for `prefers-reduced-motion` media queries.

---

## 📁 File Structure

```
WebDev-L1-PersonalPortfolio/
├── index.html            # Semantic HTML5 structure (8 comprehensive sections)
├── style.css             # Modular CSS3 styling, glassmorphism, responsive grids & themes
├── script.js            # Vanilla JavaScript for theme toggle, navigation, scrollspy & tilt
├── profile.jpg           # Developer portrait photograph (Shridhar Kusugal)
├── background.jpg        # Ambient backdrop texture
└── README.md             # Task documentation & setup guide
```

---

## 🏃 How to Run Locally

1. **Direct Browser Open:**
   - Navigate to the `WebDev-L1-PersonalPortfolio/` directory.
   - Double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).

2. **Using Python HTTP Server:**
   ```bash
   cd WebDev-L1-PersonalPortfolio
   python -m http.server 8000
   ```
   Open [http://localhost:8000](http://localhost:8000) in your browser.

3. **Using VS Code Live Server:**
   - Open the directory in Visual Studio Code.
   - Right-click `index.html` and select **"Open with Live Server"**.

---

## ⚖️ License

Created by **Shridhar Kusugal** as part of the **Oasis Infobyte Internship Program (OIBSIP)** under the MIT License.
