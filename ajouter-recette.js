function ajouterIngredient() {
    const div = document.getElementById("ingredients");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "ingredient";
    input.placeholder = "ex : 2 tomates";
    input.required = true;
    div.appendChild(input);
  }
  
  function ajouterEtape() {
    const div = document.getElementById("etapes");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "etape";
    input.placeholder = "ex : Couper les légumes";
    input.required = true;
    div.appendChild(input);
  }
  
  document.getElementById("form-recette").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const form = e.target;
    const recette = {
      id: Date.now(), // Génère un ID unique
      titre: form.titre.value,
      categorie: form.categorie.value || "Plat",
      personnes: parseInt(form.personnes.value) || 4,
      categorie: form.categorie.value,
      temps: form.temps.value,
      difficulte: form.difficulte.value,
      personnes: parseInt(form.personnes.value),
      image: form.image.value,
      ingredients: Array.from(form.querySelectorAll('input[name="ingredient"]')).map(input => input.value),
      etapes: Array.from(form.querySelectorAll('input[name="etape"]')).map(input => input.value)
    };
  
    // Sauvegarder dans localStorage
    const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
    recettes.push(recette);
    localStorage.setItem("recettesUser", JSON.stringify(recettes));
  
    alert("Recette enregistrée !");
    form.reset();
    document.getElementById("ingredients").innerHTML = `<input type="text" name="ingredient" required>`;
    document.getElementById("etapes").innerHTML = `<input type="text" name="etape" required>`;
  });

  const recettes = JSON.parse(localStorage.getItem("recettesUser")) || [];
recettes.forEach(r => {
  console.log(r.titre);
});