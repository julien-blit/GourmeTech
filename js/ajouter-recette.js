<<<<<<< HEAD
document.getElementById("form-recette").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];

  const editId = form['edit-id'] ? form['edit-id'].value : null;
  let imageData = "";

  const imageInput = form.image;

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      imageData = evt.target.result;
      enregistrerRecette(recettes, form, imageData, editId);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    enregistrerRecette(recettes, form, form.image.value, editId);
  }
});

function enregistrerRecette(recettes, form, image, editId) {
  const nouvelleRecette = {
    id: editId ? Number(editId) : Date.now(),
    titre: form.titre.value,
    temps: form.temps.value,
    difficulte: form.difficulte.value,
    image: image,
    ingredients: form.ingredient.value.split('\n'),
    instructions: form.instruction.value.split('\n'),
    favori: false
  };

  let nouvellesRecettes;
  if (editId) {
    nouvellesRecettes = recettes.map(r => r.id == editId ? nouvelleRecette : r);
  } else {
    nouvellesRecettes = [...recettes, nouvelleRecette];
  }

  localStorage.setItem("recettesUser", JSON.stringify(nouvellesRecettes));
  form.reset();
  const idField = form.querySelector('input[name="edit-id"]');
  if (idField) idField.remove();

  afficherRecettes();
}

