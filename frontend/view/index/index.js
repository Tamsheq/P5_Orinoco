loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/cameras/").then(data => data.json())
        .then(jsonAllCameras => {
            for (let jsonCameras of jsonAllCameras) {
                let cameras = new Camera(jsonCameras);
                document.querySelector(".container").innerHTML += `<div class="block1 col-sm-12 col-md-6 col-lg-6 pb-3  ">
                                                                        <div class="card border bg-light shadow p-3 mb-5 bg-body rounded">
                                                                            <div class="card-body">
                                                                                <div class="row">
                                                                                    <img src="${cameras.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${cameras.name}"></a>
                                                                                    <div class="col-6 col-sm-7 mt-3" >
                                                                                        <h5 class="card-title">${cameras.name}</h5>
                                                                                    </div>
                                                                                    <div class="col-6 col-sm-5 text-end mt-3">
                                                                                        <h5 class="card-title">${cameras.price / 100} &#8364;</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <a href="../produit/produit.html?id=${cameras._id}" class="btn btn-secondary">Acheter ce produit</a>
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