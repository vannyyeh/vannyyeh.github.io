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

    // Dynamic hero intro text rotation with slide effect and typing animation
    const heroIntroText = document.querySelector('.hero-intro-text');
    if (heroIntroText) {
        const messages = [
            "designer, shaping ideas into user centered digital experiences.",
            "developer, turning design intent into scalable systems.",
            "designer, imagining how products should feel and function.",
            "developer, building the structure that makes them work."
        ];
        
        let currentIndex = 0;
        let typingInterval = null;
        
        function typeMessage(message, callback) {
            let index = 0;
            heroIntroText.innerHTML = '';
            
            // Find positions of "designer" and "developer" in the message
            const highlightWords = ['designer', 'developer'];
            const highlightRanges = [];
            
            highlightWords.forEach(word => {
                const regex = new RegExp(word, 'gi');
                let match;
                while ((match = regex.exec(message)) !== null) {
                    highlightRanges.push({
                        start: match.index,
                        end: match.index + word.length,
                        word: match[0]
                    });
                }
            });
            
            // Sort ranges by start position
            highlightRanges.sort((a, b) => a.start - b.start);
            
            function type() {
                if (index < message.length) {
                    let resultHTML = '';
                    let currentPos = 0;
                    
                    // Build HTML with highlights
                    for (let range of highlightRanges) {
                        // Add text before highlight (typed character by character)
                        if (currentPos < range.start) {
                            const endPos = Math.min(range.start, index);
                            if (endPos > currentPos) {
                                resultHTML += message.substring(currentPos, endPos);
                            }
                            currentPos = endPos;
                        }
                        
                        // Handle highlighted word (fade in as complete word, not character by character)
                        if (index >= range.end) {
                            // Word is complete, add it with fade-in class
                            resultHTML += '<span class="highlight-word fade-in">' + range.word + '</span>';
                            currentPos = range.end;
                        } else if (index > range.start && index < range.end) {
                            // We're in the middle of the word - skip it in display but continue typing
                            // The word will appear when index reaches range.end
                            currentPos = range.start;
                        }
                    }
                    
                    // Add remaining text after highlights (typed character by character)
                    // Only add if we're past all highlight ranges or between them
                    let skipHighlight = false;
                    for (let range of highlightRanges) {
                        if (index > range.start && index < range.end) {
                            skipHighlight = true;
                            break;
                        }
                    }
                    
                    if (!skipHighlight && currentPos < index) {
                        resultHTML += message.substring(currentPos, index);
                    }
                    
                    heroIntroText.innerHTML = resultHTML;
                    index++;
                    typingInterval = setTimeout(type, 30); // Typing speed: 30ms per character
                } else {
                    // Final message with all highlights faded in
                    let finalHTML = message;
                    highlightWords.forEach(word => {
                        const regex = new RegExp(`(${word})`, 'gi');
                        finalHTML = finalHTML.replace(regex, '<span class="highlight-word fade-in">$1</span>');
                    });
                    heroIntroText.innerHTML = finalHTML;
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
            let message = messages[currentIndex];
            
            // Clear content and start typing effect
            heroIntroText.innerHTML = '';
            typeMessage(message);
        }
        
        // Start rotation after initial load
        setInterval(rotateMessage, 2500);
    }
});
