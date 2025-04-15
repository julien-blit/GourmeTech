document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("recettes.html")) {
      chargerToutesLesRecettes();
    } else if (window.location.pathname.includes("recette.html")) {
      afficherRecetteComplete();
    }
  });
  
  async function chargerToutesLesRecettes() {
    const fichiers = ["tarte-pomme.json", "ratatouille.json", "veloute-potiron.json"];
    const conteneur = document.querySelector(".row");
    conteneur.innerHTML = "";
  
    for (let fichier of fichiers) {
      const response = await fetch(fichier);
      const data = await response.json();
      const recette = data[0];
  
      const div = document.createElement("div");
      div.className = "column";
  
      div.innerHTML = `
        <a href="recette.html?id=${recette.id}">
          <h2>${recette.titre}</h2>
        </a>
        <section class="recette-details">
          <img src="${recette.image}" alt="Image de la recette" style="width: 200px;">
          <p>Catégorie : ${recette.categorie || "Plat"}</p>
          <p>Temps : ${recette.temps}</p>
          <p>Difficulté : ${recette.difficulte}</p>
          <p>Pour ${recette.personnes || "4"} personnes</p>
          <button class="ajouter-favori" data-id="${recette.id}" data-titre="${recette.titre}" data-image="${recette.image}">⭐ Ajouter aux favoris</button>
        </section>
      `;
  
      conteneur.appendChild(div);
    }
  
    // Reconnecte les boutons après création
    setTimeout(() => {
      const boutons = document.querySelectorAll(".ajouter-favori");
      boutons.forEach(btn => {
        btn.addEventListener("click", ajouterOuRetirerFavori);
      });
    }, 100);
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
  
    if (recette) {
      document.getElementById("recette-titre").textContent = recette.titre;
      document.getElementById("recette-image").src = recette.image;
      document.getElementById("recette-categorie").textContent = "Catégorie : " + (recette.categorie || "Plat");
      document.getElementById("recette-temps").textContent = "Temps : " + recette.temps;
      document.getElementById("recette-difficulte").textContent = "Difficulté : " + recette.difficulte;
      document.getElementById("recette-personnes").textContent = "Pour " + (recette.personnes || "4") + " personnes";
  
      const ul = document.getElementById("liste-ingredients");
      recette.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ul.appendChild(li);
      });
  
      const ol = document.getElementById("liste-instructions");
      recette.instructions.forEach(etape => {
        const li = document.createElement("li");
        li.textContent = etape;
        ol.appendChild(li);
      });
  
      // Activer le bouton favoris
      const bouton = document.querySelector(".ajouter-favori");
      if (bouton) {
        bouton.dataset.id = recette.id;
        bouton.dataset.titre = recette.titre;
        bouton.dataset.image = recette.image;
        initialiserFavoris(); // permet d'éviter les duplications
        // bouton.addEventListener("click", ajouterOuRetirerFavori);
      }
    }
  }
