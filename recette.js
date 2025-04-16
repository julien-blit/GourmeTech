document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path.includes("recettes.html")) {
    chargerToutesLesRecettes();
  } else if (path.includes("recette.html")) {
    afficherRecetteComplete();
  }
});

// Affiche un aperçu de toutes les recettes sur la page recettes.html
async function chargerToutesLesRecettes() {
  const fichiers = ["tarte-pomme.json", "ratatouille.json", "veloute-potiron.json"];
  const conteneur = document.querySelector(".row");
  conteneur.innerHTML = "";

  for (let fichier of fichiers) {
    const response = await fetch(fichier);
    const data = await response.json();
    const recette = data[0];

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="img-container">
        <span class="coeur" onclick="ajouterOuRetirerFavoriDepuisCard(this, '${recette.id}', '${recette.titre}', '${recette.image}')">🤍</span>
        <img class="card-img" src="${recette.image}" alt="${recette.titre}">
      </div>
      <h2 class="recipe-title">${recette.titre}</h2>
      <p class="recipe-description">${recette.categorie || "Plat"} | ${recette.temps} | ${recette.difficulte}</p>
      <button class="favorite-button" onclick="window.location.href='recette.html?id=${recette.id}'">👁️ Voir la recette</button>
    `;

    conteneur.appendChild(card);
  }
}

// Affiche tous les détails d'une seule recette sur la page recette.html
async function afficherRecetteComplete() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const fichiers = ["tarte-pomme.json", "ratatouille.json", "veloute-potiron.json"];
  let recette = null;

  for (let fichier of fichiers) {
    const response = await fetch(fichier);
    const data = await response.json();
    if (data[0].id === id) {
      recette = data[0];
      break;
    }
  }

  if (recette) {
    document.getElementById("recette-titre").textContent = recette.titre;
    document.getElementById("recette-image").src = recette.image;
    document.getElementById("recette-categorie").textContent = "Catégorie : " + (recette.categorie || "Plat");
    document.getElementById("recette-temps").textContent = "Temps : " + recette.temps;
    document.getElementById("recette-difficulte").textContent = "Difficulté : " + recette.difficulte;

    const ul = document.getElementById("liste-ingredients");
    ul.innerHTML = "";
    recette.ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ul.appendChild(li);
    });

    const ol = document.getElementById("liste-instructions");
    ol.innerHTML = "";
    (recette.instructions || recette.instruction).forEach(instruction => {
      const li = document.createElement("li");
      li.textContent = instruction;
      ol.appendChild(li);
    });

    // Gestion du bouton favoris
    const bouton = document.querySelector(".ajouter-favori");
    if (bouton) {
      bouton.dataset.id = recette.id;
      bouton.dataset.titre = recette.titre;
      bouton.dataset.image = recette.image;
      bouton.textContent = estFavori(recette.id) ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris";

      bouton.addEventListener("click", () => {
        const estDejaFavori = ajouterOuRetirerFavori(recette.id, recette.titre, recette.image);
        bouton.textContent = estDejaFavori ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris";
        alert(estDejaFavori ? "Ajouté aux favoris !" : "Retiré des favoris !");
      });
    }
  }
}

// Gère les ajouts/suppressions depuis une carte recette
function ajouterOuRetirerFavoriDepuisCard(element, id, titre, image) {
  const estDejaFavori = ajouterOuRetirerFavori(id, titre, image);
  element.textContent = estDejaFavori ? "❤️" : "🤍";
  alert(estDejaFavori ? "Ajouté aux favoris !" : "Retiré des favoris !");
  element.classList.toggle("active");
}

// Fonction centrale de gestion des favoris (ajout/suppression)
function ajouterOuRetirerFavori(id, titre, image) {
  const favoris = JSON.parse(localStorage.getItem("recettesFavoris")) || [];
  const index = favoris.findIndex(fav => fav.id === id);

  if (index !== -1) {
    favoris.splice(index, 1);
    localStorage.setItem("recettesFavoris", JSON.stringify(favoris));
    return false;
  } else {
    favoris.push({ id, titre, image });
    localStorage.setItem("recettesFavoris", JSON.stringify(favoris));
    return true;
  }
}

// Vérifie si une recette est déjà dans les favoris
function estFavori(id) {
  const favoris = JSON.parse(localStorage.getItem("recettesFavoris")) || [];
  return favoris.some(fav => fav.id === id);
}

async function afficherRecetteComplete() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const fichiers = ["tarte-pomme.json", "ratatouille.json", "veloute-potiron.json"];
  let recette = null;

  for (let fichier of fichiers) {
    const response = await fetch(fichier);
    const data = await response.json();
    if (data[0].id === id) {
      recette = data[0];
      break;
    }
  }

  if (!recette) {
    document.getElementById("recette-titre").textContent = "Recette non trouvée";
    alert("La recette demandée n'existe pas.");
    return;
  }

  document.getElementById("recette-titre").textContent = recette.titre;
  document.getElementById("recette-image").src = recette.image;
  document.getElementById("recette-categorie").textContent = "Catégorie : " + (recette.categorie || "Plat");
  document.getElementById("recette-temps").textContent = "Temps : " + recette.temps;
  document.getElementById("recette-difficulte").textContent = "Difficulté : " + recette.difficulte;

  const ul = document.getElementById("liste-ingredients");
  ul.innerHTML = "";
  recette.ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ul.appendChild(li);
  });

  const ol = document.getElementById("liste-instructions");
  ol.innerHTML = "";
  (recette.instructions || recette.instruction).forEach(instruction => {
    const li = document.createElement("li");
    li.textContent = instruction;
    ol.appendChild(li);
  });

  const bouton = document.querySelector(".ajouter-favori");
  if (bouton) {
    bouton.dataset.id = recette.id;
    bouton.dataset.titre = recette.titre;
    bouton.dataset.image = recette.image;
    bouton.textContent = estFavori(recette.id) ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris";

    bouton.addEventListener("click", () => {
      const estDejaFavori = ajouterOuRetirerFavori(recette.id, recette.titre, recette.image);
      bouton.textContent = estDejaFavori ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris";
      alert(estDejaFavori ? "Ajouté aux favoris !" : "Retiré des favoris !");
    });
  }
}