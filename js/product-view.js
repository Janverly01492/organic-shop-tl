/* CONSTANTS */
const mainImage = document.getElementById("mainImage");
const productName = document.getElementById("productName");
const productMeta = document.getElementById("productMeta");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const totalPrice = document.getElementById("totalPrice");

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


// Event Listeners
document.getElementById("avatar").addEventListener("click", toggleDropdown);
window.addEventListener("click", closeDropdown);

// ============== Selected Item ====================
/*  
* DOCU: Extracts the product ID from the current page URL query string.
* It looks for the "id" parameter and converts its value into a number.
*  
* @param {none} - This function does not accept any parameter.
* @returns {number|null} - Returns the product ID as a number if found; otherwise returns null.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function getProductIdFromURL() {
    const query = window.location.search; //output sample: "?id=2"

    if (!query) return null;

    const queryParts = query.substring(1).split("&");
    for (let i = 0; i < queryParts.length; i++) {
        const pair = queryParts[i].split("=");
        const key = pair[0];
        const value = pair[1];

        if (key === "id") {
            return Number(value);
        }
    }
    
    return null;
}


function getTotalPrice() {
    const unitPrice = parseFloat(productPrice.innerText);
    const safeUnitPrice = Number.isFinite(unitPrice) ? unitPrice : 0;

    const qty = getQty();
    const total = safeUnitPrice * qty;
    return total;
}

function updateTotalPrice() {
    totalPrice.innerText = getTotalPrice().toFixed(2);
}

/*  
* DOCU: Displays the selected product details on the product view page.
* It retrieves the product ID from the URL, finds the matching product
* from the PRODUCTS array, and updates the DOM elements accordingly.
*  
* @param {none} - This function does not accept any parameter.
* @returns {void} - This function does not return a value.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function displaySelectedProduct() {
    const productId = getProductIdFromURL();

    const product = findProductById(productId);

    if (!product) {
        productName.innerText = "Product not found";
        return;
    }

    mainImage.src = product.image;
    mainImage.alt = product.name;
    mainImage.classList.add("main-image")

    productName.innerText = product.name;
    productMeta.innerText = `${product.stars} stars • ${product.ratings} Ratings`;
    productPrice.innerText = Number(product.price).toFixed(2);
    updateTotalPrice();

  if (productDescription) {
    productDescription.innerText = product.description || "";
  }
}

// ============== Similar Items ====================

/*  
* DOCU: Displays similar items based on the selected product's category.
* It retrieves the selected product from the URL, filters other products
* in the same category (excluding the current product), then renders them
* inside the "Similar Items" grid.
*  
* @param {none} - This function does not accept any parameter.
* @returns {void} - This function does not return a value.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function displaySimilarItems() {
    const grid = document.querySelector(".similar-items .product-grid");
    const section = document.querySelector(".similar-items");

    if (!grid) return;

    //clear placeholder content first
    grid.innerHTML = "";

    const productId = getProductIdFromURL();
    const selectedProduct = findProductById(productId);

    if (!selectedProduct) {
        if (section) section.style.display = "none";
        return;
    }

    const similarProducts = PRODUCTS.filter(function (product) {
        return (
            product &&
            product.category === selectedProduct.category &&
            product.id !== selectedProduct.id
        );
    });

    if (similarProducts.length === 0) {
        if (section) section.style.display = "none";
        return;
    }

    similarProducts.forEach(function (product) {
        grid.appendChild(createProductCard(product));
    });
}

/*  
* DOCU: Creates a product card element for use in grids.
*  
* @param {Object} product - The product object to render.
* @returns {HTMLAnchorElement} - The fully built product card element.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-14  
* Author: Kerzania  
*/
function createProductCard(product) {
    const card = document.createElement("a");
    card.href = `product-view.html?id=${product.id}`;
    card.classList.add("product-card");

    const thumbDiv = document.createElement("div");
    thumbDiv.classList.add("product-thumb");

    const image = document.createElement("img");
    image.src = product.image || DEFAULT_PRODUCT_IMAGE_SRC;
    image.alt = product.name || "Product image";
    image.classList.add("product-image");

    thumbDiv.appendChild(image);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const infoDetails = document.createElement("div");

    const name = document.createElement("h3");
    name.classList.add("product-name");
    name.innerText = product.name || "Unnamed product";

    const meta = document.createElement("p");
    meta.classList.add("product-meta");
    meta.innerText = `${product.stars ?? 0} stars • ${product.ratings ?? 0} Ratings`;

    infoDetails.appendChild(name);
    infoDetails.appendChild(meta);

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.innerText = `$${Number(product.price || 0).toFixed(2)}`;

    infoDiv.appendChild(infoDetails);
    infoDiv.appendChild(price);

    card.appendChild(thumbDiv);
    card.appendChild(infoDiv);

    return card;
}

