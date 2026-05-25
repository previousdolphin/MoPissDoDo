document.addEventListener('DOMContentLoaded', () => {
    // 1. SYSTEM INITIALIZATION & AUDIO INJECTION
    const initBtn = document.getElementById('init-btn');
    const initOverlay = document.getElementById('init-overlay');
    const wrapper = document.getElementById('main-wrapper');
    const audioContainer = document.getElementById('audio-container');

    // The requested YouTube Audio URL
    // Using embed format with autoplay and loop parameters
    const ytEmbedUrl = "https://www.youtube.com/embed/un3NkWnHl9Q?autoplay=1&loop=1&playlist=un3NkWnHl9Q&controls=0&showinfo=0&autohide=1";

    initBtn.addEventListener('click', () => {
        // Hide overlay
        initOverlay.classList.add('hidden');
        
        // Inject the iframe to start audio
        // This bypasses browser autoplay restrictions because it originates from a user click event
        audioContainer.innerHTML = `<iframe width="0" height="0" src="${ytEmbedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        
        // Reveal main content
        wrapper.classList.add('active');

        // Trigger GSAP animations now that content is visible
        initGSAP();
    });

    // 2. GSAP SCROLL ANIMATIONS
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Simple stagger reveal for manifesto text
        const revealElements = document.querySelectorAll('.gs-reveal');
        
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { 
                    y: 50, 
                    opacity: 0 
                },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Quote section word-by-word subtle reveal effect
        // We wrap the quote in GSAP animation based on scroll position
        const quoteSection = document.querySelector('.quote-section');
        const quoteText = document.querySelector('.quote-text');
        
        gsap.fromTo(quoteText,
            { opacity: 0.2, scale: 0.95 },
            { 
                opacity: 1, 
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: quoteSection,
                    start: "top 60%",
                    end: "center center",
                    scrub: 1
                }
            }
        );
    }
});