(function() {
    'use strict';

    // ==============================================================
    // 1. LOADING SCREEN
    // ==============================================================
    const loader = document.getElementById('global-loader');
    const progressBar = document.getElementById('loaderProgressBar');
    const percentText = document.getElementById('loaderPercent');
    const mainContent = document.getElementById('main-content');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Selesai loading
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.add('visible');
                // Trigger scroll reveal setelah konten muncul
                setTimeout(initReveal, 400);
            }, 400);
        }
        progressBar.style.width = progress + '%';
        percentText.textContent = progress;
    }, 200);

    // ==============================================================
    // 2. NAVBAR SCROLL EFFECT
    // ==============================================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ==============================================================
    // 3. MOBILE NAV TOGGLE
    // ==============================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Tutup nav saat klik link di mobile
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // ==============================================================
    // 4. SCROLL REVEAL (Intersection Observer)
    // ==============================================================
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Bisa di-unobserve setelah aktif untuk performa
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // Jika mainContent sudah terlihat, panggil initReveal langsung
    // (tapi sudah dipanggil setelah loading selesai)

    // ==============================================================
    // 5. SMOOTH SCROLL UNTUK ANCHOR (opsional)
    // ==============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==============================================================
    // 6. PARALLAX HERO (efek gerakan mouse ringan)
    // ==============================================================
    const hero = document.getElementById('hero');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            const bg = hero.querySelector('.hero-bg');
            if (bg) {
                bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            }
        });
    }

    // ==============================================================
    // 7. COUNTER ANIMATION (Statistik Hero)
    // ==============================================================
    // (opsional, jika ingin animasi angka, tapi dibiarkan statis untuk kesederhanaan)

    console.log('🏀 Basket SMAN 1 Rogojampi · Home siap!');
})();