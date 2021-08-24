const contactForm = document.getElementById("contactForm");
const emptyBag = document.getElementById("emptyBag");
const orderForm = document.getElementById("orderForm");

var monpanier_json = localStorage.getItem("camera");
var monpanier = JSON.parse(monpanier_json);
// Affichage dans la console

const id = monpanier && monpanier.id;

// Affichage du produit
if (id) {
    loadConfig().then(data => {
        config = data;
        fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
            .then(response => {
                document.querySelector(".container").innerHTML += ` `;
                document.querySelector(".product").innerHTML = ` <img src="${response.imageUrl}" class=" img-fluid img-thumbnail" alt="${response.name}">
                                                                        `;
                document.querySelector(".quantity").innerHTML = '1';
                document.querySelector(".name").innerHTML = response.name;
                document.querySelector(".option").innerHTML = monpanier.lenses;

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
    contactForm.classList.add("d-none");
    orderForm.classList.add("d-none");
}
$(document).ready(function () {

    // Les regex pour les caractères
    const order = document.getElementById("orderInfo");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^([a-zA-Z'\s]{2,255})$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^([a-zA-Z0-9'\s]{2,255})$/;
    const checkBox = document.getElementById("invalidOrder");


    //order.addEventListener("submit", (event) => {
    document.getElementById("orderInfo").addEventListener("submit", (e) => {
        const datas = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                email: document.getElementById("email").value,
                city: document.getElementById("city").value,
            },
            products: [id],
            panier: monpanier,
            orderId: 1
        }
        // validation du formulaire
        if (
            (regexMail.test(datas.contact.email) === true) &&
            (regexName.test(datas.contact.firstName) === true) &&
            (regexName.test(datas.contact.lastName) === true) &&
            (regexCity.test(datas.contact.city) === true) &&
            (regexAddress.test(datas.contact.address) === true) &&
            (checkBox.checked === true)
        ) {

            fetch(`${config.host}/api/cameras/order`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas)
            }).then(response => {
                localStorage.setItem("orderForm", JSON.stringify(datas));
                document.location.href = "/frontend/view/order/order.html";
            }).catch(error => {
                console.log(error);

            });
        } else {

        }
    });
});
