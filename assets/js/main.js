/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const heroTitle = document.querySelector('.hero-copy h1');
  if (heroTitle) {
    const heroCopy = heroTitle.closest('.hero-copy');
    heroTitle.setAttribute('aria-label', heroTitle.innerText.replace(/\s+/g, ' ').trim());
    const heroLines = heroTitle.querySelectorAll('.hero-title-line');
    const lineDelay = 0.2;
    const lineDuration = 0.7;
    heroLines.forEach((line, index) => {
      line.style.setProperty('--line-delay', `${index * lineDelay}s`);
    });
    heroCopy.style.setProperty('--hero-support-delay', `${Math.max(0, heroLines.length - 1) * lineDelay + lineDuration}s`);

    const playHeroTitle = () => {
      heroTitle.classList.remove('hero-title-animate');
      heroCopy.classList.remove('hero-copy-animate-support');
      void heroTitle.offsetWidth;
      heroTitle.classList.add('hero-title-animate');
      heroCopy.classList.add('hero-copy-animate-support');
    };

    if (document.visibilityState === 'visible') {
      playHeroTitle();
    } else {
      const onHeroVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          playHeroTitle();
          document.removeEventListener('visibilitychange', onHeroVisibilityChange);
        }
      };
      document.addEventListener('visibilitychange', onHeroVisibilityChange);
    }

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) playHeroTitle();
    });
  }

  const overviewTrigger = document.querySelector('[data-overview-trigger]');
  const overviewDialog = document.querySelector('#overview-dialog');
  const overviewTitle = document.querySelector('[data-overview-title]');
  const overviewCopy = document.querySelector('[data-overview-copy]');
  const overviewSceneCount = document.querySelector('[data-overview-scene-count]');
  const overviewToggle = document.querySelector('[data-overview-toggle]');
  const overviewProgress = document.querySelector('[data-overview-progress]');
  const overviewTime = document.querySelector('[data-overview-time]');

  if (overviewTrigger && overviewDialog && overviewTitle && overviewCopy && overviewSceneCount && overviewToggle && overviewProgress && overviewTime) {
    const closeOverview = overviewDialog.querySelector('.overview-dialog-close');
    const overviewScenes = [
      ['Build a stronger business.', 'Personalised guidance to help you move forward with clarity.'],
      ['Find the right path to growth.', 'Set practical priorities around your goals, customers and resources.'],
      ['Strengthen your operations.', 'Improve everyday processes, team productivity and decision-making.'],
      ['Reach more of the right customers.', 'Build a focused marketing and sales approach for sustainable growth.'],
      ['Make technology work for you.', 'Explore useful digital tools, AI and automation to work smarter.'],
      ['Turn plans into progress.', 'Get a clear roadmap, regular accountability and support as you scale.']
    ];
    const durationMs = 60000;
    let elapsedMs = 0;
    let startedAt = 0;
    let playbackInterval = null;
    let activeScene = -1;
    let isPlaying = false;

    if (closeOverview) {
      const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
      };

      const stopOverview = () => {
        if (playbackInterval !== null) window.clearInterval(playbackInterval);
        playbackInterval = null;
        if (isPlaying) elapsedMs = Math.min(durationMs, elapsedMs + performance.now() - startedAt);
        isPlaying = false;
        overviewToggle.setAttribute('aria-label', 'Play overview');
        overviewToggle.innerHTML = '<i class="bi bi-play-fill" aria-hidden="true"></i>';
      };

      const updateOverview = () => {
        const currentTime = Math.min(durationMs, elapsedMs + (isPlaying ? performance.now() - startedAt : 0));
        overviewProgress.value = String(currentTime / 1000);
        overviewTime.textContent = `${formatTime(currentTime)} / 1:00`;

        const sceneIndex = Math.min(overviewScenes.length - 1, Math.floor(currentTime / (durationMs / overviewScenes.length)));
        if (sceneIndex !== activeScene) {
          activeScene = sceneIndex;
          overviewTitle.textContent = overviewScenes[sceneIndex][0];
          overviewCopy.textContent = overviewScenes[sceneIndex][1];
          overviewSceneCount.textContent = `${String(sceneIndex + 1).padStart(2, '0')} / ${String(overviewScenes.length).padStart(2, '0')}`;
        }

        if (currentTime >= durationMs) {
          elapsedMs = durationMs;
          stopOverview();
          overviewProgress.value = '60';
          overviewTime.textContent = '1:00 / 1:00';
        }
      };

      const playOverview = () => {
        if (elapsedMs >= durationMs) elapsedMs = 0;
        isPlaying = true;
        startedAt = performance.now();
        overviewToggle.setAttribute('aria-label', 'Pause overview');
        overviewToggle.innerHTML = '<i class="bi bi-pause-fill" aria-hidden="true"></i>';
        playbackInterval = window.setInterval(updateOverview, 100);
        updateOverview();
      };

      overviewTrigger.addEventListener('click', (event) => {
        if (typeof overviewDialog.showModal !== 'function') return;
        event.preventDefault();
        elapsedMs = 0;
        activeScene = -1;
        updateOverview();
        overviewDialog.showModal();
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) playOverview();
      });

      closeOverview.addEventListener('click', () => overviewDialog.close());
      overviewDialog.addEventListener('click', (event) => {
        if (event.target === overviewDialog) overviewDialog.close();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overviewDialog.open) {
          event.preventDefault();
          overviewDialog.close();
        }
      }, true);
      overviewDialog.addEventListener('close', () => {
        stopOverview();
        elapsedMs = 0;
        activeScene = -1;
        updateOverview();
      });
      overviewToggle.addEventListener('click', () => {
        if (isPlaying) stopOverview();
        else playOverview();
        updateOverview();
      });
      overviewProgress.addEventListener('input', () => {
        elapsedMs = Number(overviewProgress.value) * 1000;
        if (isPlaying) startedAt = performance.now();
        updateOverview();
      });
    }
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  const sectionNavLinks = Array.from(document.querySelectorAll('#navmenu a[href^="#"]'));
  function updateActiveNav() {
    let activeLink = sectionNavLinks[0];
    const header = document.querySelector('#header');
    const headerOffset = (header ? header.offsetHeight : 0) + 100;

    sectionNavLinks.slice(1).forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.getBoundingClientRect().top <= headerOffset) activeLink = link;
    });

    sectionNavLinks.forEach((link) => link.classList.toggle('active', link === activeLink));
  }
  document.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('load', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  let isAtTop = null;

  function toggleScrollTop() {
    if (scrollTop) {
      const scrollY = window.scrollY;
      const atTop = isAtTop === null
        ? scrollY <= 100
        : isAtTop
          ? scrollY <= 120
          : scrollY <= 80;
      scrollTop.classList.add('active');
      if (atTop === isAtTop) return;
      isAtTop = atTop;
      const icon = scrollTop.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-arrow-down-short', atTop);
        icon.classList.toggle('bi-arrow-up-short', !atTop);
      }
      scrollTop.setAttribute('aria-label', atTop ? 'Scroll down to the next section' : 'Back to top');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAtTop) {
      document.querySelector('#challenges').scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  const challengeSection = document.querySelector('.challenge-section');
  if (challengeSection) {
    if ('IntersectionObserver' in window) {
      const challengeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          challengeSection.classList.toggle('challenge-cards-enter', entry.isIntersecting);
        });
      }, { threshold: 0.12 });
      challengeObserver.observe(challengeSection);
    } else {
      challengeSection.classList.add('challenge-cards-enter');
    }
  }

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

})();