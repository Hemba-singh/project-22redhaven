// Utility functions
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);


document.documentElement.classList.add('js-enabled');

// Initialize ScrollTrigger
function initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', () => {
    initLocomotive();
    initScrollTrigger();
});


// Initialize Locomotive Scroll
let locoScroll = null;

function initLocomotive() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        multiplier: 0.5,
        class: 'is-revealed',
        reloadOnContextChange: true,
        touchMultiplier: 2,
        smoothMobile: true,
        smartphone: {
            smooth: true,
            breakpoint: 767
        },
        tablet: {
            smooth: true,
            breakpoint: 1024
        }
    });

    window.addEventListener('load', () => {
    locoScroll.update();
});

locoScroll.on('resize', () => {
    ScrollTrigger.refresh();
});

}

document.addEventListener('DOMContentLoaded', () => {
    initLocomotive();
});


// Initialize animations
function initAnimations() {
    // Hero section animations
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
    });

    // Menu items stagger animation
    gsap.from('.second-hero', {
        scrollTrigger: {
            trigger: '.second-home',
            scroller: '[data-scroll-container]',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // About section parallax
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-section',
            scroller: '[data-scroll-container]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        opacity: 0,
        duration: 1
    });

    // Contact section animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            scroller: '[data-scroll-container]',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05,
        multiplier: 0.5
    });

    // Hide loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }

    // Update scroll on page load
    window.addEventListener('load', () => {
        scroll.update();
    });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            scroll.update();
        }, 250);
    });

    // Hero Animation
    gsap.from('.hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
    });


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            locoScroll.scrollTo(targetElement);
        }
    });
});


// Enhanced Contact Form Handling with improved validation
const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showError = (message) => {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#971108'
        });
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value.trim(),
            email: contactForm.querySelector('input[type="email"]').value.trim(),
            message: contactForm.querySelector('textarea').value.trim()
        };

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showError('Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            showError('Please enter a valid email address');
            return;
        }

        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            await fetch('https://script.google.com/macros/s/AKfycbzPh11MsTW3zaE8T1V1Kq8-JvmtRhAS3E_VyvbiwxTr2LeCCTUuVjaHVMsG0IsAiaW4/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            });

            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon!',
                icon: 'success',
                confirmButtonColor: '#971108'
            });

            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showError('Something went wrong. Please try again later.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
};

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Simple order function
function orderItem(itemName, price) {
    alert(`You have ordered: ${itemName} for Rs.${price}`);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initMenuFiltering();
    initContactForm();
});
});


/*
// Get the modal container and the button
const modalContainer = document.querySelector('.modal-container');
const bookTableButton = document.querySelector('.button');

// Get the close modal button
const closeModalButton = document.querySelector('.close-modal');

// Function to open the modal
function openModal() {
  modalContainer.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modalContainer.style.display = 'none';
}

// Add event listener to the book table button
bookTableButton.addEventListener('click', openModal);

// Add event listener to the close modal button
closeModalButton.addEventListener('click', closeModal);

// Add event listener to the modal container to close the modal when clicked outside
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    closeModal();
  }
});

*/