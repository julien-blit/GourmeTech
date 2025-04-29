document.addEventListener("DOMContentLoaded", () => {
    const heartIcons = document.querySelectorAll(".coeur"); // Cibler tous les cœurs
    const recipes = document.querySelectorAll(".card"); // Cibler toutes les cartes de recettes
  
    // Charger les favoris depuis le localStorage
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      heartIcons.forEach((heart, index) => {
        if (favorites.includes(index)) {
          heart.textContent = "❤️"; // Coeur rempli si recette est favorite
        } else {
          heart.textContent = "🤍"; // Coeur vide si recette n'est pas favorite
        }
      });
  };
 
    // Sauvegarder les favoris dans le localStorage
    const saveFavorites = (favorites) => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    };
  
    // Ajouter ou retirer une recette des favoris au clic
    heartIcons.forEach((heart, index) => {
      heart.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        if (favorites.includes(index)) {
          // Si déjà dans les favoris, retirer
          favorites = favorites.filter(item => item !== index);
          heart.textContent = "🤍"; // Coeur vide
        } else {
          // Si pas encore dans les favoris, ajouter
          favorites.push(index);
          heart.textContent = "❤️"; // Coeur rempli
        }
        
        // Sauvegarder la liste mise à jour des favoris
        saveFavorites(favorites);
      });
    });
  
    // Charger les favoris lorsque la page est prête
    loadFavorites();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-container");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    const allRecipes = [
    {
      title: "Tarte aux pommes",
      image: "assets/images/tarte-pommes.jpg",
      url: "recette.html#tarte-pommes",
      description: "Dessert facile, préparation 60 min.",
      difficulty: "Facile",  
      temps: "60 min",
      categorie: "Dessert",
      ingredients: "4 pommes,1 pâte feuilletée, 50g de sucre, 20g de beurre,1 sachet de sucre vanillé"
    },
    {
      title: "Ratatouille Provençale",
      image: "assets/images/ratatouille.jpg",
      url: "recette.html#ratatouille",
      description: "Plat moyen, préparation 60 min.",    
      difficulty: "Moyen", 
      temps: "60 min",
      categorie : "Plat",
      ingredients: "2 aubergines, 2 courgettes, 2 poivrons (rouge et vert), 4 tomates, 2 oignons,2 gousses d’ail"
    },
    {
      title: "Velouté de potiron",
      image: "assets/images/veloute-potiron.jpg",
      url: "recette.html#veloute-potiron",
      description: "Facile, préparation 30 min.",
      difficulty: "Facile",
      temps: "30 min",
      categorie : "Entrée",
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
      favoritesContainer.innerHTML = ""; // Vider l'affichage
      favorites.forEach(index => {
        const recipe = allRecipes[index];
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("card");
        recipeCard.dataset.index = index;
        recipeCard.innerHTML = `
          <div class="img-container">
            <span class="coeur">❤️</span>
            <img src="${recipe.image}" alt="${recipe.title}" class="card-img" />
          </div>
          <h2 class="recipe-title">${recipe.title}</h2>     
          <div class="card-content">
            <p class="type">${recipe.categorie}</p>
            <p class="duration">${recipe.temps}</p>
            <p class="difficulty">${recipe.difficulty}</p>
          </div>
          <div class="container">
            <button class="btn" data-recipe-id="${index}">Voir la recette</button>
          </div>`;
        favoritesContainer.appendChild(recipeCard);
      });
  
      // Réassigner les événements clics
      document.querySelectorAll(".coeur").forEach((heart) => {
        heart.addEventListener("click", (e) => {
          const card = e.target.closest(".card");
          const index = parseInt(card.dataset.index);
          favorites = favorites.filter(fav => fav !== index);
          saveFavorites(favorites);
          renderFavorites(); // Re-render
        
          showLoader(); // Affiche le loader
          setTimeout(() => {
            renderFavorites(); // Simule un délai pour le chargement
            hideLoader(); // Cache le loader une fois terminé
          }, 1000); // Simule un délai de chargement (1 seconde)
  
        });
      });
  
      document.querySelectorAll(".btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const recipeId = parseInt(e.target.getAttribute("data-recipe-id"));
          const recipe = allRecipes[recipeId];
          showRecipeDetails(recipe);
        });
      });
    };
  
    renderFavorites();
    showLoader(); // Affiche le loader
  
  setTimeout(() => {
    renderFavorites(); // Simule un délai pour le chargement
    hideLoader(); // Cache le loader une fois terminé
  }, 1000); // Simule un délai de chargement (1 seconde)
  });
  
  // Fonction pour afficher les détails de la recette dans un div
  function showRecipeDetails(recipe) {
    const detailsDiv = document.getElementById("recipe-details");
    const title = document.getElementById("recipe-title");
    const image = document.getElementById("recipe-image");
    const description = document.getElementById("recipe-description");
    const ingredients = document.getElementById("recipe-ingredients");
  
    // Remplir le div avec les détails de la recette
    title.textContent = recipe.title;
    image.src = recipe.image;
    image.alt = recipe.title;
    description.textContent = recipe.description;
    ingredients.textContent = recipe.ingredients;
  
    // Afficher le div
    detailsDiv.style.display = "flex";
  }
  
  // Fonction pour fermer le div des détails
  function closeRecipeDetails() {
    const detailsDiv = document.getElementById("recipe-details");
    detailsDiv.style.display = "none";
  }
  
    document.addEventListener("DOMContentLoaded", () => {
      const searchInput = document.querySelector(".search-input");
      const filterInputs = document.querySelectorAll(".filter-container input");
      const noResultDiv = document.querySelector(".no-result");
    
      function normalizeText(text) {
        return text.toLowerCase().trim();
      }
    
      function applyFilters() {
      const query = normalizeText(searchInput.value);
      const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked")).map(cb => cb.value);
      const selectedTimes = Array.from(document.querySelectorAll("input[name='time']:checked")).map(cb => cb.value);
      const selectedDifficulties = Array.from(document.querySelectorAll("input[name='difficulty']:checked")).map(cb => cb.value);
      let anyVisible = false;
    
      document.querySelectorAll("#favorites-container .card").forEach(card => {
      const title = normalizeText(card.querySelector(".recipe-title").textContent);
      const category = normalizeText(card.querySelector(".type").textContent);
      const duration = card.querySelector(".duration").textContent;
      const difficulty = normalizeText(card.querySelector(".difficulty").textContent);
  
      let durationValue = parseInt(duration);
      let matchesQuery = title.includes(query);
      let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      let matchesTime = selectedTimes.length === 0 || selectedTimes.some(time => {
        if (time === "-15") return durationValue < 15;
        if (time === "15-30") return durationValue >= 15 && durationValue <= 30;
        if (time === "+30") return durationValue > 30;
      });
      let matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.map(d => d.toLowerCase()).includes(difficulty);
  
      if (matchesQuery && matchesCategory && matchesTime && matchesDifficulty) {
      card.style.display = "";
      anyVisible = true;
      } else {
        card.style.display = "none";
      }
      });
  
    noResultDiv.style.display = anyVisible ? "none" : "block";
  }
    
      // Attacher les événements
      searchInput.addEventListener("input", applyFilters);
      filterInputs.forEach(input => input.addEventListener("change", applyFilters));
});