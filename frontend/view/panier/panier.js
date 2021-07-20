const orderForm = document.getElementById("orderForm");
const emptyBag = document.getElementById("emptyBag");
const id = localStorage.getItem("cameras");
console.log(id);

// Affichage du produit
if (id) {
    loadConfig().then(data => {
        config = data;
        fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
            .then(response => {
                document.querySelector(".container").innerHTML += `<h1 class="row">${response.name}</h1>
                                                                    <p class="row"><img src="${response.imageUrl}" alt="image de l'appareil"></p>
                                                                    <p class="row">${response.description}</p>`;
            });
    });


    // Si panier vide
} else {
    orderForm.classList.add("d-none");
    emptyBag.classList.add("d-none");
    const fullBag = document.getElementById("bag");
    fullBag.classList.toggle("d-none");
    for (product of bag) {
        displayProductListTable(product);
    }
}

var cameras = {
    id: "id",
    lenses: "lenses"
};
var cameras_json = JSON.stringify(cameras);
localStorage.setItem("objet", cameras_json);

var cameras_json = localStorage.getItem("cameras");
var cameras = JSON.parse(cameras_json);
// Affichage dans la console
console.log(cameras.id);

// Vider le panier
const buttonClearBAG = document.getElementById("clearBag");
buttonClearBAG.addEventListener("click", () => {
    clearBag();
    location.reload();
})

// affichage formulaire et cache buttons
const validationBag = document.getElementById("validationBag");
const cacheButton = document.getElementById("cacheButton");
validationBag.addEventListener("click", () => {
    orderForm.classList.toggle("d-none");
    cacheButton.classList.add("d-none");
});