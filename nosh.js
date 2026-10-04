/* =====================================================
   NOSH - SMART CANTEEN
   Updated Human-Made UI + Functionality
   ===================================================== */


/* ================= MENU DATA ================= */

const menuData = [

    {
        id: 1,
        name: "Idli",
        category: "Breakfast",
        price: 30,
        stock: 50,
        image:
            "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 2,
        name: "Dosa",
        category: "Breakfast",
        price: 40,
        stock: 35,
        image:
            "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 3,
        name: "Upma",
        category: "Breakfast",
        price: 35,
        stock: 30,
        image:
            "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 4,
        name: "Veg Meals",
        category: "Lunch",
        price: 70,
        stock: 40,
        image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 5,
        name: "Chicken Biryani",
        category: "Lunch",
        price: 100,
        stock: 25,
        image:
            "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 6,
        name: "Fried Rice",
        category: "Lunch",
        price: 80,
        stock: 30,
        image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 7,
        name: "Samosa",
        category: "Snacks",
        price: 20,
        stock: 45,
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 8,
        name: "Sandwich",
        category: "Snacks",
        price: 50,
        stock: 25,
        image:
            "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 9,
        name: "Puffs",
        category: "Snacks",
        price: 30,
        stock: 30,
        image:
            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 10,
        name: "Tea",
        category: "Drinks",
        price: 15,
        stock: 80,
        image:
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 11,
        name: "Coffee",
        category: "Drinks",
        price: 20,
        stock: 70,
        image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 12,
        name: "Juice",
        category: "Drinks",
        price: 30,
        stock: 50,
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=85"
    }

];


/* ================= CART ================= */

let cart =
    JSON.parse(
        localStorage.getItem("noshCart")
    ) || [];


/* ================= INVENTORY ================= */

let inventory =
    JSON.parse(
        localStorage.getItem("noshInventory")
    ) || {

        Rice: {
            value: 20,
            unit: "kg"
        },

        Vegetables: {
            value: 8,
            unit: "kg"
        },

        Chicken: {
            value: 3,
            unit: "kg"
        },

        Oil: {
            value: 1,
            unit: "L"
        }

    };


/* ================= ORDERS ================= */

let orders =
    JSON.parse(
        localStorage.getItem("noshOrders")
    ) || [];


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderMenu();

        renderCart();

        updateCartCount();

        renderInventory();

        renderKitchenOrders();

        renderPredictions();

        setupCategories();

        setupSearch();

        updateDashboard();

    }
);


/* =====================================================
   MENU
   ===================================================== */

