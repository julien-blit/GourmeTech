 
// !  ===== Mode Dark  ===== //

let theme = localStorage.getItem("theme");


if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById('dark-mode-toggle').textContent = "☀️";  
} else { document.getElementById('dark-mode-toggle').textContent = "🌙"; 
}
let toggleBtn = document.querySelector("#dark-mode-toggle");
toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";  
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";  
    }
});

//!  ===== navbar  ===== //

  const menuBtn = document.getElementById('btn');
const liens = document.getElementById('nav-links');

menuBtn.addEventListener('click', function() {
    liens.classList.toggle('show');
});



//!  ===== Like  ===== //
const coeurs = document.querySelectorAll(".coeur");

// Récupérer les favoris existants une fois pour tous
let favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

// Initialisation : colorer les cœurs qui sont déjà en favoris
coeurs.forEach((coeur) => {
  const card = coeur.closest('.card');
  const title = card.querySelector(".recipe-title").textContent;

  const isFavorite = favorites.some(r => r.title === title);
  if (isFavorite) {
    coeur.classList.add("active");
    coeur.textContent = "❤️";
  } else {
    coeur.classList.remove("active");
    coeur.textContent = "🤍";
  }
});


coeurs.forEach((coeur) => {
  coeur.addEventListener("click", () => {
    const card = coeur.closest('.card');
    const imageSrc = card.querySelector(".card-img").src;
    const title = card.querySelector(".recipe-title").textContent;
    const type = card.querySelector(".type").textContent;
    const duration = card.querySelector(".duration").textContent;
    const difficulty = card.querySelector(".difficulty").textContent;

    const recipe = {
      imageSrc,
      title,
      type,
      duration,
      difficulty
    };

    //!  Vérifie si la recette est déjà dans les favoris
    
    const index = favorites.findIndex(r => r.title === recipe.title);

    if (index !== -1) {

      //!  Déjà en favoris, on retire

      favorites.splice(index, 1);
      coeur.classList.remove("active");
      coeur.textContent = "🤍";
    } else {

      //!  Pas encore en favoris, on ajoute

      favorites.push(recipe);
      coeur.classList.add("active");
      coeur.textContent = "❤️";
    }

    //!  Met à jour le localStorage

    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
  });
});

//!  ===== search  ===== //

document.querySelector('.search-button').addEventListener('click', () => {
  const searchText = document.querySelector('.search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  const noResult = document.querySelector('.no-result'); 


 


  //!  ===== Récupération des filtres cochés =====//
  
  const Checked = (name) =>                            // ? recuperation en liste 
    Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);  // ? Array. transformation en tableau + .map  parcour chaque element extrais de la valeur 

  
 //!  ===== Récupération des filtres  ===== //
  
  const selectedCategories = Checked('category');
  const selectedTimes = Checked('time');
  const selectedDifficulties = Checked('difficulty');

  //! ===== compte le nombre de card trouvées  ===== //

  let result = 0;

  //! ===== recuperation des infos de chaque carte =====//

  cards.forEach(card => {
    const title = card.querySelector('.recipe-title').textContent.toLowerCase();
    const type = card.querySelector('.type').textContent.toLowerCase();
    const duration = card.querySelector('.duration').textContent;
    const difficulty = card.querySelector('.difficulty').textContent;

    const verifText = title.includes(searchText);
    const verifCategory = selectedCategories.length ? selectedCategories.includes(type) : true;


    //!  ===== passé temps => minute  =====//

    const minutes = parseInt(duration);
    let time = '';
    if (minutes < 15) time = '-15';
    else if (minutes <= 30) time = '15-30';
    else time = '+30';

    const verifTime = selectedTimes.length ? selectedTimes.includes(time) : true;
    const verifDifficulty = selectedDifficulties.length ? selectedDifficulties.includes(difficulty) : true;

    //!  ===== affiche les card rechercher ===== //

    if (verifText && verifCategory && verifTime && verifDifficulty) {
      card.style.display = 'block';
      result++;
    } else {
      card.style.display = 'none';
    }
  });

  //! ===== Affiche le message "Aucune recette trouvée 😢"  ===== //
  
  noResult.style.display = result === 0 ? 'block' : 'none';
});

//! ===== etoiles ===== //

document.querySelectorAll('.notation').forEach((notation, notationIndex) => {
  const stars = notation.querySelectorAll('.star');
  const storageKey = `notation-${notationIndex}`;

  // ! Recharger la note sauvegardée

  const savedNote = parseInt(localStorage.getItem(storageKey));
  if (!isNaN(savedNote)) {
    for (let i = 0; i < savedNote; i++) {
      stars[i].classList.add('selected');
    }
    notation.setAttribute('data-notation', savedNote);
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('selected'));

      //!  Ajouter les étoiles sélectionnées

      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('selected');
      }

      //! Récupérer la note 
      const note = index + 0;

      // !  Sauvegarder la note

      localStorage.setItem(storageKey, note);
      notation.setAttribute('data-notation', note);
      console.log("Note donnée :", note);
    });
  });
});



