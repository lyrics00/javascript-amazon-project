export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [ {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function AddToCart(productId) {
    let selectorElement = document.querySelector(`.js-product-quantity-selector-${productId}`);
    const quantity = Number(selectorElement.value);
    let matchingProduct = '';
    cart.forEach((cartProduct) => {
        if (productId === cartProduct.productId) {
            matchingProduct = cartProduct;
        }
    });
    if (matchingProduct) {
        matchingProduct.quantity += quantity;
    }
    else {
        cart.push({
            productId,
            quantity
        });
    }
    saveToStorage();
}
export function removeFromCart(productId) {
    cart = cart.filter((cartProduct) => cartProduct.productId != productId);
    saveToStorage();
}