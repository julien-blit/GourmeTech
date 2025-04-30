document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const allRecipes = [
    {
      title: "Tarte aux pommes",
      image: "assets/images/tarte-pommes.jpg",
      description: "Dessert facile, préparation 60 min.",
      difficulty: "Facile",
      temps: "60 min",
      categorie: "Dessert",
      ingredients: "4 pommes,1 pâte feuilletée, 50g de sucre, 20g de beurre,1 sachet de sucre vanillé"
    },
    {
      title: "Ratatouille Provençale",
      image: "assets/images/ratatouille.jpg",
      description: "Plat moyen, préparation 60 min.",
      difficulty: "Moyen",
      temps: "60 min",
      categorie: "Plat",
      ingredients: "2 aubergines, 2 courgettes, 2 poivrons (rouge et vert), 4 tomates, 2 oignons,2 gousses d’ail"
    },
    {
      title: "Velouté de potiron",
      image: "assets/images/veloute-potiron.jpg",
      description: "Facile, préparation 30 min.",
      difficulty: "Facile",
      temps: "30 min",
      categorie: "Entrée",
      ingredients: "1 kg de potiron, 2 pommes de terre, 1 oignon, 1 cube de bouillon, 20 cl de crème, Sel, poivre"
    }
  ];

  const saveFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const showLoader = () => {
    document.getElementById("loader").style.display = "flex";
  };

  const hideLoader = () => {
    document.getElementById("loader").style.display = "none";
  };

  const renderFavorites = () => {
    favoritesContainer.innerHTML = "";
    favorites.forEach(index => {
      const recipe = allRecipes[index];
      if (!recipe) return;

      const recipeCard = document.createElement("div");
      recipeCard.classList.add("card");
      recipeCard.dataset.index = index;
      recipeCard.innerHTML = `
        <div class="img-container">
          <span class="coeur">❤️</span>
          <img src="${recipe.image}" alt="${recipe.title}" class="card-img">
        </div>
        <h2 class="recipe-title">${recipe.title}</h2>     
        <div class="card-content">
          <p class="type">${recipe.categorie}</p>
          <p class="duration">${recipe.temps}</p>
          <p class="difficulty">${recipe.difficulty}</p>
        </div>
        <div class="container">
          <button class="btn reading-mode-trigger" data-recipe-id="${index}">Voir la recette</button>
        </div>`;
      favoritesContainer.appendChild(recipeCard);
    });



    document.querySelectorAll(".coeur").forEach((heart) => {
      heart.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        const index = parseInt(card.dataset.index);
        favorites = favorites.filter(fav => fav !== index);
        saveFavorites(favorites);
        renderFavorites();
        showLoader();
        setTimeout(() => {
          hideLoader();
        }, 1000);
      });
    });

    document.querySelectorAll(".reading-mode-trigger").forEach((button) => {
      button.addEventListener("click", (e) => {
        const recipeId = parseInt(e.target.getAttribute("data-recipe-id"));
        const recipe = allRecipes[recipeId];

        if (!recipe) {
          console.warn("Recette introuvable pour l'ID :", recipeId);
          return;
        }

        showRecipeDetails(recipe);
      });
    });
  };

  renderFavorites();
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 1000);

  const readingModeButton = document.getElementById("reading-mode-button");
  if (readingModeButton) {
    readingModeButton.addEventListener("click", toggleReadingMode);
  }

  document.getElementById("reading-mode-button").addEventListener("click", toggleReadingMode);
});

// Afficher les détails d'une recette
function showRecipeDetails(recipe) {
  const detailsDiv = document.getElementById("recipe-details");
  const title = document.getElementById("recipe-title");
  const image = document.getElementById("recipe-image");
  const description = document.getElementById("recipe-description");
  const ingredients = document.getElementById("recipe-ingredients");
  const temps = document.getElementById("recipe-temps");

  if (!recipe) return;

  title.textContent = recipe.title;
  image.src = recipe.image;
  image.alt = recipe.title;
  description.textContent = `Instructions : ${recipe.description}`;
  ingredients.textContent = `Ingrédients : ${recipe.ingredients}`;
  temps.textContent = `Temps de préparation : ${recipe.temps}`;

  detailsDiv.style.display = "flex";

}

// Fermer les détails
function closeRecipeDetails() {
  const detailsDiv = document.getElementById("recipe-details");
  detailsDiv.style.display = "none";
  // Sortie du mode lecture s'il est actif
  if (detailsDiv.classList.contains("reading-mode")) {
    toggleReadingMode();
  }
}

// Mode lecture
function toggleReadingMode() {
  console.log('Mode Lecture activé/désactivé');

  const recipeDetails = document.getElementById("recipe-details");
  const readingBtn = document.getElementById("reading-mode-button");

  if (!recipeDetails) return;

  // Cacher/afficher les éléments en fonction du mode
  const elementsToHide = [
    document.querySelector("header"),
    document.querySelector(".general"),
    document.querySelector("footer"),
    document.querySelector(".main-content")
  ];

  // Vérifier si le mode lecture est déjà activé
  const isReadingMode = recipeDetails.classList.contains("reading-mode");

  // Cacher les éléments si mode lecture activé
  elementsToHide.forEach(el => {
    if (el && el !== recipeDetails) {
      el.style.display = isReadingMode ? "" : "none"; // Cacher ou afficher les éléments
    }
  });

  // Basculer la classe 'reading-mode' sur le détail de la recette
  recipeDetails.classList.toggle("reading-mode");

  // Changer le texte du bouton
  if (readingBtn) {
    readingBtn.textContent = isReadingMode ? "Mode Lecture" : "Quitter le mode lecture";
  }
}