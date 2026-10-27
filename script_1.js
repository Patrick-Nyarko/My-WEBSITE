
/* =====================================
   MAAME SERWAAH CATERING SERVICE
   ===================================== */

// IMPORTANT: Replace this with the business WhatsApp number.
// Use country code and number only, without + or spaces.
// Example Ghana format: 233XXXXXXXXX
const WHATSAPP_NUMBER = "233XXXXXXXXX";

// Menu items: prices are sample prices in Ghana cedis.
// Update them to match your actual prices.
const meals = [
    {
        id: 1,
        name: "Special Jollof Rice",
        category: "rice",
        price: 50,
        description: "Tasty Ghanaian jollof served with chicken.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Fried Rice & Chicken",
        category: "rice",
        price: 55,
        description: "Delicious fried rice with a tasty chicken portion.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Waakye Special",
        category: "local",
        price: 45,
        description: "Waakye served with egg, spaghetti and shito.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Banku & Shito",
        category: "local",
        price: 40,
        description: "Soft banku with delicious pepper and shito.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Rice & Stew",
        category: "rice",
        price: 40,
        description: "Steamed rice with rich Ghanaian tomato stew.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Fried Yam & Pepper",
        category: "sides",
        price: 30,
        description: "Golden fried yam with spicy pepper sauce.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Crispy Fried Chicken",
        category: "sides",
        price: 45,
        description: "Crispy, seasoned chicken pieces.",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Ghanaian Kelewele",
        category: "sides",
        price: 25,
        description: "Spiced, golden fried ripe plantain.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        name: "Banku & Grilled Fish",
        category: "local",
        price: 70,
        description: "Banku with grilled fish and hot pepper.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        name: "Beans & Fried Plantain",
        category: "local",
        price: 35,
        description: "Comforting beans stew with ripe plantain.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 11,
        name: "Chicken in a Bucket",
        category: "sides",
        price: 85,
        description: "A shareable portion of crispy fried chicken.",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 12,
        name: "Jollof Party Pack",
        category: "rice",
        price: 100,
        description: "A generous jollof portion for sharing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
    }
];

// Shopping cart stores meal IDs and quantities.
let cart = [];

// Select HTML elements.
const menuGrid = document.getElementById("menuGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const toast = document.getElementById("toast");

// Format prices in Ghana cedis.
function formatPrice(amount) {
    return "GH₵" + amount.toFixed(2);
}

// Display meals on the website.
function displayMeals(category = "all") {
    const filteredMeals = category === "all"
        ? meals
        : meals.filter(meal => meal.category === category);

    menuGrid.innerHTML = filteredMeals.map(meal => `
        <article class="food-card">
            <img
                src="${meal.image}"
                alt="${meal.name}"
                loading="lazy"
            >

            <div class="food-info">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>

                <div class="food-bottom">
                    <span class="food-price">${formatPrice(meal.price)}</span>
                    <button
                        class="add-button"
                        data-add="${meal.id}"
                        type="button"
                    >
                        + Add to Order
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// Filter meals when a category is selected.
document.getElementById("filters").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    document.querySelectorAll(".filter").forEach(filter => {
        filter.classList.remove("active");
    });

    button.classList.add("active");
    displayMeals(button.dataset.category);
});

// Add a meal to the cart.
menuGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");

    if (!button) return;

    addToCart(Number(button.dataset.add));
});

function addToCart(mealId) {
    const meal = meals.find(item => item.id === mealId);

    if (!meal) return;

    const existingItem = cart.find(item => item.id === mealId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: mealId,
            quantity: 1
        });
    }

    updateCart();
    showToast(meal.name + " added to your order!");
}

// Calculate the total number of meals.
function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Calculate the total price.
function getCartTotal() {
    return cart.reduce((total, item) => {
        const meal = meals.find(meal => meal.id === item.id);
        return total + meal.price * item.quantity;
    }, 0);
}

// Display the shopping cart.
function updateCart() {
    cartCount.textContent = getCartCount();
    cartTotal.textContent = formatPrice(getCartTotal());

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div style="font-size: 45px;">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something delicious from our menu!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => {
        const meal = meals.find(meal => meal.id === item.id);

        return `
            <div class="cart-item">
                <div>
                    <h3>${meal.name}</h3>
                    <small>${formatPrice(meal.price)} each</small>

                    <div class="quantity-controls">
                        <button
                            data-decrease="${meal.id}"
                            aria-label="Decrease ${meal.name} quantity"
                        >−</button>

                        <span>${item.quantity}</span>

                        <button
                            data-increase="${meal.id}"
                            aria-label="Increase ${meal.name} quantity"
                        >+</button>
                    </div>
                </div>

                <div style="text-align: right;">
                    <strong>${formatPrice(meal.price * item.quantity)}</strong>
                    <br>
                    <button
                        class="remove-item"
                        data-remove="${meal.id}"
                    >Remove</button>
                </div>
            </div>
        `;
    }).join("");
}

// Change quantities or remove items.
cartItems.addEventListener("click", event => {
    const decrease = event.target.closest("[data-decrease]");
    const increase = event.target.closest("[data-increase]");
    const remove = event.target.closest("[data-remove]");

    if (decrease) {
        changeQuantity(Number(decrease.dataset.decrease), -1);
    }

    if (increase) {
        changeQuantity(Number(increase.dataset.increase), 1);
    }

    if (remove) {
        const id = Number(remove.dataset.remove);
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
});

function changeQuantity(mealId, change) {
    const item = cart.find(item => item.id === mealId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== mealId);
    }

    updateCart();
}

// Open and close the cart drawer.
function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
});

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Send the cart as a WhatsApp message.
function sendWhatsAppMessage(message) {
    if (!/^233\d{9}$/.test(WHATSAPP_NUMBER)) {
        showToast("Please set the correct WhatsApp number in script.js.");
        return;
    }

    const url = "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty. Please add a meal first.");
        return;
    }

    const orderLines = cart.map(item => {
        const meal = meals.find(meal => meal.id === item.id);

        return `${meal.name} x ${item.quantity} = ${
            formatPrice(meal.price * item.quantity)
        }`;
    });

    const message = [
        "Hello Maame Serwaah Catering Service!",
        "",
        "I would like to place an order:",
        ...orderLines,
        "",
        `Total: ${formatPrice(getCartTotal())}`,
        "",
        "Please confirm availability, delivery options and any extra charges."
    ].join("\n");

    sendWhatsAppMessage(message);
});

// WhatsApp contact links.
const generalMessage =
    "Hello Maame Serwaah Catering Service! I would like to make an enquiry.";

const eventMessage =
    "Hello Maame Serwaah Catering Service! I would like to enquire about catering for an event.";

const deliveryMessage =
    "Hello Maame Serwaah Catering Service! I would like to ask about your delivery locations.";

document.getElementById("contactWhatsApp").addEventListener("click", event => {
    event.preventDefault();
    sendWhatsAppMessage(generalMessage);
});

document.getElementById("eventWhatsApp").addEventListener("click", event => {
    event.preventDefault();
    sendWhatsAppMessage(eventMessage);
});

document.getElementById("locationWhatsApp").addEventListener("click", event => {
    event.preventDefault();
    sendWhatsAppMessage(deliveryMessage);
});

// Show a small notification.
let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Automatically display the current year.
document.getElementById("year").textContent = new Date().getFullYear();

// Initial page setup.
displayMeals();
updateCart();
