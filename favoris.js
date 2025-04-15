document.addEventListener("DOMContentLoaded", () => {
    const boutons = document.querySelectorAll(".ajouter-favori");
    boutons.forEach(btn => {
      btn.addEventListener("click", ajouterOuRetirerFavori);
    });
  
    afficherFavoris();
  });
  
  function ajouterOuRetirerFavori(event) {
    const bouton = event.target;
    const id = bouton.dataset.id;
    const titre = bouton.dataset.titre;
    const image = bouton.dataset.image;
  
    const recette = { id, titre, image };
  
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  
    const index = favoris.findIndex(r => r.id === id);
    if (index === -1) {
      favoris.push(recette);
    } else {
      favoris.splice(index, 1);
    }
  
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris();
  }
  
  function afficherFavoris() {
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    const container = document.getElementById("liste-favoris");
    const messageVide = document.getElementById("message-vide");
  
    if (!container) return;
  
    container.innerHTML = "";
  
    if (favoris.length === 0) {
      if (messageVide) messageVide.style.display = "block";
      return;
    } else {
      if (messageVide) messageVide.style.display = "none";
    }
  
    favoris.forEach(recette => {
      const div = document.createElement("div");
      div.className = "favori";
  
      div.innerHTML = `
        <h3><a href="recette.html?id=${recette.id}">${recette.titre}</a></h3>
        <img src="${recette.image}" alt="${recette.titre}" style="width: 150px;">
        <button class="retirer-favori">❌ Retirer</button>
      `;
  
      div.querySelector(".retirer-favori").addEventListener("click", () => {
        retirerFavori(recette.id);
      });
  
      container.appendChild(div);
    });
  }
  
  function retirerFavori(id) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris = favoris.filter(r => r.id !== id);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris();
  }