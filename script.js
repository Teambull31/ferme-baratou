/* =========================================
   LA FERME DE BARATOU — Script
   ========================================= */

(function () {
    'use strict';

    /* ── Navbar scroll effect ──────────────── */
    const navbar = document.getElementById('navbar');
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Mobile menu ───────────────────────── */
    const toggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('navMobile');
    const mobileLinks = mobileNav.querySelectorAll('.nav-mobile-link');

    function closeMenu() {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    /* ── Scroll reveal ( Intersection Observer ) ── */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));

    /* ── Smooth active nav highlighting ───── */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navAnchors.forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.4 }
    );
    sections.forEach(s => sectionObserver.observe(s));

    /* ── Contact form (demo) ─────────────── */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!firstName || !email || !message) {
                submitText.textContent = '⚠️ Veuillez remplir tous les champs requis.';
                submitBtn.style.background = '#A8621A';
                setTimeout(() => {
                    submitText.textContent = 'Envoyer ma demande 🚀';
                    submitBtn.style.background = '';
                }, 3000);
                return;
            }

            // Simulate sending
            submitBtn.disabled = true;
            submitText.textContent = '⏳ Envoi en cours…';

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitText.textContent = 'Envoyer ma demande 🚀';
                formSuccess.style.display = 'block';
                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
            }, 1800);
        });
    }

    /* ── Stats counter animation ─────────── */
    const statsSection = document.querySelector('.hero-stats');
    let counted = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                animateStats();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        // Simple pulse animation on stat numbers
        document.querySelectorAll('.stat-number').forEach((el) => {
            el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            el.style.transform = 'scale(0.8)';
            el.style.opacity = '0.6';
            setTimeout(() => {
                el.style.transform = 'scale(1.1)';
                el.style.opacity = '1';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 200);
            }, 100);
        });
    }

    /* ── Parallax on hero (subtle) ────────── */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }, { passive: true });
    }

    /* ── Keyboard nav: close menu on Escape ── */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

})();
