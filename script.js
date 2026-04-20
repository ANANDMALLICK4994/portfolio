// --- Sticky Navbar & Scroll Effects ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // trigger point

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load in case elements are already in view
revealOnScroll();

// --- Dynamic Typing Effect ---
const typingTextElement = document.querySelector('.typing-text');
const titles = [
    "Web Developer",
    "UI/UX Enthusiast",
    "IoT Enthusiast",
    "PCB Designer",
    "AI Enthusiast"

];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000; // wait before deleting

function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        // Erase characters
        typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type characters
        typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine the typing speed
    let currentSpeed = isDeleting ? erasingDelay : typingDelay;

    // Word is complete
    if (!isDeleting && charIndex === currentTitle.length) {
        currentSpeed = newTextDelay; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex++;
        // Loop back to the first title
        if (titleIndex >= titles.length) {
            titleIndex = 0;
        }
    }

    setTimeout(type, currentSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if (titles.length) setTimeout(type, 1000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});