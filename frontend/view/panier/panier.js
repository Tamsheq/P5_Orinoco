const orderForm = document.getElementById("orderForm");
const emptyBag = document.getElementById("emptyBag");

var monpanier_json = localStorage.getItem("camera");
var monpanier = JSON.parse(monpanier_json);
// Affichage dans la console
console.log(monpanier);

const id = monpanier && monpanier.id;

// Affichage du produit
if (id) {
    loadConfig().then(data => {
        config = data;
        fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
            .then(response => {
                document.querySelector(".container").innerHTML += `<tr class="text-center">
                                                                        <td class="w-25">
                                                                            <img src="${response.imageUrl}" class="img-fluid img-thumbnail" alt="${response.name}">
                                                                        </td>
                                                                   </tr>
                                                                    `;
                document.querySelector(".product").innerHTML = `<tr class="text-center">
                                                                        <td class="w-25">
                                                                            <img src="${response.imageUrl}" class="img-fluid img-thumbnail" alt="${response.name}">
                                                                        </td>
                                                                   </tr>`;
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
            orderId: 1
        }
        // validation du formulaire
        console.log(datas);
        if (
            (regexMail.test(datas.contact.email) === true) &&
            (regexName.test(datas.contact.firstName) === true) &&
            (regexName.test(datas.contact.lastName) === true) &&
            (regexCity.test(datas.contact.city) === true) &&
            (regexAddress.test(datas.contact.address) === true) &&
            (checkBox.checked === true)
        ) {
            console.log('toto');
            fetch(`${config.host}/api/cameras/order`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Allow': 'GET, POST'
                },
                body: JSON.stringify(datas)
            }).then(response => {
                console.log('response', response);
            }).catch(error => {
                console.log('error', error);
            });
        } else {

        }
    });
});
