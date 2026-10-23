/* ==========================================================
   North Star Bakery - Touchstone 4 Interactivity & Storage
   ================================================---------- */

// Array y Objeto para gestionar los productos y la lista de deseos (nivel Advanced)
const bakeryInventory = [
    { id: 1, name: "Country Sourdough Loaf", category: "Bread" },
    { id: 2, name: "Traditional Alfajores", category: "Pastry" },
    { id: 3, name: "Herb & Maras Salt Focaccia", category: "Specialty" },
    { id: 4, name: "Custom Celebration Cake", category: "Cake" }
];

let userWishlist = [];

// Función 1: Cargar favoritos guardados al iniciar la página (localStorage)
function loadWishlistFromStorage() {
    const savedData = localStorage.getItem("bakeryWishlist");
    if (savedData) {
        userWishlist = JSON.parse(savedData);
        updateWishlistDisplay();
    }
}

// Función 2: Manejar la acción de agregar un producto a la lista de deseos
function toggleWishlist(productName) {
    const index = userWishlist.indexOf(productName);
    
    if (index === -1) {
        userWishlist.push(productName);
    } else {
        userWishlist.splice(index, 1);
    }
    
    saveWishlistToStorage();
    updateWishlistDisplay();
}

// Función 3: Guardar los datos en el navegador (localStorage)
function saveWishlistToStorage() {
    localStorage.setItem("bakeryWishlist", JSON.stringify(userWishlist));
}

// Función 4: Actualizar la interfaz de usuario de manera dinámica
function updateWishlistDisplay() {
    const container = document.getElementById("wishlist-container");
    if (!container) return;

    if (userWishlist.length === 0) {
        container.innerHTML = "<p><em>Your wishlist is currently empty. Click 'Add to Wishlist' on any product below!</em></p>";
    } else {
        let listHTML = "<ul>";
        userWishlist.forEach(item => {
            listHTML += `<li>⭐ ${item}</li>`;
        });
        listHTML += "</ul>";
        container.innerHTML = listHTML;
    }
}

// Función 5: Validación de formulario con JavaScript (Contacto)
function setupFormValidation() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        let isValid = true;
        clearErrors();

        // Validación 1: Campo de nombre requerido
        const fullName = document.getElementById("fullname");
        if (fullName && fullName.value.trim() === "") {
            showError(fullName, "Please enter your full name before submitting.");
            isValid = false;
        }

        // Validación 2: Formato de correo electrónico válido
        const email = document.getElementById("email");
        if (email && (!email.value.includes("@") || !email.value.includes("."))) {
            showError(email, "Please enter a valid email address containing '@' and '.'.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Funciones auxiliares para errores
function showError(inputElement, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#a94442";
    errorDiv.style.fontSize = "0.85rem";
    errorDiv.style.marginTop = "0.3rem";
    errorDiv.innerText = message;
    inputElement.parentNode.appendChild(errorDiv);
    inputElement.style.borderColor = "#a94442";
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(err => err.remove());
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.style.borderColor = "#ccc");
}

// Inicializar al cargar la ventana
window.onload = function() {
    loadWishlistFromStorage();
    setupFormValidation();
};
