(function() {
    'use strict';

    // =============================================
    // 1. LOADING SCREEN
    // =============================================
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
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.add('visible');
                setTimeout(initReveal, 300);
            }, 300);
        }
        progressBar.style.width = progress + '%';
        percentText.textContent = progress;
    }, 180);

    // =============================================
    // 2. NAVBAR SCROLL
    // =============================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =============================================
    // 3. MOBILE NAV TOGGLE
    // =============================================
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.querySelector('i').className = menu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // =============================================
    // 4. SCROLL REVEAL (Intersection Observer)
    // =============================================
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(el => observer.observe(el));
    }

    console.log('🏀 SMAN 1 Rogojampi · Home siap!');
})();
