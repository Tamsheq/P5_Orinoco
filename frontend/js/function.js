// Mes fonctions
function getItem() {
    var monpanier_json = localStorage.getItem("camera");
    return JSON.parse(monpanier_json);
}

function addLenses(product) {
    const versionChoice = document.getElementsByClassName("section__choice")[0];
    for (let lenses of product.lenses) {
        versionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
    }
}