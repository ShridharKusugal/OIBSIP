/**
 * A Tribute to Dr. A. P. J. Abdul Kalam — Interactive Script
 * Author: Shridhar Kusugal
 * Internship: Oasis Infobyte (OIBSIP) — Level 2, Task 2
 * Standard: Clean Vanilla JavaScript (ES6+), Zero External Libraries, Zero eval()
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DOM ELEMENT REFERENCES
  // =========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress');
  const siteHeader        = document.getElementById('header');
  const mobileMenuBtn     = document.getElementById('mobile-menu-btn');
  const navMenu           = document.getElementById('nav-menu');
  const navLinks          = document.querySelectorAll('.nav-link');
  const backToTopBtn      = document.getElementById('back-to-top');

  // Quotes Carousel Elements
  const quoteCategoryEl   = document.getElementById('quote-category');
  const quoteTextEl       = document.getElementById('quote-text');
  const quoteAuthorEl     = document.getElementById('quote-author');
  const quoteSourceEl     = document.getElementById('quote-source');
  const quoteIndicatorsEl = document.getElementById('quote-indicators');
  const prevQuoteBtn      = document.getElementById('prev-quote-btn');
  const nextQuoteBtn      = document.getElementById('next-quote-btn');
  const copyQuoteBtn      = document.getElementById('copy-quote-btn');

  // Achievements Filter Elements
  const filterBtns        = document.querySelectorAll('.filter-btn');
  const achievementCards  = document.querySelectorAll('.achievement-card');

  // Pledge Elements
  const pledgeForm        = document.getElementById('pledge-form');
  const pledgeCheckboxes  = document.querySelectorAll('.pledge-checkbox');
  const pledgeCountEl     = document.getElementById('pledge-count');
  const pledgeMeterBar    = document.getElementById('pledge-meter-bar');
  const acceptAllBtn      = document.getElementById('accept-all-pledges-btn');
  const resetPledgesBtn   = document.getElementById('reset-pledges-btn');
  const pledgeCongratsEl  = document.getElementById('pledge-congrats');

  // =========================================================================
  // 2. READING PROGRESS BAR & STICKY HEADER SCROLL STATE
  // =========================================================================
  const handleScrollUpdates = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Update Progress Bar
    if (documentHeight > 0 && scrollProgressBar) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollY / documentHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercent}%`;
      scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent).toString());
    }

    // Toggle Header Scrolled Class
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Toggle Back-To-Top Button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollUpdates, { passive: true });
  handleScrollUpdates(); // Initial execution

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 3. RESPONSIVE MOBILE NAVIGATION
  // =========================================================================
  const toggleMobileMenu = (forceClose = false) => {
    if (!mobileMenuBtn || !navMenu) return;

    const isOpen = forceClose ? false : !navMenu.classList.contains('open');

    if (isOpen) {
      navMenu.classList.add('open');
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  // Close menu on clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Close menu on clicking outside
  document.addEventListener('click', (event) => {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        toggleMobileMenu(true);
      }
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });

  // =========================================================================
  // 4. SCROLLSPY / ACTIVE NAVIGATION LINK OBSERVER
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // =========================================================================
  // 5. INSPIRATIONAL QUOTES DATA & INTERACTIVE EXPLORER
  // =========================================================================
  const quotesData = [
    {
      text: "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
      category: "On Ambition & Vision",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "From Wings of Fire: An Autobiography"
    },
    {
      text: "If you want to shine like a sun, first burn like a sun.",
      category: "On Hard Work & Dedication",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "From Ignited Minds: Unleashing the Power Within India"
    },
    {
      text: "You have to dream before your dreams can come true.",
      category: "On Vision & Youth",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "Address to High School Students, 2003"
    },
    {
      text: "Failure will never overtake me if my determination to succeed is strong enough.",
      category: "On Resilience & Grit",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "From My Journey: Transforming Dreams into Actions"
    },
    {
      text: "Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.",
      category: "On Faith & Optimism",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "From Wings of Fire"
    },
    {
      text: "To succeed in your mission, you must have single-minded devotion to your goal.",
      category: "On Focus & Discipline",
      author: "Dr. A. P. J. Abdul Kalam",
      source: "Convocation Address, IIT Madras"
    }
  ];

  let currentQuoteIndex = 0;

  // Render Indicator Dots
  if (quoteIndicatorsEl) {
    quoteIndicatorsEl.innerHTML = '';
    quotesData.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('quote-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to quote ${idx + 1}`);
      dot.addEventListener('click', () => {
        showQuote(idx);
      });
      quoteIndicatorsEl.appendChild(dot);
    });
  }

  const showQuote = (index) => {
    if (index < 0) index = quotesData.length - 1;
    if (index >= quotesData.length) index = 0;
    currentQuoteIndex = index;

    const data = quotesData[currentQuoteIndex];

    if (quoteTextEl) {
      quoteTextEl.style.opacity = '0';
      setTimeout(() => {
        quoteTextEl.textContent = `"${data.text}"`;
        quoteCategoryEl.textContent = data.category;
        quoteAuthorEl.textContent = data.author;
        quoteSourceEl.textContent = data.source;
        quoteTextEl.style.opacity = '1';
      }, 150);
    }

    // Update Dots
    const dots = quoteIndicatorsEl ? quoteIndicatorsEl.querySelectorAll('.quote-dot') : [];
    dots.forEach((dot, idx) => {
      if (idx === currentQuoteIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  };

  if (prevQuoteBtn) {
    prevQuoteBtn.addEventListener('click', () => {
      showQuote(currentQuoteIndex - 1);
    });
  }

  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', () => {
      showQuote(currentQuoteIndex + 1);
    });
  }

  // Copy Quote Functionality
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', async () => {
      const data = quotesData[currentQuoteIndex];
      const textToCopy = `"${data.text}" — ${data.author} (${data.source})`;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const copyTextSpan = copyQuoteBtn.querySelector('.copy-text');
        if (copyTextSpan) {
          const originalText = copyTextSpan.textContent;
          copyTextSpan.textContent = 'Copied to Clipboard!';
          copyQuoteBtn.style.color = '#10b981';
          copyQuoteBtn.style.borderColor = '#10b981';

          setTimeout(() => {
            copyTextSpan.textContent = originalText;
            copyQuoteBtn.style.color = '';
            copyQuoteBtn.style.borderColor = '';
          }, 2200);
        }
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
      }
    });
  }

  // Keyboard navigation for quotes
  const quotesSection = document.getElementById('quotes');
  if (quotesSection) {
    quotesSection.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        showQuote(currentQuoteIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showQuote(currentQuoteIndex + 1);
      }
    });
  }

  // =========================================================================
  // 6. ACHIEVEMENTS CATEGORY FILTERING
  // =========================================================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      achievementCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 7. INTERACTIVE YOUTH PLEDGE TRACKER
  // =========================================================================
  const updatePledgeStatus = () => {
    let acceptedCount = 0;
    pledgeCheckboxes.forEach(cb => {
      if (cb.checked) acceptedCount++;
    });

    if (pledgeCountEl) {
      pledgeCountEl.textContent = acceptedCount.toString();
    }

    if (pledgeMeterBar) {
      const percentage = (acceptedCount / pledgeCheckboxes.length) * 100;
      pledgeMeterBar.style.width = `${percentage}%`;
    }

    if (pledgeCongratsEl) {
      if (acceptedCount === pledgeCheckboxes.length) {
        pledgeCongratsEl.classList.remove('hidden');
      } else {
        pledgeCongratsEl.classList.add('hidden');
      }
    }
  };

  pledgeCheckboxes.forEach(cb => {
    cb.addEventListener('change', updatePledgeStatus);
  });

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      pledgeCheckboxes.forEach(cb => {
        cb.checked = true;
      });
      updatePledgeStatus();
    });
  }

  if (resetPledgesBtn) {
    resetPledgesBtn.addEventListener('click', () => {
      pledgeCheckboxes.forEach(cb => {
        cb.checked = false;
      });
      updatePledgeStatus();
    });
  }

  // =========================================================================
  // 8. CONSOLE WELCOME & ATTRIBUTION
  // =========================================================================
  console.log(
    '%c A Tribute to Dr. A. P. J. Abdul Kalam %c\n' +
    'Designed & Developed by Shridhar Kusugal for Oasis Infobyte (OIBSIP) Level 2, Task 2.\n' +
    '“Dream is not that which you see while sleeping, it is something that does not let you sleep.”',
    'background: #0a192f; color: #f59e0b; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 4px;',
    'color: #64748b; font-size: 11px;'
  );

});
