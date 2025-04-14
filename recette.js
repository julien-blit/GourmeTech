document.addEventListener("DOMContentLoaded", () => {
  fetch("recette.json")
    .then((response) => response.json())
    .then((data) => afficherRecette(data))
    .catch((error) => console.error("Erreur de chargement:", error));
});

function afficherRecette(recette) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = `
    <div class="recipe-header">
      <h2>${recette.titre}</h2>
      <img src="${recette.image}" alt="${recette.titre}" class="recipe-image">
      <p><strong>Temps de préparation :</strong> ${recette.temps}</p>
      <p><strong>Difficulté :</strong> ${recette.difficulte}</p>
    </div>
    <div class="recipe-content">
      <h3>Ingrédients</h3>
      <ul>
        ${recette.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
      </ul>
      <h3>Préparation</h3>
      <ol>
        ${recette.instructions.map(etape => `<li>${etape}</li>`).join("")}
      </ol>
    </div>
  `;
}
  
// function ajaxGet(url, callback) {
//   const req = new XMLHttpRequest();
//   req.open("GET", url);

//   req.onreadystatechange = function () {
//       if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//           callback(req.responseText);
//       }
//   };

//   req.send();
// }

// function afficher(reponse) {
//   // TODO 1 : Afficher la liste des frameworks dans la console
//   const frameworks = reponse.split(";");
//   console.log("Liste des frameworks :", frameworks);

//   // TODO 2 : Ajouter chaque framework dans une <li> à l'intérieur du <ul id="frameworks">
//   const ul = document.getElementById("recipe-content");
//   frameworks.forEach(framework => {
//       const li = document.createElement("li");
//       li.textContent = framework;
//       ul.appendChild(li);
//   });
// }

// // Appel AJAX
// ajaxGet("recette.json", afficher);