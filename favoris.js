document.addEventListener("DOMContentLoaded", () => {
  initialiserFavoris();
});

function initialiserFavoris() {
  const boutons = document.querySelectorAll(".ajouter-favori");
  boutons.forEach(btn =>
    btn.addEventListener("click", ajouterOuRetirerFavori)
  );
  afficherFavoris();
}

function getFavoris() {
  return JSON.parse(localStorage.getItem("favoris")) || [];
}

function setFavoris(favoris) {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

function ajouterOuRetirerFavori(e) {
  const btn = e.currentTarget;
  const recette = {
    id: btn.dataset.id,
    titre: btn.dataset.titre,
    image: btn.dataset.image
  };

  let favoris = getFavoris();
  const index = favoris.findIndex(r => r.id === recette.id);

  if (index === -1) {
    favoris.push(recette);
  } else {
    favoris.splice(index, 1);
  }

  setFavoris(favoris);
  afficherFavoris();
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
    div.querySelector(".retirer-favori").addEventListener("click", () => {
      retirerFavori(id);
    });
    container.appendChild(div);
  });
}

function retirerFavori(id) {
  const favoris = getFavoris().filter(r => r.id !== id);
  setFavoris(favoris);
  afficherFavoris();
}