/*  
* DOCU: Adds a product to the shopping cart. Requires user authentication.
* If user is not logged in, prompts them to log in or sign up first.
*  
* @param {none} - This function does not accept any parameter.
* @returns {void} - This function does not return a value.
* @throws {none} - This function does not explicitly throw errors.
*
* Last Updated: 2026-02-15  
* Author: Errol
*/
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("user");
    
    if (!userName) {
        alert("Please log in or sign up to add items to your cart.");
        return;
    }

    const productId = getProductIdFromURL();
    const product = findProductById(productId);

    if (!product) {
        alert("Error: Product not found!");
        return;
    }

    const quantity = getQty();

    let cart = JSON.parse(localStorage.getItem('organic_shop_cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('organic_shop_cart', JSON.stringify(cart));

    const modal = document.getElementById('notification-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        const msg = modal.querySelector('p');
        if (msg) msg.innerText = `${product.name} (x${quantity}) has been added to cart.`;
    } else {
        alert(`${product.name} (x${quantity}) added to cart!`);
    }
}

// Close Modal Logic
document.getElementById('close-notification-btn')?.addEventListener('click', function() {
    document.getElementById('notification-modal').style.display = 'none';
});


/*
 * DOCU: Toggles the visibility of the user dropdown menu when the avatar is clicked.
 * @param {MouseEvent} event - The click event triggered by the user.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-11
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */
function toggleDropdown(event) {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("show");
  event.stopPropagation(); // Prevents event from bubbling to window
}

/*
 * DOCU: Closes the dropdown menu when the user clicks outside of it.
 * @param {MouseEvent} event - The click event triggered anywhere on the window.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-11
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */
function closeDropdown(event) {
  const avatar = document.getElementById("avatar");
  const dropdown = document.getElementById("dropdownMenu");

  if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show");
  }
}


function getQty() {
    return Math.max(1, parseInt(document.getElementById("qty").value, 10) || 1);
}

/*
 * DOCU: Updates the quantity input when the user clicks the plus/minus buttons.
 * @param {number} step - The value to add to the current quantity (ex: -1 or 1).
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-14
 * Author: Jheanne A. Salan
 * Last Updated By: Kerzania
 */
function changeQty(step) {
    document.getElementById("qty").value = Math.max(1, getQty() + step);
    updateTotalPrice();
}

displaySelectedProduct();
displaySimilarItems();

/*  
 * DOCU: Implements live search functionality for products.
 * Searches through all products and displays matching results in a dropdown.
 * Users can click on results to navigate to the product page.
 *  
 * Last Updated: 2026-02-15  
 * Author: Errol  
 */
(function initializeProductSearch() {
    const searchBar = document.getElementById('product-search-bar');
    const searchResultsDropdown = document.getElementById('search-results-dropdown');
    
    if (!searchBar || !searchResultsDropdown) return;

    /*  
     * DOCU: Searches products by name based on the query string.
     * @param {string} query - The search term entered by the user.
     * @returns {Array} - Array of matching products.
     */
    function searchProducts(query) {
        if (!query || query.trim() === '') return [];
        
        const lowerQuery = query.toLowerCase().trim();
        return PRODUCTS.filter(function(product) {
            return product.name.toLowerCase().includes(lowerQuery);
        });
    }

    /*  
     * DOCU: Displays search results in the dropdown.
     * @param {Array} results - Array of product objects to display.
     * @returns {void}
     */
    function displaySearchResults(results) {
        searchResultsDropdown.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsDropdown.innerHTML = '<div style="padding: 15px; text-align: center; color: #666;">No products found</div>';
            searchResultsDropdown.style.display = 'block';
            return;
        }

        results.forEach(function(product) {
            const resultItem = document.createElement('a');
            resultItem.href = 'product-view.html?id=' + product.id;
            resultItem.style.cssText = 'display: flex; align-items: center; padding: 12px 15px; text-decoration: none; color: #333; border-bottom: 1px solid #f0f0f0; transition: background-color 0.2s;';
            
            resultItem.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f8f8';
            });
            
            resultItem.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'white';
            });

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.cssText = 'width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 12px;';

            const infoDiv = document.createElement('div');
            infoDiv.style.cssText = 'flex: 1;';

            const nameEl = document.createElement('div');
            nameEl.textContent = product.name;
            nameEl.style.cssText = 'font-weight: 600; margin-bottom: 4px;';

            const priceEl = document.createElement('div');
            priceEl.textContent = '$' + Number(product.price).toFixed(2);
            priceEl.style.cssText = 'color: #4CAF50; font-size: 14px;';

            infoDiv.appendChild(nameEl);
            infoDiv.appendChild(priceEl);

            resultItem.appendChild(img);
            resultItem.appendChild(infoDiv);

            searchResultsDropdown.appendChild(resultItem);
        });

        searchResultsDropdown.style.display = 'block';
    }

    searchBar.addEventListener('input', function(e) {
        const query = e.target.value;
        
        if (!query || query.trim() === '') {
            searchResultsDropdown.style.display = 'none';
            return;
        }

        const results = searchProducts(query);
        displaySearchResults(results);
    });

    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
            searchResultsDropdown.style.display = 'none';
        }
    });

    searchBar.addEventListener('focus', function(e) {
        if (e.target.value.trim() !== '') {
            const results = searchProducts(e.target.value);
            displaySearchResults(results);
        }
    });
})();
