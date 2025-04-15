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

