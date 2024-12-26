import { cart, getCartQuantity, removeFromCart, setProductQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

initializeCheckoutPage();

const today = dayjs();


function initializeCheckoutPage() {
    renderCheckoutCart();
    handleDelete();
    handleUpdate();
    handleSave();
}
function handleDelete() {
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCheckoutCount();
            console.log(cart);
        });
    });
}
function handleUpdate() {
    document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const saveElement = document.querySelector(`.js-save-quantity-product-${productId}`);
            const inputElement = document.querySelector(`.js-quantity-input-product-${productId}`);
            const updateElement = document.querySelector(`.js-update-quantity-product-${productId}`);
            saveElement.classList.remove('display-false');
            inputElement.classList.remove('display-false');
            updateElement.classList.add('display-false');


        });
    });
    document.querySelectorAll('.js-quantity-input').forEach((input) => {
    
        input.addEventListener('keydown', (event) => {
            console.log(event.key);
            if(event.key === 'Enter') {
                //executeSave
                let quantityValid = true;
                const productId = input.dataset.productId;
                const inputElement = document.querySelector(`.js-quantity-input-product-${productId}`);
                console.log(inputElement.value);
                const quantity = inputElement.value;
                if(quantity <= 0 || quantity >= 1000) {
                    quantityValid = false;
                }
                if (quantityValid) {
                    inputElement.value = '';
                    setProductQuantity(productId, quantity);
                    const saveElement = document.querySelector(`.js-save-quantity-product-${productId}`);
                    const updateElement = document.querySelector(`.js-update-quantity-product-${productId}`);
                    saveElement.classList.add('display-false');
                    inputElement.classList.add('display-false');
                    updateElement.classList.remove('display-false');
                    console.log(cart);
                
                    const quantityElement = document.querySelector(`.js-quantity-label-product-${productId}`);
                    quantityElement.innerHTML = quantity;
                    updateCheckoutCount();
                }
            }
        });     
    });
}

function handleSave() {
    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            //executeSave
            let quantityValid = true;
            const productId = link.dataset.productId;
            const inputElement = document.querySelector(`.js-quantity-input-product-${productId}`);
            console.log(inputElement.value);
            const quantity = inputElement.value;
            if(quantity <= 0 || quantity >= 1000) {
                quantityValid = false;
            }
            if (quantityValid) {
                inputElement.value = '';
                setProductQuantity(productId, quantity);
                const saveElement = document.querySelector(`.js-save-quantity-product-${productId}`);
                const updateElement = document.querySelector(`.js-update-quantity-product-${productId}`);
                saveElement.classList.add('display-false');
                inputElement.classList.add('display-false');
                updateElement.classList.remove('display-false');
                console.log(cart);
            
                const quantityElement = document.querySelector(`.js-quantity-label-product-${productId}`);
                quantityElement.innerHTML = quantity;
                updateCheckoutCount();
            }
            
        });
    });
}

function renderCheckoutCart() {
    let cartItemHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
        cartItemHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-product-${productId}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-product-${productId}" data-product-id="${productId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input js-quantity-input-product-${productId} display-false" data-product-id="${productId}">
                  <span class="save-quantity-link js-save-quantity-link link-primary js-save-quantity-product-${productId} display-false" data-product-id="${productId}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem)}
              </div>
            </div>
          </div>
    
    `;

    });
    document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
    updateCheckoutCount();
}
function updateCheckoutCount() {
    const cartQuantity = getCartQuantity();
    const amountElment = document.querySelector('.js-checkout-amount');
    amountElment.innerHTML = `${cartQuantity} items`;
    const itemSummaryElement = document.querySelector('.js-payment-summary-item-count');
    itemSummaryElement.innerHTML = `Items (${cartQuantity}):`;
}
function deliveryOptionsHTML(cartItem) {
    let deliveryHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        
        const today = dayjs();
        const dateString = today.add(deliveryOption.deliveryDays, 'days').format("dddd, MMMM D");
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        const checkedString = isChecked ? 'checked' : '';
        console.log(deliveryOption.id);
        console.log(cartItem.deliveryOptionId);
        deliveryHTML += `
                <div class="delivery-option">
                  <input type="radio" ${checkedString}
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
        
        `
    });
    return deliveryHTML;
}