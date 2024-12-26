import { cart, getCartQuantity } from "../../data/cart.js";
import { findProduct } from "./orderSummary.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
export function renderPaymentSummary () {
    console.log('payment summary');
    let itemCost = 0;
    let shippingCost = 0;
    cart.forEach((cartItem) => {
        const matchingProduct = findProduct(cartItem.productId);
        itemCost += matchingProduct.priceCents * cartItem.quantity;

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        shippingCost += deliveryOption.priceCents;
    })
    console.log(itemCost);
    console.log(shippingCost);
    const totalBeforeTaxCents = itemCost + shippingCost;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-item-count">Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(itemCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `;
    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    console.log(paymentSummaryElement);
    paymentSummaryElement.innerHTML = paymentSummaryHTML;
    updateCheckoutCount();
}
export function updateCheckoutCount() {
    const cartQuantity = getCartQuantity();
    const amountElment = document.querySelector('.js-checkout-amount');
    amountElment.innerHTML = `${cartQuantity} items`;
    const itemSummaryElement = document.querySelector('.js-payment-summary-item-count');
    itemSummaryElement.innerHTML = `Items (${cartQuantity}):`;
}
