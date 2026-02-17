// Constants
const cartModal = document.getElementById('check-out-modal-container');
const cartBtn = document.getElementById('checkoutBtn');
const closeCartBtn = cartModal ? cartModal.querySelector('.close-btn') : null;

/*  
 * DOCU: Hides the cart modal and removes the modal-open class from body
 * @returns {void}
 *  
 * Last Updated: 2026-02-12 
 * Author: Allan Banzuela  
 * Last Updated By: Allan Banzuela
 */
function hideCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
    document.body.classList.remove('modal-open');
}

// Hide cart modal on initial load
hideCartModal();

// Show cart modal when CHECK OUT is clicked
const shippingForm = document.getElementById('shippingForm');

cartBtn.addEventListener('click', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("user");

    if (!userName) {
        showNotification("Login Required", "Please log in or sign up to proceed to checkout.", "warning");
        return;
    }

    const cart = getCartFromStorage();
    if (cart.length === 0) {
        showNotification("Empty Cart", "Your cart is empty! Please add items to your cart before checking out.", "warning");
        return;
    }

    // Validate shipping form first
    if (shippingForm && !shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        return;
    }

    hideCartModal();
    if (cartModal) {
        cartModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
});

// Hide cart modal when close button is clicked
closeCartBtn.addEventListener('click', hideCartModal);