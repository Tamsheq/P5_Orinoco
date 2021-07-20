function getUrl() {
    return "http://localhost:3000/api/cameras";
}

const bag = JSON.parse(localStorage.getItem("cameras")) || [];

async function loadConfig() {
    let result = await fetch("../../config.json");
    return result.json();
}

function displayProductListTable(product) {
    const indexProduct = bag.indexOf(product);
    const productList = document.getElementById("container");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}>/span>
        </td>
        <td class="align-middle">
            <span ${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded data-toggle="model" data-target="#exempleModel" data-index="${indexProduct}"><span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" cass="rounded" data-toggle="model" data-targeet="#exempleModel" data-index="${indexProduct}"><span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span></button>
        </td>
        <td class="align-middle">
            <span>${convertPrice(product.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(product.quantity * product.price)}</span>
        </td>
    </tr>`;
}