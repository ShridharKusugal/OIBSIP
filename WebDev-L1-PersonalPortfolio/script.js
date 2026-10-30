/**
 * OASIS INFOBYTE INTERNSHIP — TASK 2: PERSONAL PORTFOLIO
 * Developer: Shridhar Kusugal
 * Purpose: Lightweight client-side interactions for navigation, scroll monitoring, and back-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const themeToggle = document.getElementById('themeToggle');

  // 0. Light / Dark Mode Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('portfolio-theme', targetTheme);
    });
  }

  // 1. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Scroll Events: Navbar Styling, Scrollspy & Back-To-Top
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar elevation on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scrollspy for active navigation link
    const scrollPosition = scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run on load

  // 3. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Hero Portrait Interactive 3D Perspective Tilt (Desktop)
  // --------------------------------------------------------------------------
  const heroVisual = document.getElementById('heroPhotoVisual');
  const portraitCard = document.getElementById('heroPortraitCard');

  if (heroVisual && portraitCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let bounds = heroVisual.getBoundingClientRect();
    let isHovering = false;

    const onMouseEnter = () => {
      bounds = heroVisual.getBoundingClientRect();
      isHovering = true;
    };

    const onMouseMove = (e) => {
      if (!isHovering) return;
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Subtle natural 3D tilt: max 5.5 degrees
      const tiltX = -((y - centerY) / centerY) * 5.5;
      const tiltY = ((x - centerX) / centerX) * 5.5;

      portraitCard.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
    };

    const onMouseLeave = () => {
      isHovering = false;
      portraitCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    heroVisual.addEventListener('mouseenter', onMouseEnter);
    heroVisual.addEventListener('mousemove', onMouseMove);
    heroVisual.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', () => {
      bounds = heroVisual.getBoundingClientRect();
    });
  }
});
