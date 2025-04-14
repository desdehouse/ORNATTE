document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        // Make sure each item has a price
        let itemPrice = item.price || 10; // fallback price
        let itemTotal = itemPrice * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}">
                
                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p>Price: $${itemPrice.toFixed(2)}</p>
                    <p>Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" /></p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    alert("Order placed! Check your email for confirmation.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
