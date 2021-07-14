const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get('toto');

loadConfig().then(data => {
    config = data;
    fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
        .then(response => {
            document.querySelector(".container").innerHTML += `<h1 class="row">${response.name}</h1>
                <p class="row"><img src="${response.imageUrl}" alt="image de l'appareil" style="width:90%; border-radius:5px;"></p>
                <p class="row">${response.description}</p>
                <p class="row"><b>Prix: ${(response.price / 100).toFixed(2).replace(".", ",")}€</b></p>

                    <!-- modification de la lentille (lenses) --!>

                    <label for="select_lenses">
                        <h3>Modifier la lentille de votre appareil</h3></label>
  
                            <select class="section__choice" name="lenses" src="${response.lenses}"></select>
                            <button class="addPanier btn btn-info justify-content-center mx-auto"><b>Ajouter au panier</b><i class="fas fa-cart-arrow-down"></i></button>`;

            function addLenses(product) {
                const versionChoice = document.getElementsByClassName("section__choice")[0];
                for (let lenses of product.lenses) {
                    console.log(lenses)
                    versionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
                }
            }
            addLenses(response);

            const addPanier = document.getElementsByClassName("addPanier");
            addPanier.addEventListener("click", (e) => {
                e.preventDefault();

                // création du produit
                let objectProduct = new Product(
                    newId,
                    product.name,
                    product.description,
                    product.price,
                    list.value,
                    quantity.value,
                    product.imageUrl
                );
                // on vérifie si alreadyPresent, si oui on sauvegarde dans localStorage
                let isAlreadyPresent = false;
                let indexModification;
                for (products of bag) {
                    switch (products.option) {
                        case objectProduct.option:
                            isAlreadyPresent = true;
                            indexModification = bag.indexOf(products);
                    }
                }

                // si alreadyPresent modification seulement sur la quantité
                if (isAlreadyPresent) {
                    bag[indexModification].quantity + +objectProduct.quantity;
                    localStorage.setItem("cameras", JSON.stringify(bag));
                    // si non, on push le produit dans localStorage
                } else {
                    bag.push(objectProduct);
                    localStorage.setItem("cameras", JSON.stringify(bag));
                }
            })
        });
});
/* <p class="card-text">${cameras.description}</p> */