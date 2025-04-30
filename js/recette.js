document.addEventListener("DOMContentLoaded", async () => {
  const fichiers = ["ratatouille.json", "veloute-potiron.json", "tarte-pomme.json"];
  try {
    const resultats = await Promise.all(fichiers.map(f => fetch(f).then(r => r.json())));
    recettes = resultats.flat();
    chargerListeRecettes();
  } catch (e) {
    console.error("Erreur chargement recettes :", e);
  }

  document.getElementById("champ-recherche").addEventListener("input", filtrerRecettes);
  document.querySelector(".search-button").addEventListener("click", filtrerRecettes);
});

let recettes = [];

function chargerListeRecettes(recettesFiltrees = recettes) {
  const container = document.getElementById("liste-recettes");
  container.innerHTML = "";

  if (recettesFiltrees.length === 0) {
    container.innerHTML = "<p>Aucune recette trouvée.</p>";
  }

  container.classList.remove("hidden");

  recettesFiltrees.forEach(r => {
    container.innerHTML += `
      <div class="card">
        <div class="img-container">
          <img class="card-img" src="${r.image}" alt="${r.titre}">
        </div>
        <h3>${r.titre}</h3>
        <p>
          <span class="tag orange">${r.categorie}</span>
          <span class="tag green">${r.temps}</span>
          <span class="tag blue">${r.difficulte}</span>
        </p>
        <button onclick="afficherDetail('${r.id}')">Voir la recette</button>
      </div>`;
  });
}

function filtrerRecettes() {
  const recherche = document.getElementById("champ-recherche").value.toLowerCase();
  const filtres = recettes.filter(r => r.titre.toLowerCase().includes(recherche));
  chargerListeRecettes(filtres);
}

function afficherDetail(id) {
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  // Masquer la liste des recettes avec classe
  document.getElementById("liste-recettes").classList.add("hidden");

  // Affiche le modal
  const modal = document.getElementById("modal-detail-recette");
  modal.style.display = "block";

  // Remplir le modal
  document.getElementById("recette-titre").textContent = recette.titre;
  document.getElementById("recette-image").src = recette.image;
  document.getElementById("recette-categorie").textContent = recette.categorie;
  document.getElementById("recette-temps").textContent = recette.temps;
  document.getElementById("recette-difficulte").textContent = recette.difficulte;
  document.getElementById("liste-ingredients").innerHTML = recette.ingredients.map(i => `<li>${i}</li>`).join("");
  document.getElementById("liste-instructions").innerHTML = recette.instructions.map(i => `<li>${i}</li>`).join("");
}

function fermerModal(event) {
  if (event) event.preventDefault();
  console.log("Modal fermé");

  // Masquer le modal
  document.getElementById("modal-detail-recette").style.display = "none";

  // Réafficher la liste des recettes avec sa classe d'origine
  document.getElementById("liste-recettes").classList.remove("hidden");
}