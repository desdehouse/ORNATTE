document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

// Safely get cart from localStorage
function getCartSafe() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        console.error("Invalid cart data in localStorage:", e);
        return [];
    }
}

function displayCart() {
    const cart = getCartSafe();
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotal) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemName = item.name || "Unnamed Item";
        const itemImage = item.image || "placeholder.jpg";
        const itemPrice = isNaN(parseFloat(item.price)) ? 10 : parseFloat(item.price); // fallback price if invalid
        const itemQuantity = isNaN(parseInt(item.quantity)) ? 1 : parseInt(item.quantity);

        const itemTotal = itemPrice * itemQuantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${itemImage}" alt="${itemName}">
                
                <div class="cart-details">
                    <h4>${itemName}</h4>
                    <p>Price: $${itemPrice.toFixed(2)}</p>
                    <p>Quantity: 
                        <input type="number" min="1" value="${itemQuantity}" 
                        onchange="updateQuantity(${index}, this.value)" />
                    </p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

function updateQuantity(index, quantity) {
    let cart = getCartSafe();
    quantity = parseInt(quantity);

    if (!isNaN(quantity) && quantity > 0) {
        cart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    } else {
        alert("Quantity must be a valid number greater than 0.");
    }
}

function removeFromCart(index) {
    let cart = getCartSafe();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    alert("Order placed! Check your email for confirmation.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
