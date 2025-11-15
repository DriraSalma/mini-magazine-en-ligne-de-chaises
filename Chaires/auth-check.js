document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));

    // --- Si pas connecté ---
    if (!user) {
        // Intercepter tous les boutons ajouter au panier
        const orderButtons = document.querySelectorAll(".add-to-cart, .order");
        orderButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                alert("Vous devez être connecté pour ajouter au panier !");
                window.location.href = "../authentification/login.html";
            });
        });

        // Optionnel : certaines pages spécifiques peuvent être totalement interdites
        // Ex : page profil, panier
        const restrictedPages = ["Profile.html", "panier.html"];
        const pageName = window.location.pathname.split("/").pop();
        if (restrictedPages.includes(pageName)) {
            alert("Vous devez être connecté pour accéder à cette page !");
            window.location.href = "../authentification/login.html";
        }

        return; // arrêter le reste du script
    }

    // --- Gestion du panier ---
    let carts = JSON.parse(localStorage.getItem("carts")) || {};
    if (!carts[user.email]) carts[user.email] = [];

    function isInCart(productName) {
        return carts[user.email].some(p => p.name === productName);
    }

    // Tous les boutons “Ajouter au panier”
    const cartButtons = document.querySelectorAll(".add-to-cart, .order");

    cartButtons.forEach(btn => {
        // Mettre à jour l’état si déjà dans le panier
        const name = btn.dataset.name;
        if (isInCart(name)) {
            btn.classList.add("in-cart");
            btn.style.color = "red";
        }

        // Clic sur le bouton
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            // Quantité
            let quantite = 1;
            const parent = btn.closest(".description_item, .article-details");
            if (parent) {
                const qtyInput = parent.querySelector(".quantity");
                if (qtyInput) quantite = parseInt(qtyInput.value) || 1;
            }

            const product = {
                name: btn.dataset.name,
                price: btn.dataset.price,
                quantite: quantite
            };

            if (isInCart(product.name)) {
                carts[user.email] = carts[user.email].filter(p => p.name !== product.name);
                btn.classList.remove("in-cart");
                btn.style.color = "";
                alert(`"${product.name}" retiré du panier !`);
            } else {
                carts[user.email].push(product);
                btn.classList.add("in-cart");
                btn.style.color = "red";
                alert(`"${product.name}" ajouté au panier avec succès !`);
            }

            localStorage.setItem("carts", JSON.stringify(carts));
        });
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Supprimer la session
            sessionStorage.removeItem("loggedUser");

            alert("Vous êtes déconnecté.");

            // Redirection vers login
            window.location.href = "../authentification/login.html";
        });
    }
});
