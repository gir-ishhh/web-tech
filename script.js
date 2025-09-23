// --- PRODUCTS PAGE LOGIC ---
const products = [
    { 
        id: 1, 
        name: 'Sleek Laptop', 
        price: 45000, 
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxsYXB0b3B8ZW58MHx8fHwxNzI2OTMzMTEz&ixlib=rb-4.0.3&q=80&w=400'
    },
    { 
        id: 2, 
        name: 'Wireless Mouse', 
        price: 1200, 
        image: 'https://m.media-amazon.com/images/I/51qhS7VfpFL._AC_SL1500_.jpg' 
    },
    { 
        id: 3, 
        name: 'Mechanical Keyboard', 
        price: 2500, 
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MHx8fHwxNzI2OTMzMTEz&ixlib=rb-4.0.3&q=80&w=400'
    },
    { 
        id: 4, 
        name: '4K Widescreen Monitor', 
        price: 15000, 
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vbml0b3J8ZW58MHx8fHwxNzI2OTMzMTIz&ixlib=rb-4.0.3&q=80&w=400'
    }
];

let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// --- PRODUCTS PAGE LOGIC ---
if (document.getElementById('product-list')) {
    const productList = document.getElementById('product-list');
    for (let product of products) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    }
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const productToAdd = products.find(p => p.id === productId);
            cart.push(productToAdd);
            saveCart();
            updateCartCount();
            alert(`${productToAdd.name} has been added to your cart!`);
        });
    });
}

// --- CART PAGE LOGIC ---
if (document.getElementById('cart-items-container')) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        for (let item of cart) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        }
    }
    cartTotalElement.textContent = total.toFixed(2);
}

// --- COMMON HEADER LOGIC ---
updateCartCount();

// --- ABOUT US PAGE ACCORDION LOGIC ---
const accordionQuestions = document.querySelectorAll('.accordion-question');
if (accordionQuestions.length > 0) {
    accordionQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } 
        });
    });
}

// --- CHECKOUT PAGE LOGIC ---
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    let total = 0;

    if (cart.length === 0) {
        summaryItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `<span>${item.name}</span><span>₹${item.price}</span>`;
            summaryItems.appendChild(summaryItem);
            total += item.price;
        });
    }
    summaryTotal.textContent = total.toFixed(2);

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        if (name === '' || address === '') {
            alert('Please fill out all shipping details.');
            return;
        }
        alert('Thank you for your order! It has been placed successfully.');
        cart = [];
        localStorage.removeItem('shoppingCart');
        window.location.href = 'index.html';
    });
}
