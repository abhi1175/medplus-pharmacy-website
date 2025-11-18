// ================================
// 🛍 PRODUCT DATA (Available)
// ================================
const products = [
  { id: 1, name: "Antibiotic 250mg", price: 120, image: "images/antibiotic.jpg" },
  { id: 2, name: "Vitamin C-500", price: 200, image: "images/vitaminC.jpg" },
  { id: 3, name: "Cough Syrup", price: 150, image: "images/coughsyrup.jpg" },
  { id: 4, name: "Pain Relief Gel", price: 180, image: "images/painrelief.jpg" },
  { id: 5, name: "Paracetamol 500mg", price: 100, image: "images/paracetamol.jpg" },
  { id: 6, name: "Thermometer", price: 250, image: "images/thermometer.jpg" },
  { id: 7, name: "First Aid Kit", price: 400, image: "images/firstaid.jpg" },
  { id: 8, name: "Band Aid", price: 40, image: "images/bandaid.jpg" },
  { id: 9, name: "Sanitizer 200ml", price: 80, image: "images/sanitizer.jpg" },
  { id: 10, name: "Blood Pressure Monitor", price: 1200, image: "images/bpmonitor.jpg" },
  { id: 11, name: "Diabetes Test Kit", price: 600, image: "images/dbkitkit.jpg" }
];

// ================================
// 🧾 DISPLAY PRODUCTS
// ================================
function displayProducts(containerId, showAll = true) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const displayList = showAll ? products : products.slice(0, 4);
  container.innerHTML = "";

  displayList.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" style="width:100%;height:150px;object-fit:cover;border-radius:8px;">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
       <button onclick="addToCart('${p.name}', '${p.price}', '${p.image}')">Add to Cart</button>
      </div>
    `;
  });
}

// 🏠 Home page (index.html)
if (document.getElementById("featuredProducts")) {
  displayProducts("featuredProducts", false);
}


// ================================
// 🛒 ADD TO CART
// ================================
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart ✅");
}

// ================================
// 🧮 DISPLAY CART
// ================================
function displayCart() {
  const cartContainer = document.getElementById("cartContainer");
  const totalDisplay = document.getElementById("totalPrice");
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    if (totalDisplay) totalDisplay.innerText = "";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += Number(item.price);
    cartContainer.innerHTML += `
      <div class="product">
        <img src="${item.image}" alt="${item.name}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  });

  if (totalDisplay) totalDisplay.innerText = "Total: ₹" + total;
}

// ================================
// ❌ REMOVE ITEM FROM CART
// ================================
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removed = cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(removed[0].name + " removed from cart ❌");
  displayCart();
}

// Auto-load cart when on cart.html
if (document.getElementById("cartContainer")) {
  displayCart();
}
// Search button functionality
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.trim();

  if (query) {
    // Redirect to products page with search query as URL parameter
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
  } else {
    alert("Please enter a product name to search.");
  }
});