function renderMenu(
    category = "All",
    search = ""
) {

    const container =
        document.getElementById(
            "menuContainer"
        );

    if (!container) return;


    const filtered =
        menuData.filter(item => {

            const categoryMatch =
                category === "All" ||
                item.category === category;

            const searchMatch =
                item.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return (
                categoryMatch &&
                searchMatch
            );

        });


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="text-center py-5">

                    <i class="bi bi-search fs-1 text-secondary"></i>

                    <h5 class="mt-3">
                        Nothing found
                    </h5>

                    <p class="text-secondary">
                        Try searching for another food item.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        filtered.map(item => {

            let stockText =
                `${item.stock} available`;

            let stockColor = "";


            if (item.stock <= 10) {
                stockColor = "text-danger";
            }

            else if (item.stock <= 20) {
                stockColor = "text-warning";
            }


            return `

                <div class="col-sm-6 col-lg-4">

                    <div class="food-card">

                        <div class="food-photo">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                                loading="lazy"
                            >

                            <span class="food-category">
                                ${item.category}
                            </span>

                        </div>


                        <div class="food-body">

                            <div class="food-name-row">

                                <h5>
                                    ${item.name}
                                </h5>

                                <span class="food-price">
                                    ₹${item.price}
                                </span>

                            </div>


                            <div class="food-stock ${stockColor}">

                                <i class="bi bi-box-seam"></i>

                                ${stockText}

                            </div>


                            <button
                                class="add-food-button"
                                onclick="addToCart(${item.id})"
                                ${item.stock <= 0 ? "disabled" : ""}
                            >

                                <i class="bi bi-plus-lg"></i>

                                Add to order

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
   CATEGORIES
   ===================================================== */

function setupCategories() {

    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );

                this.classList.add("active");


                const category =
                    this.dataset.category;

                const search =
                    document.getElementById(
                        "searchFood"
                    ).value;


                renderMenu(
                    category,
                    search
                );

            }
        );

    });

}


/* =====================================================
   SEARCH
   ===================================================== */

function setupSearch() {

    const search =
        document.getElementById(
            "searchFood"
        );


    search.addEventListener(
        "input",
        function () {

            const active =
                document.querySelector(
                    ".category-btn.active"
                );


            const category =
                active
                    ? active.dataset.category
                    : "All";


            renderMenu(
                category,
                this.value
            );

        }
    );

}


/* =====================================================
   ADD TO CART
   ===================================================== */

function addToCart(id) {

    const product =
        menuData.find(
            item => item.id === id
        );


    if (!product) return;


    if (product.stock <= 0) {

        showToast(
            "This item is currently unavailable."
        );

        return;

    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        if (
            existing.quantity >=
            product.stock
        ) {

            showToast(
                "Maximum available quantity reached."
            );

            return;

        }

        existing.quantity++;

    }

    else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    updateCartCount();


    showToast(
        `${product.name} added to your order.`
    );

}


/* =====================================================
   SAVE CART
   ===================================================== */

function saveCart() {

    localStorage.setItem(
        "noshCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   CART COUNT
   ===================================================== */

function updateCartCount() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const element =
        document.getElementById(
            "cartCount"
        );


    if (element) {
        element.textContent = count;
    }

}


/* =====================================================
   RENDER CART
   ===================================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-bag-x fs-1 text-secondary"></i>

                <h5 class="mt-3">
                    Your bag is empty
                </h5>

                <p class="text-secondary">
                    Add something tasty from today's menu.
                </p>

            </div>

        `;

        totalElement.textContent =
            "₹0";

        return;

    }


    let total = 0;


    container.innerHTML =
        cart.map(item => {

            const itemTotal =
                item.price *
                item.quantity;

            total += itemTotal;


            return `

                <div class="cart-row">

                    <div class="cart-food-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <small>
                            ₹${item.price} each
                        </small>

                    </div>


                    <div class="quantity-control">

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>


                    <strong class="cart-item-total">
                        ₹${itemTotal}
                    </strong>


                    <button
                        class="cart-delete"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="bi bi-trash3"></i>
                    </button>

                </div>

            `;

        }).join("");


    totalElement.textContent =
        `₹${total}`;

}


/* =====================================================
   QUANTITY
   ===================================================== */

function changeQuantity(
    id,
    change
) {

    const cartItem =
        cart.find(
            item => item.id === id
        );


    const product =
        menuData.find(
            item => item.id === id
        );


    if (!cartItem || !product)
        return;


    if (
        change > 0 &&
        cartItem.quantity >=
        product.stock
    ) {

        showToast(
            "You reached the available quantity."
        );

        return;

    }


    cartItem.quantity += change;


    if (cartItem.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   REMOVE
   ===================================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    renderCart();

    updateCartCount();


    showToast(
        "Item removed from your order."
    );

}


/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder() {

    if (cart.length === 0) {

        showToast(
            "Your bag is empty."
        );

        return;

    }


    const pickup =
        document.getElementById(
            "cartPickupTime"
        ).value;


    const token =
        generateToken();


    const order = {

        token: token,

        items:
            JSON.parse(
                JSON.stringify(cart)
            ),

        pickupTime: pickup,

        status: "Preparing",

        createdAt:
            new Date().toISOString()

    };


    orders.push(order);


    localStorage.setItem(
        "noshOrders",
        JSON.stringify(orders)
    );


    /* Reduce menu stock */

    cart.forEach(cartItem => {

        const product =
            menuData.find(
                item =>
                    item.id ===
                    cartItem.id
            );


        if (product) {

            product.stock -=
                cartItem.quantity;

            if (product.stock < 0) {
                product.stock = 0;
            }

        }

    });


    /* Inventory */

    updateInventory(
        cart
    );


    /* Clear */

    cart = [];

    saveCart();

    updateCartCount();

    renderCart();

    renderMenu();

    renderInventory();

    renderKitchenOrders();

    renderPredictions();


    /* Dashboard */

    updateOrderDisplay(
        order
    );


    /* Close cart */

    const cartModal =
        bootstrap.Modal.getInstance(
            document.getElementById(
                "cartModal"
            )
        );


    if (cartModal) {
        cartModal.hide();
    }


    /* Success */

    document.getElementById(
        "successToken"
    ).textContent = token;


    document.getElementById(
        "successPickup"
    ).textContent = pickup;


    const successModal =
        new bootstrap.Modal(
            document.getElementById(
                "successModal"
            )
        );


    successModal.show();


    showToast(
        `Order ${token} placed successfully.`
    );

}


/* =====================================================
   TOKEN
   ===================================================== */

function generateToken() {

    const number =
        Math.floor(
            Math.random() * 900
        ) + 100;


    return `N${number}`;

}


/* =====================================================
   UPDATE ORDER DISPLAY
   ===================================================== */

function updateOrderDisplay(
    order
) {

    document.getElementById(
        "latestToken"
    ).textContent =
        order.token;


    document.getElementById(
        "dashboardToken"
    ).textContent =
        order.token;


    document.getElementById(
        "dashboardStatus"
    ).textContent =
        order.status;


    document.getElementById(
        "dashboardPickup"
    ).textContent =
        order.pickupTime;


    updateStudentTracker(
        order.status
    );

}


/* =====================================================
   INVENTORY
   ===================================================== */

function updateInventory(
    items
) {

    items.forEach(item => {

        const quantity =
            item.quantity;


        if (
            item.name ===
            "Veg Meals"
        ) {

            inventory.Rice.value -=
                0.25 * quantity;

            inventory.Vegetables.value -=
                0.15 * quantity;

        }


        if (
            item.name ===
            "Chicken Biryani"
        ) {

            inventory.Rice.value -=
                0.30 * quantity;

            inventory.Chicken.value -=
                0.20 * quantity;

            inventory.Oil.value -=
                0.03 * quantity;

        }


        if (
            item.name ===
            "Fried Rice"
        ) {

            inventory.Rice.value -=
                0.25 * quantity;

            inventory.Vegetables.value -=
                0.10 * quantity;

            inventory.Oil.value -=
                0.03 * quantity;

        }


        if (
            item.name === "Dosa" ||
            item.name === "Idli" ||
            item.name === "Upma"
        ) {

            inventory.Rice.value -=
                0.08 * quantity;

        }

    });


    Object.keys(inventory)
        .forEach(key => {

            if (
                inventory[key].value < 0
            ) {

                inventory[key].value = 0;

            }

        });


    localStorage.setItem(
        "noshInventory",
        JSON.stringify(inventory)
    );

}


/* =====================================================
   INVENTORY RENDER
   ===================================================== */

function renderInventory() {

    const table =
        document.getElementById(
            "inventoryTable"
        );


    if (!table) return;


    table.innerHTML =
        Object.entries(inventory)
            .map(
                ([name, data]) => {

                    let status =
                        "Available";

                    let className =
                        "inventory-good";


                    if (
                        (
                            data.unit === "kg" &&
                            data.value <= 3
                        ) ||
                        (
                            data.unit === "L" &&
                            data.value <= 0.3
                        )
                    ) {

                        status = "Critical";
                        className =
                            "inventory-critical";

                    }

                    else if (
                        (
                            data.unit === "kg" &&
                            data.value <= 7
                        ) ||
                        (
                            data.unit === "L" &&
                            data.value <= 0.6
                        )
                    ) {

                        status = "Low stock";
                        className =
                            "inventory-low";

                    }


                    return `

                        <tr>

                            <td>
                                <strong>
                                    ${name}
                                </strong>
                            </td>

                            <td>
                                ${data.value.toFixed(1)}
                                ${data.unit}
                            </td>

                            <td>

                                <span
                                    class="inventory-badge ${className}"
                                >
                                    ${status}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =====================================================
   KITCHEN
   ===================================================== */

function renderKitchenOrders() {

    const container =
        document.getElementById(
            "kitchenOrders"
        );


    if (!container) return;


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="text-center py-4">

                <i class="bi bi-check2-circle fs-2 text-success"></i>

                <p class="text-secondary mt-2 mb-0">
                    No live orders right now.
                </p>

            </div>

        `;

        return;

    }


    const latest =
        orders
            .slice(-5)
            .reverse();


    container.innerHTML =
        latest.map(order => {

            const items =
                order.items
                    .map(
                        item =>
                            `${item.name} × ${item.quantity}`
                    )
                    .join(", ");


            let statusClass =
                "preparing";


            if (
                order.status === "Ready"
            ) {
                statusClass = "ready";
            }

            if (
                order.status === "Picked Up"
            ) {
                statusClass = "picked";
            }


            return `

                <div class="kitchen-order">

                    <div
                        class="d-flex justify-content-between gap-3"
                    >

                        <div>

                            <div class="kitchen-token">
                                ${order.token}
                            </div>

                            <div class="kitchen-items">
                                ${items}
                            </div>

                            <div class="kitchen-time mt-2">
                                Pickup · ${order.pickupTime}
                            </div>

                        </div>


                        <span
                            class="order-status ${statusClass}"
                        >
                            ${order.status}
                        </span>

                    </div>


                    <div class="mt-3 d-flex gap-2">

                        ${
                            order.status ===
                            "Preparing"
                            ?
                            `
                                <button
                                    class="kitchen-action"
                                    onclick="
                                        updateOrderStatus(
                                            '${order.token}',
                                            'Ready'
                                        )
                                    "
                                >
                                    Mark ready
                                </button>
                            `
                            :
                            ""
                        }


                        ${
                            order.status ===
                            "Ready"
                            ?
                            `
                                <button
                                    class="kitchen-action"
                                    onclick="
                                        updateOrderStatus(
                                            '${order.token}',
                                            'Picked Up'
                                        )
                                    "
                                >
                                    Completed
                                </button>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            `;

        })
        .join("");

}


/* =====================================================
   ORDER STATUS
   ===================================================== */

function updateOrderStatus(
    token,
    status
) {

    const order =
        orders.find(
            item =>
                item.token === token
        );


    if (!order) return;


    order.status = status;


    localStorage.setItem(
        "noshOrders",
        JSON.stringify(orders)
    );


    renderKitchenOrders();

    updateOrderDisplay(
        order
    );


    showToast(
        `${token} is now ${status}.`
    );

}


/* =====================================================
   TRACKER
   ===================================================== */

function updateStudentTracker(
    status
) {

    const statusElement =
        document.getElementById(
            "orderStatus"
        );


    const progress =
        document.getElementById(
            "orderProgress"
        );


    if (!statusElement)
        return;


    statusElement.className =
        "status-label";


    let width = "50%";


    if (
        status === "Preparing"
    ) {

        statusElement.classList.add(
            "preparing"
        );

        width = "50%";

    }

    else if (
        status === "Ready"
    ) {

        statusElement.classList.add(
            "ready"
        );

        width = "75%";

    }

    else if (
        status === "Picked Up"
    ) {

        statusElement.classList.add(
            "picked"
        );

        width = "100%";

    }


    statusElement.textContent =
        status;


    progress.style.width =
        width;


    const steps =
        document.querySelectorAll(
            ".tracker-step"
        );


    steps.forEach(
        step =>
            step.classList.remove(
                "active"
            )
    );


    if (
        status === "Preparing"
    ) {

        steps[0].classList.add("active");
        steps[1].classList.add("active");

    }

    else if (
        status === "Ready"
    ) {

        steps[0].classList.add("active");
        steps[1].classList.add("active");
        steps[2].classList.add("active");

    }

    else if (
        status === "Picked Up"
    ) {

        steps.forEach(
            step =>
                step.classList.add(
                    "active"
                )
        );

    }

}


/* =====================================================
   DASHBOARD
   ===================================================== */

function updateDashboard() {

    if (orders.length === 0)
        return;


    const latest =
        orders[
            orders.length - 1
        ];


    updateOrderDisplay(
        latest
    );

}


/* =====================================================
   BUDGET
   ===================================================== */

function findBudgetMeals() {

    const budget =
        Number(
            document.getElementById(
                "budgetInput"
            ).value
        );


    const result =
        document.getElementById(
            "budgetResults"
        );


    if (
        !budget ||
        budget <= 0
    ) {

        result.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning">
                    Please enter a valid budget.
                </div>

            </div>

        `;

        return;

    }


    const combinations = [

        {
            items: ["Veg Meals"],
            price: 70
        },

        {
            items: [
                "Veg Meals",
                "Tea"
            ],
            price: 85
        },

        {
            items: [
                "Sandwich",
                "Juice"
            ],
            price: 80
        },

        {
            items: [
                "Idli",
                "Samosa",
                "Tea"
            ],
            price: 65
        },

        {
            items: [
                "Dosa",
                "Tea"
            ],
            price: 55
        },

        {
            items: ["Fried Rice"],
            price: 80
        },

        {
            items: [
                "Chicken Biryani"
            ],
            price: 100
        },

        {
            items: [
                "2 Idli",
                "Vada",
                "Tea"
            ],
            price: 70
        }

    ];


    const suggestions =
        combinations.filter(
            combo =>
                combo.price <= budget
        );


    if (
        suggestions.length === 0
    ) {

        result.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info">
                    No combination found within ₹${budget}.
                </div>

            </div>

        `;

        return;

    }


    result.innerHTML =
        suggestions
            .map(
                combo => `

                    <div class="col-md-6 col-lg-4">

                        <div class="budget-result-card">

                            <h5>
                                <i class="bi bi-stars text-success"></i>
                                Smart combo
                            </h5>

                            <p>
                                ${combo.items.join(" + ")}
                            </p>

                            <div
                                class="d-flex justify-content-between align-items-center"
                            >

                                <strong class="budget-price">
                                    ₹${combo.price}
                                </strong>

                                <button
                                    class="add-food-button"
                                    style="width:auto;padding:0 13px"
                                    onclick='addCombo(${JSON.stringify(combo.items)})'
                                >
                                    Add
                                </button>

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
   ADD COMBO
   ===================================================== */

function addCombo(
    items
) {

    items.forEach(
        itemName => {

            if (
                itemName === "2 Idli"
            ) {

                addToCart(1);
                addToCart(1);

                return;

            }


            const item =
                menuData.find(
                    product =>
                        product.name
                            .toLowerCase() ===
                        itemName
                            .toLowerCase()
                );


            if (item) {
                addToCart(item.id);
            }

        }
    );


    showToast(
        "Combo added to your order."
    );

}


/* =====================================================
   PREDICTION
   ===================================================== */

function renderPredictions() {

    const table =
        document.getElementById(
            "predictionTable"
        );


    if (!table) return;


    const extra =
        orders.length > 3
            ? 1.15
            : 1;


    const predictions = [

        {
            name: "Veg Meals",
            expected:
                Math.round(
                    180 * extra
                ),
            prepared: 175
        },

        {
            name: "Biryani",
            expected:
                Math.round(
                    120 * extra
                ),
            prepared: 115
        },

        {
            name: "Dosa",
            expected:
                Math.round(
                    80 * extra
                ),
            prepared: 80
        },

        {
            name: "Sandwich",
            expected: 45,
            prepared: 60
        }

    ];


    table.innerHTML =
        predictions
            .map(
                item => {

                    let demand =
                        "Normal";

                    let className =
                        "inventory-good";


                    if (
                        item.expected >
                        item.prepared
                    ) {

                        demand = "High";

                        className =
                            "inventory-critical";

                    }

                    else if (
                        item.expected <
                        item.prepared
                    ) {

                        demand = "Excess";

                        className =
                            "inventory-low";

                    }


                    return `

                        <tr>

                            <td>
                                <strong>
                                    ${item.name}
                                </strong>
                            </td>

                            <td>
                                ${item.expected}
                            </td>

                            <td>
                                ${item.prepared}
                            </td>

                            <td>

                                <span
                                    class="inventory-badge ${className}"
                                >
                                    ${demand}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =====================================================
   LOGIN
   ===================================================== */

function loginUser() {

    const role =
        document.getElementById(
            "loginRole"
        ).value;


    const id =
        document.getElementById(
            "loginId"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value.trim();


    if (
        !id ||
        !password
    ) {

        showToast(
            "Please enter your ID and password."
        );

        return;

    }


    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById(
                "loginModal"
            )
        );


    if (modal)
        modal.hide();


    showToast(
        `${getRoleName(role)} login successful.`
    );


    setTimeout(
        function () {

            if (
                role === "student"
            ) {

                document.getElementById(
                    "menu"
                ).scrollIntoView({
                    behavior: "smooth"
                });

            }

            else {

                const target =
                    role === "kitchen"
                        ? "#kitchenTab"
                        : "#adminTab";


                const button =
                    document.querySelector(
                        `[data-bs-target="${target}"]`
                    );


                if (button)
                    button.click();


                document
                    .querySelector(
                        ".dashboard-tabs"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }

        },
        400
    );

}


/* =====================================================
   ROLE NAME
   ===================================================== */

function getRoleName(
    role
) {

    if (role === "kitchen")
        return "Kitchen staff";

    if (role === "admin")
        return "Admin";

    return "Student";

}


/* =====================================================
   TOAST
   ===================================================== */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "noshToast"
        );


    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (!toast)
        return;


    messageElement.textContent =
        message;


    const instance =
        new bootstrap.Toast(
            toast,
            {
                delay: 2500
            }
        );


    instance.show();

}