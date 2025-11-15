document.addEventListener("DOMContentLoaded", function () {
    const cartBody = document.getElementById("cart-body");
    const totalDisplay = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout-btn");

    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) {
        alert("Veuillez vous connecter pour voir votre panier !");
        window.location.href = "../authentification/login.html";
        return;
    }

    let carts = JSON.parse(localStorage.getItem("carts")) || {};
    let userCart = carts[user.email] || [];

    function afficherPanier() {
        cartBody.innerHTML = "";
        let total = 0;

        if (userCart.length === 0) {
            cartBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; color:gray; padding:20px;">
                        Votre panier est vide 😢
                    </td>
                </tr>
            `;
            totalDisplay.textContent = "Total : 0 DT";
            checkoutBtn.disabled = true; // désactiver le bouton si panier vide
            return;
        }

        checkoutBtn.disabled = false; // activer le bouton si panier non vide

        userCart.forEach((item, index) => {
            const prix = parseFloat(item.price.replace(/[^\d.]/g, ""));
            const quantite = item.quantite ? parseInt(item.quantite) : 1;
            total += prix * quantite;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${prix} DT</td>
                <td>
                    <input type="number" min="1" value="${quantite}" class="qty-input" data-index="${index}">
                </td>
                <td>
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            cartBody.appendChild(row);
        });

        totalDisplay.textContent = `Total : ${total.toFixed(2)} DT`;

        // Supprimer un produit
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.dataset.index;
                userCart.splice(index, 1);
                carts[user.email] = userCart;
                localStorage.setItem("carts", JSON.stringify(carts));
                afficherPanier();
            });
        });

        // Modifier la quantité
        document.querySelectorAll(".qty-input").forEach(input => {
            input.addEventListener("change", function () {
                let index = this.dataset.index;
                let val = parseInt(this.value);
                if (val < 1) val = 1;
                this.value = val;
                userCart[index].quantite = val;
                carts[user.email] = userCart;
                localStorage.setItem("carts", JSON.stringify(carts));
                afficherPanier();
            });
        });
    }

    afficherPanier();

    // Gestion du bouton passer commande
    checkoutBtn.addEventListener("click", () => {
        if (userCart.length === 0) {
            alert("Votre panier est vide !");
            return;
        }
        alert("Merci pour votre commande !");
        userCart = [];
        carts[user.email] = userCart;
        localStorage.setItem("carts", JSON.stringify(carts));
        afficherPanier();
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
