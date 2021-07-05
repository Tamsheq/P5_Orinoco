loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/cameras").then(data => data.json())
        .then(jsonAllCameras => {
            for (let jsonCameras of JsonAllCameras) {
                let cameras = new Cameras(jsonCameras);
                document.querySelector(".container").innerHTML += `<div class="col-12 mt-5">
                                                                        <div class="card cameras">
                                                                            <div class="card-header">
                                                                                <h5 class="card-title d-flex justify-content-between">${cameras.name}<span class="all-cameras">${cameras.getAllCameras()}</span></h5>    
                                                                            </div>
                                                                            <img src="${config.host}/${cameras.imageUrl}" class="card-img-top">
                                                                                <span class="fa-stack fa-2x addPannier" data-id=${cameras.id}>
                                                                                </span>
                                                                                <div class="card-body">
                                                                                    <p class="card-text">${cameras.content}</p>
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