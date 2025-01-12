let scroll = null;

try {
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: true,
        multiplier: 1,
    });

    console.log('Locomotive Scroll initialized successfully');
} catch (error) {
    console.error('Failed to initialize Locomotive Scroll:', error);
}

// Handle anchor link clicks with Locomotive Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement && scroll) {
            scroll.scrollTo(targetElement);
        }
    });
});

// Update Locomotive Scroll on page load
window.addEventListener('load', () => {
    if (scroll) {
        scroll.update();
    }
});

// Cart functionality
let cartItems = [];

// Add event listeners for cart buttons
document.querySelectorAll('.card-button').forEach((button) => {
    button.addEventListener('click', () => {
        const itemImage = button.getAttribute('data-image');
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        cartItems.push({ Image: itemImage, name: itemName, price: itemPrice });

        updateCartCount();
        updateCartDropdown();

        Swal.fire({
            title: 'Added to cart!',
            text: 'Item has been added to your cart',
            icon: 'success',
            confirmButtonText: 'Continue Shopping',
        });
    });
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Update cart dropdown
function updateCartDropdown() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.Image}" alt="${item.name}">
                <span>${item.name} --</span>
                <span class="price">${item.price}</span>
                <div class="quantity-controls">
                    <button class="decrease-btn">-</button>
                    <span class="quantity">1</span>
                    <button class="increase-btn">+</button>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);

            const decreaseBtn = itemElement.querySelector('.decrease-btn');
            const increaseBtn = itemElement.querySelector('.increase-btn');
            const quantityDisplay = itemElement.querySelector('.quantity');

            let quantity = 1;

            decreaseBtn.addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    quantityDisplay.textContent = quantity;
                    updateTotalAmount(); // Update total amount on decrease
                }
            });

            increaseBtn.addEventListener('click', () => {
                quantity++;
                quantityDisplay.textContent = quantity;
                updateTotalAmount(); // Update total amount on increase
            });
        });
    }
    updateTotalAmount(); // Initial total amount calculation
}

// Update total amount
function updateTotalAmount() {
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) {
        let totalAmount = 0;

        // Loop through all cart items
        const cartItemElements = document.querySelectorAll('.cart-item');
        cartItemElements.forEach((itemElement) => {
            const quantity = parseInt(itemElement.querySelector('.quantity').textContent, 10);
            const price = parseFloat(itemElement.querySelector('.price').textContent.replace('Rs. ', '')); // Assuming price is displayed in the DOM
            totalAmount += quantity * price;
        });

        // Update the total amount display
        const totalAmountElement = document.querySelector('.total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = ` ${totalAmount}`;
        }
    }
}

// Toggle cart dropdown visibility
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');

if (cartIcon && cartDropdown) {
    cartIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        cartDropdown.classList.toggle('active');
    });

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            cartDropdown.classList.remove('active');
        });
    }

    document.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('active');
        }
    });
}


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
}); */