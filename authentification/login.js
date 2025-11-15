function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
        // stocker l'utilisateur dans la session
        sessionStorage.setItem("loggedUser", JSON.stringify(found));
        alert("Connexion réussie !");
        window.location.href = "../acceuil.html"; 
    } else {
        alert("Email ou mot de passe incorrect !");
    }
}

// Empêcher l'accès à login si déjà connecté
window.onload = function() {
    if (sessionStorage.getItem("loggedUser")) {
        window.location.href = "../acceuil.html";
    }
};
