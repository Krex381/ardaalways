document.addEventListener('DOMContentLoaded', function() {

    const loader = document.getElementById('loading');

    if (!loader) {
        const newLoader = document.createElement('div');
        newLoader.id = 'loading';
        newLoader.className = 'fixed inset-0 bg-black z-50 flex items-center justify-center';
        document.body.appendChild(newLoader);
    }

    const loaderElement = document.getElementById('loading');
    
    window.addEventListener('load', () => {
        if (loaderElement) {
            loaderElement.style.opacity = '0';
            setTimeout(() => {
                loaderElement.style.display = 'none';
            }, 500);
        }
    });

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4f4f4f'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.7,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#363636',
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    const langToggle = document.getElementById('langToggle');
    const langIndicator = langToggle.querySelector('.lang-indicator');
    let currentLang = localStorage.getItem('preferredLanguage') || 'tr';
    let isTransitioning = false;
    
    async function toggleLanguage() {
        if (isTransitioning) return;
        isTransitioning = true;

        langToggle.classList.add('transitioning');

        const elements = document.querySelectorAll('[data-tr], [data-en]');
        await Promise.all(
            Array.from(elements).map(element => {
                return new Promise(resolve => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(-5px)';
                    setTimeout(resolve, 200);
                });
            })
        );

        currentLang = currentLang === 'en' ? 'tr' : 'en';
        langIndicator.textContent = currentLang.toUpperCase();
        
        // Update content
        elements.forEach(element => {
            const newText = element.getAttribute(`data-${currentLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });

        document.querySelectorAll('.social-icon').forEach(icon => {
            const newLabel = icon.getAttribute(`data-label-${currentLang}`);
            if (newLabel) {
                icon.setAttribute('data-label', newLabel);
            }
        });

        setTimeout(() => {
            elements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, 50);

        try {
            localStorage.setItem('preferredLanguage', currentLang);
        } catch (error) {
            console.warn('Could not save language preference:', error);
        }

        setTimeout(() => {
            langToggle.classList.remove('transitioning');
            isTransitioning = false;
        }, 500);
    }

    let timeout;
    langToggle.addEventListener('click', () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(toggleLanguage, 200);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Add transition styles
        const style = document.createElement('style');
        style.textContent = `
            [data-tr], [data-en] {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .transitioning {
                pointer-events: none;
                opacity: 0.7;
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);

        toggleLanguage();
    });

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        reset: true,
        viewFactor: 0.2
    });

    sr.reveal('.profile-picture', { delay: 200 });
    sr.reveal('.name-text', { delay: 300 });
    sr.reveal('.social-links', { delay: 400 });
    sr.reveal('.spotify-stats', { delay: 600 });

    const glassCard = document.querySelector('.glass-card');
    glassCard.style.transition = 'all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    
    glassCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = glassCard.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * 20;
        
        glassCard.style.transform = `
            perspective(2000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
        
        glassCard.style.boxShadow = `
            ${rotateY * 2}px ${rotateX * 2}px 30px rgba(255,255,255,0.1),
            0 8px 32px rgba(31, 38, 135, 0.37)
        `;
    });

    glassCard.addEventListener('mouseleave', () => {
        glassCard.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale(1)';
        glassCard.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
    });

    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});