function afficherRecettes(filtre = 'toutes') {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const container = document.getElementById("liste-recettes");
  container.innerHTML = "";

  let recettesFiltrees = [...recettes].reverse(); // Inverser l’ordre

  if (filtre === 'favoris') {
    recettesFiltrees = recettesFiltrees.filter(r => r.favori);
  }

  if (recettesFiltrees.length === 0) {
    container.innerHTML = "<p>Aucune recette.</p>";
    return;
  }

  recettesFiltrees.forEach(recette => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="img-container">
        <img class="card-img" src="${recette.image}" alt="${recette.titre}">
        <span class="coeur-favori" onclick="toggleFavori(${recette.id})">
          ${recette.favori ? '❤️' : '🤍'}
        </span>
      </div>
      <div class="card-body">
        <h3>${recette.titre}</h3>
          <span class="tag orange">${recette.categorie}</span>
          <span class="tag green">${recette.temps}</span>
          <span class="tag blue">${recette.difficulte}</span> 
        <button onclick="voirRecette(${recette.id})">Voir la recette</button>       
      </div>
      `;
      // <button onclick="modifierRecette(${recette.id})">mudar</button>
      //<button onclick="supprimerRecette(${recette.id})">apagar</button>
    container.appendChild(div);
  });
}



function voirRecette(id) {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  const fiche = document.getElementById("fiche-recette");

  // Reset animation
  fiche.style.display = "none";
  void fiche.offsetWidth;
  fiche.style.display = "block";

  document.getElementById("recette-titre").textContent = recette.titre;
  document.getElementById("recette-image").src = recette.image;
  document.getElementById("recette-temps").textContent = `⏱️ ${recette.temps}`;
  document.getElementById("recette-difficulte").textContent = `🎯 ${recette.difficulte}`;
  document.getElementById("recette-categorie").textContent = recette.categorie || "🍽️ Plat";

  const ul = document.getElementById("liste-ingredients");
  const ol = document.getElementById("liste-instructions");
  ul.innerHTML = "";
  ol.innerHTML = "";

  recette.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ul.appendChild(li);
  });

  recette.instructions.forEach(ins => {
    const li = document.createElement("li");
    li.textContent = ins;
    ol.appendChild(li);
  });

  // Scroll vers la fiche recette
  fiche.scrollIntoView({ behavior: "smooth" });
}

function modifierRecette(id) {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  const form = document.getElementById("form-recette");
  form.titre.value = recette.titre;
  form.temps.value = recette.temps;
  form.difficulte.value = recette.difficulte;
  form.ingredient.value = recette.ingredients.join("\n");
  form.instruction.value = recette.instructions.join("\n");

  // Ajouter un champ caché pour stocker l'ID
  let idField = document.querySelector('input[name="edit-id"]');
  if (!idField) {
    idField = document.createElement("input");
    idField.type = "hidden";
    idField.name = "edit-id";
    form.appendChild(idField);
  }
  idField.value = id;

  form.scrollIntoView({ behavior: "smooth" });
}


function supprimerRecette(id) {
  let recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  recettes = recettes.filter(r => r.id !== id);
  localStorage.setItem("recettesUser", JSON.stringify(recettes));
  afficherRecettes();
}

function toggleFavori(id) {
  let recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  recettes = recettes.map(r => r.id === id ? { ...r, favori: !r.favori } : r);
  localStorage.setItem("recettesUser", JSON.stringify(recettes));
  afficherRecettes();
}

function filtrer(type) {
  afficherRecettes(type);
}

document.addEventListener("DOMContentLoaded", () => afficherRecettes());

=======
// Affiche le loader dès le chargement de la page
window.onload = function() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; // Affiche le loader

  // Simule un délai pour cacher le loader après un court instant 
  setTimeout(function() {
    loader.style.display = "none"; // Cache le loader
  }, 1200); // delai
};

document.addEventListener("DOMContentLoaded", () => afficherRecettes());

// Lorsque le formulaire est soumis
document.getElementById("form-recette").addEventListener("submit", function (e) {
  e.preventDefault();  // Empêche le comportement par défaut (soumission du formulaire)
  
  const form = e.target;
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const editId = form["edit-id"] ? form["edit-id"].value : null;
  let imageData = "";
  
  // Affiche le loader pendant le traitement de l'image
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; // Affichage du loader

  const imageInput = form.image;

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      imageData = evt.target.result;
      enregistrerRecette(recettes, form, imageData, editId, loader); // Appelle la fonction pour enregistrer la recette
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    enregistrerRecette(recettes, form, form.image.value, editId, loader);
  }
});

function enregistrerRecette(recettes, form, image, editId, loader) {
  // Ajoute un délai simulé pour afficher le loader pendant l'enregistrement
  setTimeout(() => {
    const nouvelleRecette = {
      id: editId ? Number(editId) : Date.now(),
      titre: form.titre.value,
      temps: form.temps.value,
      categorie: form.categorie.value,
      difficulte: form.difficulte.value,
      image: image,
      ingredients: form.ingredient.value.split("\n"),
      instructions: form.instruction.value.split("\n"),
      favori: false
    };

    let nouvellesRecettes;
    if (editId) {
      nouvellesRecettes = recettes.map(r => r.id == editId ? nouvelleRecette : r);
    } else {
      nouvellesRecettes = [...recettes, nouvelleRecette];
    }

    localStorage.setItem("recettesUser", JSON.stringify(nouvellesRecettes));  // Sauvegarde dans localStorage
    form.reset();  // Réinitialise le formulaire
    const idField = form.querySelector('input[name="edit-id"]');
    if (idField) idField.remove();

    afficherRecettes();  // Met à jour l'affichage des recettes
    loader.style.display = "none";  // Cache le loader
  }, 1000);  // Délai de 1 seconde pour simuler un chargement
}

function afficherRecettes(filtre = "toutes") {
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; // Affiche le loader avant de charger les recettes

  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const container = document.getElementById("liste-recettes");
  container.innerHTML = "";

  let recettesFiltrees = [...recettes].reverse();
  if (filtre === "favoris") {
    recettesFiltrees = recettesFiltrees.filter(r => r.favori);
  }

  if (recettesFiltrees.length === 0) {
    container.innerHTML = "<p>Aucune recette.</p>";
  } else {
    recettesFiltrees.forEach(recette => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="img-container">
          <img class="card-img" src="${recette.image}" alt="${recette.titre}">       
        </div>
        <div class="card-body">
          <h3>${recette.titre}</h3>
          <span class="tag orange">${recette.categorie}</span>
          <span class="tag green">${recette.temps}</span>
          <span class="tag blue">${recette.difficulte}</span> 
          <button class="btn" onclick="voirRecette(${recette.id})">Voir la recette</button>   
        </div>`;
      container.appendChild(div);
    });
  }
  
  loader.style.display = "none"; // Cache le loader après le chargement des recettes
}

