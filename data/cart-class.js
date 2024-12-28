export class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (this.cartItems === null) {
            this.cartItems = [ {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    AddToCart(productId, quantity) {
        let matchingProduct = '';
        this.cartItems.forEach((cartProduct) => {
            if (productId === cartProduct.productId) {
                matchingProduct = cartProduct;
            }
        });
        if (matchingProduct) {
            matchingProduct.quantity += quantity;
        }
        else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }
    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartProduct) => cartProduct.productId != productId);
        this.saveToStorage();
    }
    getCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((product) => {
            cartQuantity += product.quantity;
        });
        return cartQuantity
    }
    setProductQuantity(productId, quantity) {
        const product = this.findProduct(productId);
        product.quantity = Number(quantity);
        this.saveToStorage();
    }
    findProduct(productId) {
        const product = this.cartItems.find((item) => item.productId === productId);
        return product;
    }
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingProduct = '';
        this.cartItems.forEach((cartProduct) => {
            if (productId === cartProduct.productId) {
                matchingProduct = cartProduct;
            }
        });
        matchingProduct.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

const cart_oop = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart_oop);
console.log(businessCart);


export const cart = new Cart('cart');
