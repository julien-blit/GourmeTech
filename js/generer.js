//!  ===== navbar  ===== //

  const menuBtn = document.getElementById('btn');
const liens = document.getElementById('nav-links');

menuBtn.addEventListener('click', function() {
    liens.classList.toggle('show');
});


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


// ! Recuperation des infos //
// const mealId = '52772';

// fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//   .then(response => response.json())
//   .then(data => console.log(data.meals[0]))
//   .catch(err => console.error(err)); 


//! mise en place pour la page 

function loadRecette() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const repas = data.meals[0];

          // ! exporte l'image
          
        document.getElementById("recette-title").textContent = repas.strMeal;
document.getElementById("recette-origin").textContent = repas.strArea;
document.getElementById("recette-category").textContent = repas.strCategory;
        
        document.getElementById("recette-img").src = repas.strMealThumb;
          document.getElementById("recette-img").alt = repas.strMeal;

        // ! exporte  les instructions

        document.getElementById("instructions").textContent = repas.strInstructions;

        
        const ingredientsList = document.getElementById("ingredients-list");
        ingredientsList.innerHTML = "";

        // !  importer  les ingrédients  ATTENTION LE TABLEAU EST DE 20 INGREDIENS 

        for (let i = 1; i <= 20; i++) {
          const ingredient = repas[`strIngredient${i}`];
          const quantité = repas[`strMeasure${i}`];
          if (ingredient && ingredient !== "") {
            const li = document.createElement("li");
            li.textContent = `${quantité } ${ingredient}`;
            ingredientsList.appendChild(li);
          }
        }
      })
  }

  // ! Charger une recette au lancement
  loadRecette();

  //!  Recharger une recette quand on clique sur le bouton
  document.getElementById("new-recette-btn").addEventListener("click", loadRecette);



//? partager la recette
  

const titreEl = document.querySelector("#recette-title");
const articlesEl = document.querySelector("#ingredients-list");
const prepaEl = document.querySelector("#instructions");

const btnshare = document.getElementById("partage");

btnshare.addEventListener("click", function () {
   const titre = titreEl.textContent;
  const articles = articlesEl.textContent;
  const prepa = prepaEl.textContent;

  const recetteText = `Titre : ${titre}\nIngrédients : ${articles}\nPréparation : ${prepa}`;
  
  if (navigator.share) {
  navigator.share({
    title:document.title,
    text: "regarde cette recette",
    url: "https://julien-blit.github.io/GourmeTech/generer.html"
  })
  
}
})