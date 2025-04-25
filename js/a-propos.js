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


//! ACCORDÉON 

const items = document.querySelectorAll('.accordion-item');

for (let i = 0; i < items.length; i++) {
  const header = items[i].querySelector('.accordion-header');

  header.addEventListener('click', function () {
    const isActive = items[i].classList.contains('active');

    // On désactive tous les items
    for (let j = 0; j < items.length; j++) {
      items[j].classList.remove('active');
    }

    // On active celui qui était cliqué s’il n’était pas déjà actif
    if (!isActive) {
      items[i].classList.add('active');
    }
  });
}

//! formulaire

document.querySelectorAll('.custom-form input, .custom-form textarea').forEach((field) => {
  field.addEventListener('input', () => {
    if (field.validity.valid) {
      field.style.borderColor = 'green'; // Bordure verte pour valide
      const errorMessage = field.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove(); // Supprimer le message d'erreur si valide
      }
    } else {
      field.style.borderColor = 'red'; // Bordure rouge pour invalide
      if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        if (field.id === 'email' && field.type === 'email') {
          errorMessage.textContent = '⚠️ Email invalide';
        } else if (field.id === 'name' && field.type === 'text') {
          errorMessage.textContent = '⚠️ Le nom est trop court';
        } else if (field.id === 'message') {
          errorMessage.textContent = '⚠️ Message trop court';
        }
        field.parentNode.appendChild(errorMessage);
      }
    }
  });
});

const form = document.querySelector('.custom-form');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Empêcher l'envoi pour validation

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  
  // Validation du champ nom
  if (nameField.value.length < 2) {
    alert('⚠️ Le nom est trop court');
    nameField.style.borderColor = 'red';
    return;
  }

  // Validation de l'email
  if (!emailField.value || !emailField.checkValidity()) {
    alert('⚠️ L\'email n\'est pas valide');
    emailField.style.borderColor = 'red';
    return;
  }

  // Validation du message
  if (messageField.value.length < 10) {
    alert('⚠️ Le message est trop court');
    messageField.style.borderColor = 'red';
    return;
  }

  // Si tout est valide, tu peux envoyer le formulaire ici
  alert('Formulaire envoyé avec succès ✅');
  form.reset(); // Réinitialiser le formulaire après soumission
});






// //! Modale


// let open = document.querySelector(".btn");
// let close = document.getElementById("btnX");
// let close1 = document.getElementById("btnY");
// let modale = document.querySelector(".modale");
// let info = document.querySelector(".modale1");
// let form = document.querySelector(".custom-form");

// open.addEventListener("click", function(event) {
//     event.preventDefault();

//     let inputs = form.querySelectorAll("input, textarea");
//     let isFormFilled = false;

//     inputs.forEach(function(input) {
//         if (input.value.trim() !== "") {
//             isFormFilled = true;
//         }
//     });

//     if (isFormFilled) {
//         modale.style.display = "block";
//     } else {
//       info.style.display="block"
//     }
    
// });

// close.addEventListener("click", function() {
//   modale.style.display = "none";
//   form.reset();
// });

// close1.addEventListener("click", function() {
//    info.style.display = "none";
// });

