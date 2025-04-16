function ajouterIngredient() {
  const div = document.getElementById("ingredients");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "ingredient";
  input.placeholder = "ex: 3 fraises";
  input.required = true;
  div.appendChild(input);
}

function ajouterInstruction() { // Fonction pour ajouter une instruction
  const div = document.getElementById("instructions");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "instruction";
  input.placeholder = "ex: Couper les légumes";
  input.required = true;
  div.appendChild(input);
}

document.getElementById("form-recette").addEventListener("submit", function(e) {
  e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

  const form = e.target; // Récupérer les données du formulaire
  const recette = {
    id: Date.now(), // Génère un ID unique basé sur le timestamp
    titre: form.titre.value,
    temps: form.temps.value,
    difficulte: form.difficulte.value,
    image: form.image.value,
    ingredients: Array.from(form.querySelectorAll('input[name="ingredient"]')).map(input => input.value),
    instructions: Array.from(form.querySelectorAll('input[name="instruction"]')).map(input => input.value)
  };

  // Sauvegarder la recette dans le localStorage
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  recettes.push(recette);
  localStorage.setItem("recettesUser", JSON.stringify(recettes));

  alert("Recette enregistrée !");

  // Réinitialiser le formulaire
  form.reset();
  document.getElementById("ingredients").innerHTML = `<input type="text" name="ingredient" required>`;
  document.getElementById("instructions").innerHTML = `<input type="text" name="instruction" required>`;

  // Afficher la liste des recettes après l'ajout
  afficherRecettes();
});

function afficherRecettes() {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const listeDiv = document.getElementById("liste-recettes");
  listeDiv.innerHTML = ""; // Réinitialiser l'affichage des recettes

  if (recettes.length === 0) {
    listeDiv.innerHTML = "<p>Aucune recette enregistrée.</p>";
    return;
  }

  recettes.forEach(recette => {
    const recetteDiv = document.createElement("div");
    recetteDiv.classList.add("recette");

    // Créer le HTML pour chaque recette
    recetteDiv.innerHTML = `
      <h3>${recette.titre}</h3>
      <img src="${recette.image}" alt="Image de la recette" style="max-width: 200px;">
      <p><strong>Temps: </strong> ${recette.temps}</p>
      <p><strong>Difficulté: </strong> ${recette.difficulte}</p>
      <h4>Ingrédients: </h4>      
        ${recette.ingredients && recette.ingredients.length > 0 
          ? recette.ingredients.map(ing => `${ing}`).join("") 
          : "Aucun ingrédient"
        }
      <h4>Instructions:</h4>
        ${recette.instructions && recette.instructions.length > 0 
          ? recette.instructions.map(instr => ` ${instr} `).join("") 
          : "Aucune instruction"
        }      
      <button onclick="supprimerRecette(${recette.id})"> Supprimer</button>      
    `;
    listeDiv.appendChild(recetteDiv);
  });
}

function supprimerRecette(id) {
  let recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  // Filtrer les recettes pour supprimer celle avec l'id donné
  recettes = recettes.filter(r => r.id !== id);
  localStorage.setItem("recettesUser", JSON.stringify(recettes)); // Mettre à jour localStorage
  afficherRecettes(); // Mettre à jour l'affichage
}

// Appeler la fonction afficherRecettes() pour afficher les recettes au chargement de la page
document.addEventListener("DOMContentLoaded", afficherRecettes);