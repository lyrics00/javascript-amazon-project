export let cart;

loadFromStorage();

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function AddToCart(productId, quantity) {
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
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}
export function removeFromCart(productId) {
    cart = cart.filter((cartProduct) => cartProduct.productId != productId);
    saveToStorage();
}
export function getCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });
    return cartQuantity
}
export function setProductQuantity(productId, quantity) {
    const product = findProduct(productId);
    product.quantity = Number(quantity);
    saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct = '';
    cart.forEach((cartProduct) => {
        if (productId === cartProduct.productId) {
            matchingProduct = cartProduct;
        }
    });
    matchingProduct.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
export function findProduct(productId) {
    const product = cart.find((item) => item.productId === productId);
    return product;
}
export function loadFromStorage() {
    cart = localStorage.getItem('cart');

    if (cart === null) {
        cart = [ {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    } else {
        cart = JSON.parse(cart);
    }
}