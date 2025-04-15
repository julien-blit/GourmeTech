//montrer les recettes dispo

document.getElementById('recipe-select').addEventListener('change', function () {
  const selectedFile = this.value;
  const container = document.getElementById('recipe-container');
  container.innerHTML = ''; // Reset le contenu précédent

  if (selectedFile) {
    const req = new XMLHttpRequest();
    req.open('GET', selectedFile, true);

    req.onload = function () {
      if (req.status === 200) {
        const recettes = JSON.parse(req.responseText);

        recettes.forEach(service => {
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe');

          recipeDiv.innerHTML = `
            <img src="${service.image}" alt="${service.titre}" style="width: 300px; height: auto;" />
            <h2>${service.titre}</h2>
            <p><strong>Temps de préparation :</strong> ${service.temps}</p>
            <p><strong>Difficulté :</strong> ${service.difficulte}</p>
            <h3>Ingrédients :</h3>
            <ul>${service.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <h3>Instructions :</h3>
            <ol>${service.instructions.map(ins => `<li>${ins}</li>`).join('')}</ol>
          `;

          container.appendChild(recipeDiv);
        });
      } else {
        console.error('Erreur lors du chargement du fichier JSON');
        container.innerHTML = '<p>Impossible de charger la recette.</p>';
      }
    };

    req.send();
  }
});

// Bouton "Imprimer"
document.getElementById('print-button').addEventListener('click', function () {
  window.print();
});




// la première recette s'affiche par défau
// document.getElementById('recipe-select').value = 'tarte-pomme.json';
// document.getElementById('recipe-select').dispatchEvent(new Event('change'));

// -------------------------------------------------------------------

/* pour afficher seulement une recette a la fois 

// const req = new XMLHttpRequest();
// req.open('GET', 'tarte-pomme.json', true);

// req.onload = function () {
//   if (req.status === 200) {
//     const recettes = JSON.parse(req.responseText);
//     const container = document.getElementById('recipe-container');

//     recettes.forEach(service => {
//       const recipeDiv = document.createElement('div');
//       recipeDiv.classList.add('recipe');

//       recipeDiv.innerHTML = `
//         <img src="${service.image}" alt="${service.titre}" style="width: 300px; height: auto;" />
//         <h2>${service.titre}</h2>
//         <p><strong>Temps de préparation :</strong> ${service.temps}</p>
//         <p><strong>Difficulté :</strong> ${service.difficulte}</p>
//         <h3>Ingrédients :</h3>
//         <ul>${service.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
//         <h3>Instructions :</h3>
//         <ol>${service.instructions.map(ins => `<li>${ins}</li>`).join('')}</ol>
//       `;

//       container.appendChild(recipeDiv);
//     });
//   } else {
//     console.error('Erreur lors du chargement du fichier JSON');
//   }
// };

// req.send(); */