// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact link hover effects
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const projectImage = this.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1.02)';
                projectImage.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const projectImage = this.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }
        });
    });

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.project-card, .contact-column, .skills-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero intro text rotation with sliding text effect (like lunawangzhiyue.com)
    const heroIntroRole = document.querySelector('.hero-intro-role');
    const heroIntroRest = document.querySelector('.hero-intro-rest');
    
    if (heroIntroRole && heroIntroRest) {
        const messages = [
            {
                role: "designer",
                rest: ", shaping ideas into user centered experiences."
            },
            {
                role: "developer",
                rest: ", turning design intent into scalable systems."
            },
            {
                role: "designer",
                rest: ", imagining how products should feel and function."
            },
            {
                role: "developer",
                rest: ", building the structure that makes them work."
            }
        ];
        
        let currentIndex = 0;
        let typingInterval = null;
        
        function typeText(text, element, callback) {
            let index = 0;
            element.textContent = '';
            
            function type() {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                    typingInterval = setTimeout(type, 30); // Typing speed: 30ms per character
                } else {
                    if (callback) callback();
                }
            }
            
            type();
        }
        
        function rotateMessage() {
            // Clear any existing typing interval
            if (typingInterval) {
                clearTimeout(typingInterval);
                typingInterval = null;
            }
            
            // Get next message
            currentIndex = (currentIndex + 1) % messages.length;
            const message = messages[currentIndex];
            
            // Get current role text element
            const currentRoleText = heroIntroRole.querySelector('.hero-intro-role-text');
            
            if (currentRoleText) {
                // Slide current text down
                currentRoleText.classList.add('slide-down');
                
                setTimeout(() => {
                    // Create new text element sliding from top
                    const newRoleText = document.createElement('span');
                    newRoleText.className = 'hero-intro-role-text slide-up';
                    newRoleText.textContent = message.role;
                    heroIntroRole.innerHTML = '';
                    heroIntroRole.appendChild(newRoleText);
                    
                    // Force reflow
                    void heroIntroRole.offsetWidth;
                    
                    // Slide new text to position
                    setTimeout(() => {
                        newRoleText.classList.remove('slide-up');
                    }, 10);
                    
                    // Clear and start typing the rest
                    heroIntroRest.textContent = '';
                    typeText(message.rest, heroIntroRest);
                }, 500); // Wait for slide-up to complete
            } else {
                // First time - just set the text
                const roleText = document.createElement('span');
                roleText.className = 'hero-intro-role-text';
                roleText.textContent = message.role;
                heroIntroRole.innerHTML = '';
                heroIntroRole.appendChild(roleText);
                
                // Clear and start typing the rest
                heroIntroRest.textContent = '';
                typeText(message.rest, heroIntroRest);
            }
        }
        
        // Initialize first message
        if (heroIntroRole && !heroIntroRole.querySelector('.hero-intro-role-text')) {
            const roleText = document.createElement('span');
            roleText.className = 'hero-intro-role-text';
            roleText.textContent = messages[0].role;
            heroIntroRole.innerHTML = '';
            heroIntroRole.appendChild(roleText);
            
            // Start typing the first rest text
            heroIntroRest.textContent = '';
            typeText(messages[0].rest, heroIntroRest);
        }
        
        // Start rotation after initial load
        setInterval(rotateMessage, 3500);
    }
});
