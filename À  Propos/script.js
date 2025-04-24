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

