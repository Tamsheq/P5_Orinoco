const orderForm = document.getElementById("orderForm");
const emptyBag = document.getElementById("emptyBag");

var monobjet_json = localStorage.getItem("camera");
var monobjet = JSON.parse(monobjet_json);
// Affichage dans la console
console.log(monobjet);

const id = monobjet && monobjet.id;

// Affichage du produit
if (id) {
    loadConfig().then(data => {
        config = data;
        fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
            .then(response => {
                document.querySelector(".container").innerHTML += `<h1 class="row">${response.name}</h1>
                                                                    <p class="row"><img src="${response.imageUrl}" alt="image de l'appareil"></p>
                                                                    <p class="row">${response.description}</p>
                                                                    <p class="row">${monobjet.lenses}</p>
                                                                    `;
                document.querySelector(".product").innerHTML = 'Caméra';
                document.querySelector(".quantity").innerHTML = '1';
                document.querySelector(".name").innerHTML = response.name;
                document.querySelector(".option").innerHTML = monobjet.lenses;

                const price = response.price.toString();
                const formatPrice = price.slice(0, -2) + '.' + price.slice(-2, price.lenght);

                document.querySelector(".price").innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(formatPrice);
                document.querySelector("#clearBag").addEventListener("click", (e) => {
                    localStorage.clear();
                    location.reload();
                })
            });
    });

    emptyBag.classList.add("d-none");


    // Si panier vide
} else {
    orderForm.classList.add("d-none");
}
$(document).ready(function () {
    // Vider le panier

    // affichage formulaire et cache buttons
    const validationBag = document.getElementById("validationBag");
    const cacheButton = document.getElementById("cacheButton");
    validationBag.addEventListener("click", () => {
        orderForm.classList.toggle("d-none");
        cacheButton.classList.add("d-none");

    });

    // Les regex pour les caractères
    const order = document.getElementById("orderInfo");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^([a-zA-Z'\s]{2,255})$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^([a-zA-Z0-9'\s]{2,255})$/;
    const checkBox = document.getElementById("invalidOrder");


    order.addEventListener("submit", (event) => {
        const contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            email: document.getElementById("email").value,
            city: document.getElementById("city").value,
            products: [id],
            orderId: 1
        }
        console.log(contact);
        // validation du formulaire
        if (
            (regexMail.test(contact.email) == true) &&
            (regexName.test(contact.firstName) == true) &&
            (regexName.test(contact.lastName) == true) &&
            (regexCity.test(contact.city) == true) &&
            (regexAddress.test(contact.address) == true) &&
            (checkBox.checked == true)
        ) {
            debugger
            fetch(`${config.host}/api/cameras/order`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
        } else {
            console.log("ko");
        }
    });
});
