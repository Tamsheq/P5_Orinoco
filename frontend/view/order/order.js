// Récupération des données dans le localStorage
const order = JSON.parse(localStorage.getItem("orderForm")) || [];

// Affiche les informations clients
const informations = document.getElementById("orderForm");
informations.innerHTML += `
    <p class="text-center fs-5"><span class="fw-bold text-capitalize">${order.contact.firstName}</span> merci pour votre achat chez nous !</p>
    <p class="text-center fs-5">La référence de votre commande est <span class="fw-bold">${order.orderId}</span></p>
    <p class="text-center fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold">${order.contact.email}</span></p>
    <p class="text-center fs-5">Votre commande sera envoyer à l'adresse suivante :
    <div class="text-center fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
 
`;

// Utilisation des données du panier dans localStorage
var monpanier = getItem();
const id = monpanier && monpanier.id;

// Affiche les données du panier
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
            });
    });
}