function voirRecette(id) {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  const fiche = document.getElementById("fiche-recette");
  fiche.classList.remove("hidden");

  document.getElementById("recette-titre").textContent = recette.titre;
  document.getElementById("recette-image").src = recette.image;
  document.getElementById("recette-categorie").textContent = recette.categorie;
  document.getElementById("recette-temps").textContent = recette.temps;
  document.getElementById("recette-difficulte").textContent = recette.difficulte;

  const ul = document.getElementById("liste-ingredients");
  const ol = document.getElementById("liste-instructions");
  ul.innerHTML = "";
  ol.innerHTML = "";

  recette.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ul.appendChild(li);
  });

  recette.instructions.forEach(ins => {
    const li = document.createElement("li");
    li.textContent = ins;
    ol.appendChild(li);
  });
  
  fiche.scrollIntoView({ behavior: "smooth" });
}

function modifierRecette(id) {
  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  const recette = recettes.find(r => r.id === id);
  if (!recette) return;

  const form = document.getElementById("form-recette");
  form.titre.value = recette.titre;
  form.categorie.value = recette.categorie;
  form.temps.value = recette.temps;
  form.difficulte.value = recette.difficulte;
  form.ingredient.value = recette.ingredients.join("\n");
  form.instruction.value = recette.instructions.join("\n");

  let idField = document.querySelector('input[name="edit-id"]');
  if (!idField) {
    idField = document.createElement("input");
    idField.type = "hidden";
    idField.name = "edit-id";
    form.appendChild(idField);
  }
  idField.value = id;

  form.scrollIntoView({ behavior: "smooth" });
}

function supprimerRecette(id) {
  let recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  recettes = recettes.filter(r => r.id !== id);
  localStorage.setItem("recettesUser", JSON.stringify(recettes));
  afficherRecettes();
}

function toggleFavori(id) {
  let recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
  recettes = recettes.map(r => r.id === id ? { ...r, favori: !r.favori } : r);
  localStorage.setItem("recettesUser", JSON.stringify(recettes));
  afficherRecettes();
}

function filtrer(type) {
  afficherRecettes(type);
}

// Copier la recette (titre + ingrédients + instructions)
function copierRecette() {
  const titre = document.getElementById("recette-titre").textContent;
  const ingredients = Array.from(document.querySelectorAll("#liste-ingredients li"))
    .map(li => "- " + li.textContent)
    .join("\n");
  const instructions = Array.from(document.querySelectorAll("#liste-instructions li"))
    .map((li, i) => `${i + 1}. ${li.textContent}`)
    .join("\n");

  const texte = `Recette : ${titre}\n\nIngrédients :\n${ingredients}\n\nInstructions :\n${instructions}`;

  navigator.clipboard.writeText(texte).then(() => {
    alert("Recette copiée !");
  }).catch(err => {
    alert("Erreur lors de la copie : " + err);
  });
}

// Exporter la recette en PDF
function telechargerPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const titre = document.getElementById("recette-titre").textContent;
  const categorie = document.getElementById("recette-categorie").textContent;
  const temps = document.getElementById("recette-temps").textContent;
  const difficulte = document.getElementById("recette-difficulte").textContent;

  const ingredients = Array.from(document.querySelectorAll("#liste-ingredients li"))
    .map(li => "- " + li.textContent)
    .join("\n");

  const instructions = Array.from(document.querySelectorAll("#liste-instructions li"))
    .map((li, i) => `${i + 1}. ${li.textContent}`)
    .join("\n");

  let y = 10;
  doc.setFontSize(14);
  doc.text(`Recette : ${titre}`, 10, y); y += 10;
  doc.setFontSize(10);
  doc.text(`Catégorie : ${categorie}`, 10, y); y += 6;
  doc.text(`Temps : ${temps}`, 10, y); y += 6;
  doc.text(`Difficulté : ${difficulte}`, 10, y); y += 10;

  doc.setFontSize(12);
  doc.text("Ingrédients :", 10, y); y += 8;
  doc.setFontSize(10);
  doc.text(ingredients, 10, y); y += ingredients.split("\n").length * 6 + 6;

  doc.setFontSize(12);
  doc.text("Instructions :", 10, y); y += 8;
  doc.setFontSize(10);
  doc.text(instructions, 10, y);

  doc.save(`${titre}.pdf`);
}

function imprimerRecette() {
  const fiche = document.getElementById("fiche-recette");
  fiche.classList.remove("hidden");
  window.print();
}
>>>>>>> ce7601a1bece5d93709cca1cf0f35da5719ac0b1
