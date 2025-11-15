function RegisterUser(event) {
    event.preventDefault(); // éviter le rechargement

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const password = document.getElementById("pass").value;
    const conf_password = document.getElementById("conf_pass").value;

    // ------------------- VALIDATIONS -------------------

    if (nom.length < 2) {
        alert("Le nom doit contenir au moins 2 caractères.");
        return;
    }

    if (prenom.length < 2) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Veuillez saisir un email valide.");
        return;
    }

    const regexTel = /^[0-9]{8}$/;
    if (!regexTel.test(tel)) {
        alert("Le numéro de téléphone doit contenir 8 chiffres.");
        return;
    }

    if (adresse.length < 5) {
        alert("L'adresse doit contenir au moins 5 caractères.");
        return;
    }

    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    if (password !== conf_password) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // ------------------- ENREGISTREMENT -------------------

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        alert("Cet email est déjà utilisé !");
        return;
    }

    const user = {
        nom,
        prenom,
        email,
        adresse,
        tel,
        password
    };

    //  
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Compte créé avec succès !");
    window.location.href = "login.html";
}
