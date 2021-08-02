const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get('id');


loadConfig().then(data => {
    config = data;
    fetch(`${config.host}/api/cameras/${id}`).then(data => data.json())
        .then(response => {
            document.querySelector(".container").innerHTML += `     <section class="mx-3 my-5">
                                                                        <div class="card px-0 mx-3 my-4 border-0">
                                                                            <div class="row g-0 shadow p-3 bg-body rounded" id="product">
                                                                                <img class="col-md-7" src="${response.imageUrl}">
                                                                                    <!-- Insertion de l'image -->
                                                                                
                                                                                <div class="col-md-5">
                                                                                    <div class="card-body">
                                                                                        <div class="row">
                                                                                            <div class="col-6 col-sm-7 mt-3">${response.name}</div>
                                                                                                <!-- Insertion du nom du produit -->
                                                                                            <div class="col-6 col-sm-5 text-end mt-3">${(response.price / 100).toFixed(2).replace(".", ",")}€</div>
                                                                                                <!-- Insertion du prix du produit -->
                                                                                        </div>
                                                                                        <select class="section__choice form-select mb-3" name="lenses" src="${response.lenses}"></select>
                                                                                        <div class="mb-3">${response.description}</div>
                                                                                            <!-- Insertion de la description du produit -->

                                                                                        <button class="addPanier btn btn-secondary"><b>Ajouter au panier</b></button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                              `;

            function addLenses(product) {
                const versionChoice = document.getElementsByClassName("section__choice")[0];
                for (let lenses of product.lenses) {
                    versionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
                    console.log("toto")
                }
            }
            addLenses(response);

            const addPanier = document.querySelector(".addPanier");
            console.log(addPanier)
            addPanier.addEventListener("click", (e) => {
                var monpanier = {
                    id: id,
                    lenses: document.querySelector('select[name="lenses"]').value
                };
                var monpanier_json = JSON.stringify(monpanier);
                localStorage.setItem("camera", monpanier_json);
                document.location.href = "http://127.0.0.1:5500/frontend/view/panier/panier.html";
            })


        });
});
