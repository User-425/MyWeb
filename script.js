document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('[data-lucide]');
    const isOpen = !mobileMenu.classList.contains('hidden');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-lucide]');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

const typedTextElement = document.getElementById('typed-text');
const textArray = [
    'Informatics Engineering Student',
    'Full-Stack Developer',
    'Typical Programmer',
    'Psst, do u ever heard about Konami Code?'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 75;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1000);

const skillItems = document.querySelectorAll('.skill-item');

function animateSkillBars() {
    skillItems.forEach((item, index) => {
        const skillLevel = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        const percentageElement = item.querySelector('.skill-percentage');
        
        setTimeout(() => {
            item.classList.add('animate');
            progressBar.style.setProperty('--skill-width', `${skillLevel}%`);
            
            let currentPercentage = 0;
            const increment = skillLevel / 50;
            const percentageInterval = setInterval(() => {
                currentPercentage += increment;
                if (currentPercentage >= skillLevel) {
                    currentPercentage = skillLevel;
                    clearInterval(percentageInterval);
                }
                percentageElement.textContent = `${Math.round(currentPercentage)}%`;
            }, 30);
        }, index * 200);
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
            
            if (entry.target.classList.contains('stagger-animation')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .fade-in-section, .stagger-animation').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('button, .btn, a[class*="bg-gradient"]').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.setProperty('--mouse-x', `${x * 0.1}px`);
        button.style.setProperty('--mouse-y', `${y * 0.1}px`);
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.setProperty('--mouse-x', '0px');
        button.style.setProperty('--mouse-y', '0px');
    });
});

document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = `
        <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = `
            <i data-lucide="check" class="inline w-4 h-4 mr-2"></i>
            Message Sent!
        `;
        submitButton.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
        submitButton.classList.add('bg-green-600');
        
        lucide.createIcons();
        
        e.target.reset();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('bg-green-600');
            submitButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
            lucide.createIcons();
        }, 3000);
    }, 2000);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('home');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    if (heroSection) {
        const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
        heroSection.style.opacity = opacity;
    }
});

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02) translateY(-5px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.boxShadow = 'none';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('[data-lucide]');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.querySelectorAll('.fade-in-section').forEach(section => {
            section.classList.add('is-visible');
        });
    }, 100);
});

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
        }
    });
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['measure'] });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

function trackEvent(action, category, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectName = e.target.closest('.project-card').querySelector('h3').textContent;
        const linkType = e.target.textContent.includes('Demo') ? 'Demo' : 'Code';
        trackEvent('click', 'Project', `${projectName} - ${linkType}`);
    });
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        document.body.style.animation = 'rainbow-background 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        const message = document.createElement('div');
        message.innerHTML = 'Uh.. Congrats ig? 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #4ecdc4, #45b7d1);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 10000;
            animation: bounce 0.5s ease-in-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow-background {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-30px);
        }
        60% {
            transform: translate(-50%, -50%) translateY(-15px);
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio loaded successfully! 🚀');
