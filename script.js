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
});

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
