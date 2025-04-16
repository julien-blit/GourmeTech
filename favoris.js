document.addEventListener("DOMContentLoaded", () => {
  afficherFavoris();
});

function getFavoris() {
  return JSON.parse(localStorage.getItem("recettesFavoris")) || [];
}

function setFavoris(favoris) {
  localStorage.setItem("recettesFavoris", JSON.stringify(favoris));
}

function afficherFavoris() {
  const container = document.getElementById("liste-favoris");
  const messageVide = document.getElementById("message-vide");
  if (!container) return;

  const favoris = getFavoris();
  container.innerHTML = "";

  if (favoris.length === 0) {
    if (messageVide) messageVide.style.display = "block";
    return;
  }

  if (messageVide) messageVide.style.display = "none";

  favoris.forEach(({ id, titre, image }) => {
    const div = document.createElement("div");
    div.className = "favori";
    div.innerHTML = `
      <h3><a href="recette.html?id=${id}">${titre}</a></h3>
      <img src="${image}" alt="${titre}" style="width: 150px;">
      <button class="retirer-favori">❌ Retirer</button>
    `;

    // Supprimer ce favori au clic
    div.querySelector(".retirer-favori").addEventListener("click", () => {
      retirerFavori(id);
    });

    container.appendChild(div);
  });
}

function retirerFavori(id) {
  const nouveauxFavoris = getFavoris().filter(r => r.id !== id);
  setFavoris(nouveauxFavoris);
  afficherFavoris();
}