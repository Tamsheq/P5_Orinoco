fetch(`http://localhost:3000/api/cameras${product_ID}`)
    .then((response) => response.json())
    .then(response => {

        let html = "";

        /* Affichage du produit et personalisation */
        html += `<h1 class="row">${response.name}</h1>
        <p class="row"><img src="${response.imageUrl}" alt="image d'ours en détails" style="width:90%; border-radius:5px;"></p>
        <p class="row">${response.description}</p>
        <p class="row"><b>Prix: ${(response.price / 100).toFixed(2).replace(".", ",")}€</b></p>

            /* Modification de la lentille */

            <label for="select_lentilles">
                <h3>Modifier la lentille de votre appareil</h3></label>
  
                    <select class="section_choice" name="lentilles" id="select_lentilles"></select>
                    `
    })

/* <p class="card-text">${cameras.description}</p> */