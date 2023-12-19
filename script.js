// DOM Générateur d'analogies + triangles + liens pour idSuivant //

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("analogies");
  const modal = document.getElementById("modalMentionLegale");
  const btnOpenModal = document.getElementById("btnMentionLegale");
  const spanCloseModal = document.querySelector(".close");


  // Bouton mention légale

  btnOpenModal.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.classList.add('body-no-scroll');
  });

  spanCloseModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('body-no-scroll');
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove('body-no-scroll');
    }
  });
  modal.addEventListener("click", (e) => {
    e.stopPropagation(); // Empêche de cliquer en dehors de la fenêtre pour fermer la section
  });

  // Bouton remonter haut de page
  var htmlElement = document.documentElement;
  var btnRemonterHaut = document.getElementById("btnRemonterHaut");

  //définition de la fonction topbouton
  function topbouton() {
    // action au scroll
    var scrollTotal = htmlElement.scrollHeight - htmlElement.clientHeight;

    //si la hauteur de la page a dépassé 4 sections (4 scrolls)
    if (htmlElement.scrollTop / scrollTotal > 0.4) {
      // le bouton apparaît
      btnRemonterHaut.classList.add("showBtn");
    } else {
      // le bouton disparait
      btnRemonterHaut.classList.remove("showBtn");
    }
  }

  //définition de la fonction qui scroll au haut de la page (top:0) de manière fluide
  function scrollToTop() {
    htmlElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  btnRemonterHaut.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", topbouton);

  // Affichage des sections répertorié dans le data
  fetch('data.json').then(function (response) {
    response.json().then(function (data) {
      function ajouteanal(item) {
        item.forEach(function (item, i) {
          const idSuivant = i < data.length - 1 ? data[i + 1].id : "formulaire";

          //déclaration de la variable à laquelle on crée une section pour chaque case du tableau
          var analogie = document.createElement("section");
          analogie.setAttribute("id", item.id);

          //ajouter chaque section au html, dans notre liste d'analogies
          analogie.innerHTML =
            '<article class="bloc">' +
            '<h4>Si j\'étais ' + item.analogies + ', je serais ' + item.valeurAnalogies + '</h4>' +
            '<p>' + item.text + '</p>' +
            '<div class="triangle_container">' +
            '<a href="#' + idSuivant + '"title="analogiesuivante"><img class="triangle" src="img/triangle.png" alt="triangle"></a>' +
            '</div>' +
            '</article>' +
            '<div class="img-desc" style="background-image:url(' + item.url + ')"></div>';
          //ajouter cette liste à notre container ou div id="analogies"
          container.append(analogie);
        });
      }
      ajouteanal(data)
    })
  })


  // Création nouvelle section 
  console.log(document.querySelector("#valider"))
  document.querySelector("#valider").addEventListener("click", function (e) {

    // condition si le formulaire est vide empeche l'envoi
    if (document.querySelector("#analogie").value === "" || document.querySelector("#valeur").value === "" || document.querySelector("#desc").value === "" || document.querySelector("#URL").value === "" || document.querySelector("#email").value === "") {
      return false;
    } else {
      e.preventDefault();
      document.querySelector("#customAnalogie").innerHTML += `<section id="`
        + `"><article class="bloc"><h4>Si j\'étais `
        + document.querySelector("#analogie").value
        + ', je serai ' + '' + document.querySelector("#valeur").value
        + '</h4><p>'
        + document.querySelector("#desc").value + '</p></article><div class="img-desc" style="background-image:url('
        + document.querySelector("#URL").value + ')"></div>';
    }

    //API, pour envoyer les données entrées dans le formulaire dans la base données de philippe gambette
    fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=alexandre.ghmir&courriel=" + document.querySelector("#email").value + "&message=Si j'étais " + document.querySelector("#analogie").value + ", je serais " + document.querySelector("#valeur").value + " Parce que " + document.querySelector("#desc").value + " Image : " + document.querySelector("#URL").value).then(function (response) {
      //   //génération du message d'erreur ou de succès
      response.json().then(function (data) {
        if (data.status == "success") {
          document.getElementById("success").innerHTML = "Votre analogie a bien été ajoutée!";
        } else {
          document.getElementById("success").innerHTML = "Il y'a un problème, réessayez.";
        }
      })
    })
  })
}
);