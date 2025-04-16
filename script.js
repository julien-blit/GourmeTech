 
// ! Mode Dark //

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

//! navbar //

  const menuBtn = document.getElementById('btn');
const liens = document.getElementById('nav-links');

menuBtn.addEventListener('click', function() {
    liens.classList.toggle('show');
});


//! like //

const coeurs = document.querySelectorAll(".coeur");

coeurs.forEach((coeur) => {
  coeur.addEventListener("click", () => {
    coeur.classList.toggle("active");
    coeur.textContent = coeur.classList.contains("active") ? "❤️" : "🤍";
  });
});

//! search //

// ? Recharge les filtres depuis le localStorage

// function restoreFilters() {
//   const savedFilters = JSON.parse(localStorage.getItem("searchFilters"));
//   if (!savedFilters) return;

//   document.querySelector('.search-input').value = savedFilters.search || '';

//   document.querySelectorAll('input[type="checkbox"]').forEach(input => {
//     input.checked = savedFilters.checked.includes(input.value);
//   });

//   filterCards();
// }

function normalizeText(text) {
  return text.trim().toLowerCase();
}

function matchTime(filtreTime, selectTimes) {
  if (selectTimes.length === 0) return true;
  const time = parseInt(filtreTime);
  return selectTimes.some(val => {
    if (val === "-15") return time <= 15;
    if (val === "15-30") return time > 15 && time <= 30;
    if (val === "+30") return time > 30;
    return false;
  });
}

// ? Fonction de filtrage

function filterCards() {
  const Text = normalizeText(document.querySelector('.search-input').value);
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(c => normalizeText(c.value));
  const selectedTimes = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(c => c.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(c => normalizeText(c.value));

  // ? Enregistrement des filtres

  const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value);
  localStorage.setItem("searchFilters", JSON.stringify({ search: Text, checked: checkedValues }));

  const cards = document.querySelectorAll('.card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = normalizeText(card.querySelector('.recipe-title').textContent);
    const category = normalizeText(card.querySelector('.type').textContent);
    const timeText = card.querySelector('.duration').textContent.replace(/\D/g, ''); 
    const difficulty = normalizeText(card.querySelector('.difficulty').textContent);

    // ? Vérification des filtres

    const matchesSearch = title.includes(Text);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesTime = matchTime(timeText, selectedTimes);
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(difficulty);

    // ? Affichage ou masquage des cartes

    if (matchesSearch && matchesCategory && matchesTime && matchesDifficulty) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // ? Afficher le message "Aucune recette trouvée"

  const noResult = document.querySelector('.no-result');
  if (visibleCount === 0) {
    noResult.style.display = 'block';
  } else {
    noResult.style.display = 'none';
  }
}


document.querySelector('.search-button').addEventListener('click', function (e) {
  e.preventDefault();
  filterCards();
});


window.addEventListener('DOMContentLoaded', () => {
  restoreFilters();
  filterCards(); 
});

