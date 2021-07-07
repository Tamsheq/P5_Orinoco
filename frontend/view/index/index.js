loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/cameras").then(data => data.json())
        .then(jsonAllCameras => {
            for (let jsonCameras of jsonAllCameras) {
                let cameras = new Camera(jsonCameras);
                document.querySelector(".container").innerHTML += `<div class="block_cameras">
                                                                        <div class="block1">      
                                                                            </div>
                                                                            <img src="${cameras.imageUrl}" class="img_produits">
                                                                                <span class="fa-stack fa-2x" data-id=${cameras._id}>
                                                                                </span>
                                                                                <div class="block2">
                                                                                    <h2 class="nom_produits">${cameras.name}</h2>
                                                                                    <p class="card-price">${cameras.price / 100} &#8364;</p>
                                                                                    <a href="../produit/produit.html" class="btn btn-info justify-content-center mx-auto">Le produit</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            `;
            }

            document.querySelectorAll(".addPanier").forEach(star => {
                star.addEventListener("click", function () {
                    if (thisclassName.indexOf("activated") != -1) {
                        this.setAttribute("class", "fa-stack fa-2x addPanier");
                        removePanier(this.dataset.id);
                    } else {
                        this.setAttribute("class", "fa-stack fa-2x addPanier activated");
                        addPanier(this.dataset.id);
                    }
                });
            });
        });
});