 // ! Mode Darck //

const toggleBtn = document.getElementById('dark-mode-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Change l’emoji selon le thème
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
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


function restoreFilters() {
  const savedFilters = JSON.parse(localStorage.getItem("searchFilters"));
  if (!savedFilters) return;

  document.querySelector('.search-input').value = savedFilters.search || '';

  document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = savedFilters.checked.includes(input.value);
  });
}


function normalizeText(text) {
  return text.trim().toLowerCase();
}

function matchTime(recipeTime, selectedTimes) {
  if (selectedTimes.length === 0) return true;
  const time = parseInt(recipeTime);
  return selectedTimes.some(val => {
    if (val === "-15") return time <= 15;
    if (val === "15-30") return time > 15 && time <= 30;
    if (val === "+30") return time > 30;
    return false;
  });
}


function filterCards() {
  const searchText = normalizeText(document.querySelector('.search-input').value);
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(c => normalizeText(c.value));
  const selectedTimes = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(c => c.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(c => normalizeText(c.value));


  const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value);
  localStorage.setItem("searchFilters", JSON.stringify({ search: searchText, checked: checkedValues }));

  const cards = document.querySelectorAll('.card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = normalizeText(card.querySelector('.recipe-title').textContent);
    const category = normalizeText(card.querySelector('.type').textContent);
    const timeText = card.querySelector('.duration').textContent.replace(/\D/g, '');
    const difficulty = normalizeText(card.querySelector('.difficulty').textContent);

    const matchesSearch = title.includes(searchText);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesTime = matchTime(timeText, selectedTimes);
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(difficulty);

    if (matchesSearch && matchesCategory && matchesTime && matchesDifficulty) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // 👀 Afficher ou cacher le message "aucune recette"
  const noResult = document.querySelector('.no-result');
  if (visibleCount === 0) {
    noResult.style.display = 'block';
  } else {
    noResult.style.display = 'none';
  }
}

// 👂 Clic sur le bouton "Rechercher"
document.querySelector('.search-button').addEventListener('click', function (e) {
  e.preventDefault();
  filterCards();
});

// 🔁 Restaurer les filtres au chargement
window.addEventListener('DOMContentLoaded', () => {
  restoreFilters();
  filterCards(); // pour afficher les bonnes cartes au démarrage
});