// Typing animation for subtitle
const roles = [
    "AI Engineer",
    "Cyber Security Researcher", 
    "Full Stack Developer",
    "CTF Player",
    "Pentester",
    "UI/UX Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeRole() {
    const typingText = document.querySelector('.typing-text');
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, pauseDuration);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
    } else {
        setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Terminal command animation
const commands = [
    { cmd: "whoami", output: "kafy - Cyber Security Researcher & AI Engineer" },
    { cmd: "ls skills/", output: "security/  ai/  frontend/  backend/  design/" },
    { cmd: "cat passion.txt", output: "Breaking systems to make them stronger\nBuilding AI to solve real problems\nCreating beautiful & functional interfaces" }
];

let cmdIndex = 0;
let cmdCharIndex = 0;
let isTypingCmd = true;

function typeCommand() {
    const typedCommand = document.getElementById('typed-command');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (cmdIndex >= commands.length) {
        cmdIndex = 0;
        terminalOutput.innerHTML = '';
    }
    
    const currentCommand = commands[cmdIndex];
    
    if (isTypingCmd) {
        typedCommand.textContent = currentCommand.cmd.substring(0, cmdCharIndex);
        cmdCharIndex++;
        
        if (cmdCharIndex > currentCommand.cmd.length) {
            isTypingCmd = false;
            setTimeout(() => {
                terminalOutput.innerHTML += `<div style="margin-bottom: 10px; color: #a0a0a0;">${currentCommand.output}</div>`;
                cmdCharIndex = 0;
                cmdIndex++;
                isTypingCmd = true;
                setTimeout(typeCommand, 2000);
            }, 500);
        } else {
            setTimeout(typeCommand, 100);
        }
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 1000);
    setTimeout(typeCommand, 2000);
});

// Add responsive mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            left: 0;
            top: 60px;
            flex-direction: column;
            background-color: rgba(10, 10, 10, 0.98);
            width: 100%;
            text-align: center;
            padding: 2rem 0;
            border-bottom: 1px solid var(--border-color);
            animation: slideDown 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(mobileStyles);