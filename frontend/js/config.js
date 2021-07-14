const bag = JSON.parse(localStorage.getItem("cameras")) || [];

async function loadConfig() {
    let result = await fetch("../../config.json");
    return result.json();
}

function displayProductListTable(response) {
    const indexProduct = bag.indexOf(response);
    const productList = document.getElementById("productsBag");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${response.imageUrl}" class="img-fluid img-thumbnail" alt="${response.name}">
        </td>
        <td class="align-middle">
            <span>${response.name}>/span>
        </td>
        <td class="align-middle">
            <span ${response.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded`
}