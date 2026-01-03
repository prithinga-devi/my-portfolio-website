// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Typing Animation Logic
const typingTarget = document.getElementById('typing-text');
const roles = ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        typingTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Wait at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Sidebar Active State Sync
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Start Typing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
    initTheme();
    initProjectInteractivity();
});

// Creative Project Card Interactivity (Spotlight & 3D Tilt)
function initProjectInteractivity() {
    const cards = document.querySelectorAll('.project-card-atlas, .hero-glass-card, .education-image-wrapper');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return; // Disable heavy effects for touch devices

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update Spotlight Position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D Tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10; // Adjust for intensity
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });

        // Parallax Effect for Tech Badges
        const badges = card.querySelectorAll('.badge');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
            const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

            badges.forEach((badge, index) => {
                const depth = (index + 1) * 20;
                const moveX = xPercent * depth;
                const moveY = yPercent * depth;
                badge.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            badges.forEach(badge => {
                badge.style.transform = `translate(0, 0) scale(1)`;
            });
        });
    });
}

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.setAttribute('name', 'sunny-outline');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

    // Update Icon
    themeIcon.setAttribute('name', isLight ? 'sunny-outline' : 'moon-outline');
});
