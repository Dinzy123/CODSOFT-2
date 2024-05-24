let cart = [];

function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartCount();
    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartCount();
    saveCart();
    renderCartItems();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${"R" + item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(itemElement);
        });

        const cartSummary = document.createElement('div');
        cartSummary.className = 'cart-summary';
        cartSummary.innerHTML = `
            <h3>Total: ${"R" + cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
            <button onclick="proceedToPayment()">Proceed to Payment</button>
        `;
        cartItems.appendChild(cartSummary);
    }
}

function proceedToPayment() {
    alert('Proceeding to payment is not implemented in this demo.');
}

window.onload = () => {
    loadCart();
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
};
