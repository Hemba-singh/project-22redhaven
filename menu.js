try {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: true,
        multiplier: 1
    });

    // Log successful initialization
    console.log('Locomotive Scroll initialized successfully');
} catch (error) {
    console.error('Failed to initialize Locomotive Scroll:', error);
}

// Add event listeners for cart buttons
document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', () => {
        Swal.fire({
            title: 'Added to cart!',
            text: 'Item has been added to your cart',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        });
    });
});

// Handle anchor link clicks with Locomotive Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Ignore empty hash links
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            scroll.scrollTo(targetElement);
        }
    });
});

// Update Locomotive Scroll on page load and after any dynamic content changes
window.addEventListener('load', () => {
    scroll.update();
});
