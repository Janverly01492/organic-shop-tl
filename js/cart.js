/*  
 * DOCU: Handles all shopping cart functionalities including quantity changes, item removal, 
 * total calculation, search/filter, and checkout modal interaction.
 * 
 * Last Updated: 2026-02-14  
 * Author: Janverly  
 * Last Updated By: Janverly  
 */
const cartContainer = document.getElementById('cartContainer');
const itemCountEl = document.getElementById('itemCount'); 
const shippingFeeEl = document.getElementById('shippingFee'); 
const totalAmountCart = document.getElementById('total-amount'); 
const totalAmountModal = document.getElementById('total-amount-modal'); 
const totalAmountEl = document.getElementById('totalAmount'); 
const checkoutBtn = document.getElementById('checkoutBtn'); 
const searchInput = document.querySelector('.search-bar'); 
const modalContainer = document.getElementById('check-out-modal-container');
const modalCloseBtn = modalContainer.querySelector('.close-btn');

const paymentForm = document.getElementById('paymentForm');
const payBtn = document.getElementById('pay-button');
const notification = document.getElementById('notification');

const SHIPPING_FEE = 49;


/*  
 * DOCU: Initializes and controls the hamburger menu toggle behavior.
 * It listens for clicks on the menu button to open/close the sidebar drawer,
 * and listens for clicks on the overlay to close the sidebar.
 *  
 * @param {none} - This block does not accept any parameters.
 * @returns {void} - Does not return any value.
 * @throws {None} - No exceptions are explicitly thrown.
 *  
 * Last Updated: 2026-02-15
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */

// Hamburger Menu Function 
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");

if (menuBtn && overlay) {
    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
    });

    overlay.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
    });
}



/*  
 * DOCU: Convert a currency string like "₱100.00" to a number 100  
 * @param {string} str - Currency string to convert  
 * @returns {number} - Numeric value of the currency  
 */
function stringToNumber(str) {
    if (typeof str === 'number') return str;
    return parseFloat(str.replace('₱','').replace('$','').replace(/,/g,'')) || 0;
}

function numberToCurrency(num) {
    return `₱${num.toFixed(2)}`;
}

// cart logic
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('organic_shop_cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        updateOrderSummary();
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.dataset.index = index;

        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <span class="cart-item-price">$${Number(item.price).toFixed(2)}</span>
            </div>
            <div class="cart-qty">
                <label>Quantity</label>
                <button type="button" class="qty-btn-minus">-</button>
                <input type="text" class="cart-qty-value" value="${item.quantity}" readonly>
                <button type="button" class="qty-btn-plus">+</button>
            </div>
            <div class="cart-item-total">
                <label>Total</label>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <button type="button" class="cart-remove-btn">&times;</button>
        `;
        cartContainer.appendChild(li);
    });

    updateOrderSummary();
}

function saveCart() {
    const cartItems = [];
    const items = cartContainer.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = stringToNumber(item.querySelector('.cart-item-price').textContent);
        const image = item.querySelector('img').src;
        const qty = parseInt(item.querySelector('.cart-qty-value').value);
    });
}

function updateCartStorage(index, newQty) {
    const cart = JSON.parse(localStorage.getItem('organic_shop_cart')) || [];
    if (index >= 0 && index < cart.length) {
        if (newQty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = newQty;
        }
        localStorage.setItem('organic_shop_cart', JSON.stringify(cart));
    }
    loadCart(); 
}

function updateOrderSummary() {
    const cartItems = cartContainer.getElementsByClassName('cart-item');
    let subtotal = 0;
    let itemCount = 0;

    Array.from(cartItems).forEach(item => {
        const qtyEl = item.querySelector('.cart-qty-value');
        const priceEl = item.querySelector('.cart-item-price');
        const totalEl = item.querySelector('.cart-item-total span');
        if (!qtyEl || !priceEl || !totalEl) return;

        let qty = parseInt(qtyEl.value) || 1; // Changed to .value for input
        const price = stringToNumber(priceEl.textContent);

        totalEl.textContent = `$${(price * qty).toFixed(2)}`;

        itemCount += qty;
        subtotal += price * qty;
    });

    const total = subtotal + SHIPPING_FEE;

    if (itemCountEl) itemCountEl.textContent = itemCount;
    if (shippingFeeEl) shippingFeeEl.textContent = numberToCurrency(SHIPPING_FEE);
    if (totalAmountCart) totalAmountCart.textContent = numberToCurrency(subtotal);
    if (totalAmountModal) totalAmountModal.textContent = numberToCurrency(total);
    if (totalAmountEl) totalAmountEl.textContent = numberToCurrency(total);
}


// Cart quantity & remove
cartContainer.addEventListener('click', e => {
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;

    const index = parseInt(cartItem.dataset.index);
    const qtyEl = cartItem.querySelector('.cart-qty-value');
    let qty = parseInt(qtyEl.value) || 1;

    if (e.target.classList.contains('qty-btn-minus') || e.target.textContent === "-" || e.target.textContent === "−") {
        updateCartStorage(index, qty - 1);
    } 
    else if (e.target.classList.contains('qty-btn-plus') || e.target.textContent === "+") {
        updateCartStorage(index, qty + 1);
    } 
    else if (e.target.classList.contains('cart-remove-btn') || e.target.textContent === "×") { // &times; is ×
        updateCartStorage(index, 0); // 0 quantity triggers removal
    }
});

// Search cart items
searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const cartItems = cartContainer.getElementsByClassName('cart-item');
    Array.from(cartItems).forEach(item => {
        const itemName = item.querySelector('h3')?.textContent.toLowerCase() || '';
        item.style.display = itemName.includes(query) ? 'flex' : 'none';
    });
});


//payment notif success
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        modalContainer.style.display = 'none';
        document.body.classList.remove('modal-open');       

        // Clear cart
        localStorage.removeItem('organic_shop_cart');
        loadCart();

        // Show Success Modal
        const successModal = document.getElementById('notification-modal');
        if (successModal) {
            successModal.style.display = 'flex';
        }
    });

    // Close notification modal listener
    const closeNotifBtn = document.getElementById('close-notification-btn');
    if (closeNotifBtn) {
        closeNotifBtn.addEventListener('click', function() {
            document.getElementById('notification-modal').style.display = 'none';
        });
    }
}

/*
 * DOCU: Checks URL query parameters for an "add" action and adds the item to the cart.
 * Uses products.data.js to fetch product details.
 */
function checkUrlForNewItem() {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const id = parseInt(params.get('id'));
    const qty = parseInt(params.get('qty'));

    if (action === 'add' && !isNaN(id) && !isNaN(qty) && qty > 0) {
        if (typeof findProductById !== 'function') {
            console.error("findProductById is not defined. Make sure products.data.js is included.");
            return;
        }

        const product = findProductById(id);
        
        if (product) {
            let cart = JSON.parse(localStorage.getItem('organic_shop_cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += qty;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: qty
                });
            }
            localStorage.setItem('organic_shop_cart', JSON.stringify(cart));
            
            const url = new URL(window.location);
            url.searchParams.delete('action');
            url.searchParams.delete('id');
            url.searchParams.delete('qty');
            window.history.replaceState({}, '', url);
        }
    }
}

// Initialize
checkUrlForNewItem();
loadCart();
