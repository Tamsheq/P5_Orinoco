const orderForm = document.getElementById("orderForm");
const emptyBag = document.getElementById("emptyBag");

// Si le panier est vide
if (emptyBag.lenght < 1) {
    orderForm.classList.add("d-none");

    // Sinon affichage des produits
} else {
    orderForm.classList.add("d-none");
    emptyBag.classList.add("d-none");

    const fullBag = document.getElementById("bag");
    fullBag.classList.toggle("d-none");
    for (product of bag) {
        displayProductListTable(product);
    }

    // Ajout du produit
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        bag[index].quantity++;
        localStorage.setItem("cameras", JSON.stringify(bag));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName("plus");
    for (add of buttonAdd) {
        add.addEventListenet("click", addProduct);
    }

    // Prix total
    totalPrice();

    // Vider le panier
    const buttonClearBAG = document.getElementById("clearBag");
    buttonClearBAG.addEventListener("click", () => {
        clearBag();
        location.reload();
    })
}