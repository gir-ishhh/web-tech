// --- 1. OUR PRODUCT DATA ---
// In a real website, you would get this data from a server.
// For our project, we will just define it here.
// --- 1. OUR PRODUCT DATA ---
// In a real website, you would get this data from a server.
// For our project, we will just define it here.
const products = [
    { 
        id: 1, 
        name: 'Sleek Laptop', 
        price: 45000, 
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxsYXB0b3B8ZW58MHx8fHwxNzI2OTMzMTEz&ixlib=rb-4.0.3&q=80&w=1080' 
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
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MHx8fHwxNzI2OTMzMTYw&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        id: 4, 
        name: '4K Widescreen Monitor', 
        price: 15000, 
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAxOTd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vbml0b3J8ZW58MHx8fHwxNzI2OTMzMTc2&ixlib=rb-4.0.3&q=80&w=1080' 
    }
];

// --- 2. THE SHOPPING CART ---
// (The rest of your javascript file remains unchanged...)
// --- 2. THE SHOPPING CART ---
// We need to get the cart from localStorage, or start with an empty array if it's not there.
// JSON.parse() turns the saved string back into an array.
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];


// --- 3. FUNCTIONS TO UPDATE AND DISPLAY THINGS ---

// Function to save the cart to localStorage
function saveCart() {
    // localStorage can only store strings, so we use JSON.stringify() to convert our array.
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// --- 4. PAGE-SPECIFIC LOGIC ---

// We check which page we are on and run the correct code.

// LOGIC FOR THE PRODUCTS PAGE
if (document.getElementById('product-list')) {
    const productList = document.getElementById('product-list');

    // Loop through each product and display it on the page
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

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            // Find the product that was clicked
            const productToAdd = products.find(p => p.id === productId);
            
            // Add it to the cart array
            cart.push(productToAdd);
            
            // Save the updated cart and update the count in the header
            saveCart();
            updateCartCount();

            alert(`${productToAdd.name} has been added to your cart!`);
        });
    });
}

// LOGIC FOR THE CART PAGE
if (document.getElementById('cart-items-container')) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through each item in the cart and display it
        for (let item of cart) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price; // Add the item's price to the total
        }
    }
    // Display the final total
    cartTotalElement.textContent = total.toFixed(2);
}


// --- 5. CODE THAT RUNS ON EVERY PAGE ---
// We need to update the cart count in the header on every single page.
updateCartCount();
// --- 6. LOGIC FOR THE ABOUT US PAGE ACCORDION ---

// Find all the accordion question buttons
const accordionQuestions = document.querySelectorAll('.accordion-question');

// Check if any accordion questions exist on the current page
if (accordionQuestions.length > 0) {
    accordionQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Find the answer panel corresponding to the clicked question
            const answer = question.nextElementSibling;

            // Toggle the 'active' class on the question button
            question.classList.toggle('active');

            // If the panel is already open, close it. Otherwise, open it.
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null; // Close the accordion
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px'; // Open it
            } 
        });
    });
}
// --- 7. LOGIC FOR THE CHECKOUT PAGE ---

// Check if we are on the checkout page by looking for the form
const checkoutForm = document.getElementById('checkout-form');

if (checkoutForm) {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    let total = 0;

    // Display items from cart in the order summary
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

    // Handle the form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from actually submitting

        // Simple validation to check if fields are filled
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        if (name === '' || address === '') {
            alert('Please fill out all shipping details.');
            return; // Stop the function
        }

        // 1. Show a success message
        alert('Thank you for your order! It has been placed successfully.');

        // 2. Clear the cart
        cart = []; // Empty the cart array
        localStorage.removeItem('shoppingCart'); // Remove cart from local storage

        // 3. Redirect to the homepage
        window.location.href = 'index.html';
    });
}