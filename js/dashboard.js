/*  
 * DOCU: Handles mock product generation and dashboard rendering (pagination is currently UI-only).
 *  
 * Dependencies:
 * - `.product-grid` for product card rendering
 * - `.count` for displaying the generated product count
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */

// TODO: Replace placeholder image with real product images per category/product.

// Constants
const PRODUCT_CATALOG = [
    { name: "Garden Fresh Salad", category: "Salad" },
    { name: "Quinoa Salad Bowl", category: "Salad" },

    { name: "Grilled Chicken Breast", category: "Main Course" },
    { name: "Vegetable Stir Fry", category: "Main Course" },
    { name: "Creamy Mushroom Pasta", category: "Main Course" },
    { name: "Tomato Basil Soup", category: "Main Course" },
    { name: "Roasted Vegetable Platter", category: "Main Course" },
    { name: "Chicken Teriyaki Bowl", category: "Main Course" },
    { name: "Herb Roasted Chicken", category: "Main Course" },

    { name: "Spinach and Cheese Omelette", category: "Breakfast" },
    { name: "Avocado Toast", category: "Breakfast" },
    { name: "Blueberry Pancakes", category: "Breakfast" },

    { name: "Strawberry Chia Pudding", category: "Dessert" },
    { name: "Chocolate Avocado Mousse", category: "Dessert" },

    { name: "Banana Oat Smoothie", category: "Drinks" },
    { name: "Mango Yogurt Shake", category: "Drinks" },
    { name: "Lemon Honey Iced Tea", category: "Drinks" },

    { name: "Vegetable Spring Rolls", category: "Snacks" },
    { name: "Baked Sweet Potato Fries", category: "Snacks" },
    { name: "Fresh Fruit Bowl", category: "Snacks" }
];

const DEFAULT_PRODUCT_IMAGE_SRC = "assets/img/beta_logo.jpg";

const productContainer = document.querySelector(".product-grid");
const productLength = document.querySelector(".count");

// const productCard = document.querySelectorAll(".product-card");
// const productImageContainer = document.querySelectorAll(".product-thumb");


/*  
 * DOCU: Returns a random integer between 0 (inclusive) and maxExclusive (exclusive).
 * @param {number} maxExclusive - Upper bound (exclusive) for the random index.
 * @returns {number} - Random integer in the range [0, maxExclusive).
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function getRandomIndex(maxExclusive) {
    return Math.floor(Math.random() * maxExclusive);
}

/*  
 * DOCU: Returns a random item from the provided array.
 * @param {Array<any>} array - Source array to pick an item from.
 * @returns {any} - Random item from the array.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function getRandomItem(array) {
    return array[getRandomIndex(array.length)];
}

/*  
 * DOCU: Returns a random whole number price within the inclusive range.
 * @param {number} min - Minimum price (inclusive).
 * @param {number} max - Maximum price (inclusive).
 * @returns {number} - Random price between min and max.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*  
 * DOCU: Returns a random star rating between 1 and 5.
 * @param {void} paramName - No parameters.
 * @returns {number} - Random integer star rating from 1 to 5.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function getRandomStars() {
    return Math.floor(Math.random() * 5) + 1;
}

/*  
 * DOCU: Returns a random rating count between 1 and 300.
 * @param {void} paramName - No parameters.
 * @returns {number} - Random integer rating count from 1 to 300.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function getRandmRatings() {
    return Math.floor(Math.random() * 300) + 1;
}

/*  
 * DOCU: Generates a mock product object using PRODUCT_CATALOG and random values.
 * @param {number} id - Unique identifier for the generated product.
 * @returns {Object} - Generated product with { id, name, category, price, stars, ratings }.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function productGenerator(id) {
    const picked = getRandomItem(PRODUCT_CATALOG);

    return {
        id: id,
        name: picked.name,
        category: picked.category,
        price: getRandomPrice(100, 500),
        stars: getRandomStars(),
        ratings: getRandmRatings()
    };
}

/*  
 * DOCU: Generates an array of mock products.
 * @param {number} count - Number of products to generate.
 * @returns {Array<Object>} - Array of generated products.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function generateProducts(count) {
    const products = [];

    for (let i = 0; i < count; i++) {
        products.push(productGenerator(i));
    }

    return products;
}

// console.log(productGenerator(2)); // outputs a single random product
// console.log(generateProducts(5)); // outputs 5 random products

/*  
 * DOCU: Renders product cards into the dashboard product grid container.
 * @param {Array<Object>} products - List of products to render.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *  
 * Last Updated: 2026-02-13  
 * Author: Kerzania  
 * Last Updated By: Kerzania  
 */
function renderProducts(products) {

    // Clear existing products first (will remove the 2 initial product rendered)
    productContainer.innerHTML = "";

    if (productLength) productLength.innerText = `(${products.length})`;

    products.forEach(function (product) {

        //Create anchor card
        const card = document.createElement("a");
        card.href = "product-view.html";
        card.classList.add("product-card");

        //Create thumbnail container
        const thumbDiv = document.createElement("div");
        thumbDiv.classList.add("product-thumb");

        const image = document.createElement("img");
        image.src = DEFAULT_PRODUCT_IMAGE_SRC;
        image.alt = product.name;
        image.classList.add("product-image");

        thumbDiv.appendChild(image);

        //Product Info container
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        // Left side 
        const infoLeft = document.createElement("div");
        infoLeft.classList.add("info-left");

        const name = document.createElement("h3");
        name.classList.add("product-name");
        name.innerText = product.name;

        const meta = document.createElement("p");
        meta.classList.add("product-meta");
        meta.innerText = `${product.stars} stars • ${product.ratings} Ratings`;

        infoLeft.appendChild(name);
        infoLeft.appendChild(meta);

        //Price
        const price = document.createElement("p");
        price.classList.add("product-price");
        price.innerText = `$${product.price}`;

        //Assemble info section
        infoDiv.appendChild(infoLeft);
        infoDiv.appendChild(price);

        //Assemble card
        card.appendChild(thumbDiv);
        card.appendChild(infoDiv);

        //Append to container
        productContainer.appendChild(card);
    });
}

const generatedProducts = generateProducts(10);
renderProducts(generatedProducts);
// console.log(generatedProducts);
