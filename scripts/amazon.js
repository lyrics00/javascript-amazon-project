import { products } from '../data/products.js';
import { cart, AddToCart, getCartQuantity, findProduct} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

function renderProducts() {
    const productContainer = document.querySelector('.js-products-grid')
    let productsHTML = '';
    products.forEach((product) => {
        productsHTML += ` 
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
            <select class="js-product-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-product-added-notification-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>` 
    });
    productContainer.innerHTML = productsHTML;
    updateCartQuantity();
}

function handleAddedNotification(productId) {
    const notificationElement = document.querySelector(`.js-product-added-notification-${productId}`);
    if (notificationElement.classList.contains('true-added-to-cart')) {
        clearTimeout(Number(localStorage.getItem(`notificationTimeout-${productId}`)));
        const timeoutId = setTimeout(() => {
            notificationElement.classList.remove('true-added-to-cart');
        }, 2000);
        localStorage.setItem(`notificationTimeout-${productId}`, timeoutId);
    }
    else {
        notificationElement.classList.add('true-added-to-cart');
        const timeoutId = setTimeout(() => {
            notificationElement.classList.remove('true-added-to-cart');
        }, 2000);
        localStorage.setItem(`notificationTimeout-${productId}`, timeoutId);
    }
}


function updateCartQuantity() {
    const cartQuantity = getCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


renderProducts();
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        let selectorElement = document.querySelector(`.js-product-quantity-selector-${productId}`);
        const quantity = Number(selectorElement.value);
        AddToCart(productId, quantity);
        updateCartQuantity();
        handleAddedNotification(productId);
    });
});

