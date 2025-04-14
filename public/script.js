// Utility function to get cart from localStorage
function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        console.error("Error reading cart from localStorage:", e);
        return [];
    }
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(id, name, image, price) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const cart = getCart();

    let count = 0;
    for (let item of cart) {
        if (!isNaN(item.quantity)) {
            count += item.quantity;
        }
    }

    document.getElementById("cart-count").innerText = count;
}

// Display cart items on cart.html page
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = getCart();

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-img" />
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        </div>
    `).join("");
}

// Ensure everything runs after DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCartItems();
});
