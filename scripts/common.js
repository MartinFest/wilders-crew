// document.addEventListener("DOMContentLoaded", function () {
// const headHtmlContent = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;700&family=Lato:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="./styles/icomoon/style.css"><link rel="stylesheet" href="./styles/grid.css"><link rel="stylesheet" href="./styles/base.css">';

// document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend', headHtmlContent);
// });

// document.addEventListener("DOMContentLoaded", function() {
//     // Créez un élément <link> pour chaque feuille de style à ajouter
//     let cssFolder = "./styles/icomoon/";
//     let style1 = document.createElement('link');
//     style1.rel = 'stylesheet';
//     style1.href = cssFolder + 'icomoon/style.css';

//     let style2 = document.createElement('link');
//     style2.rel = 'stylesheet';
//     style2.href = cssFolder + 'grid.css';

//     let style3 = document.createElement('link');
//     style2.rel = 'stylesheet';
//     style2.href = cssFolder + 'base.css';

//     let style4 = document.createElement('link');
//     style2.rel = 'stylesheet';
//     style2.href = cssFolder + 'home.css';

//     // Sélectionnez le <head> de la page
//     var head = document.getElementsByTagName('head')[0];


//     // Ajoutez les éléments créés au <head>
//     head.appendChild(style1);
//     head.appendChild(style2);
//     head.appendChild(style3);
//     head.appendChild(style4);
// });


//--------URL pour insertion de script dans sous repertoire ----------
// Récupérer l'URL actuelle de la page
let currentURL = window.location.href;
//  le sous-répertoire souhaité
let sousRepertoire = "/developpeur-web/";
let urlFile = "./"

// si l'URL actuelle contient le sous-répertoire
if (currentURL.includes(sousRepertoire)) {
    urlFile = "..";
    console.log("URL  :", urlFile);
} else {
    urlFile = ".";
    console.log("L'URL de la page ne se trouve pas dans le sous-répertoire spécifié.");
}



// Fonction pour inclure un fichier
function includeHTML(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            let container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
                // container.appendChild(htmlElement);
            } else {
                console.error("Container avec id '" + containerId + "' non trouvé.");
            }
        })
        .catch(error => console.error("Une erreur s'est produite lors du chargement du fichier HTML", error));
}


// Inclure les fichiers suivants
includeHTML(urlFile + "/includes/navbar.html", "header");
includeHTML(urlFile + "/includes/footer.html", "footer");


// pour Afficher les profils utilisateurs
document.addEventListener("DOMContentLoaded", function () {
    // Vérifie si la classe spécifique est présente sur le body
    if (document.body.classList.contains('display-profils')) {

        fetch(urlFile + '/scripts/wilders-profil.json') // Récupère le fichier JSON
            .then(response => response.json()) // Convertit la réponse en objet JSON
            .then(data => {
                // Traite les données
                data.forEach(profile => {

                    // console.log(profile.lastname);
                    //si photo pas personnalisée 
                    if (profile.picture === "#") {
                        //on insérer une image par défaut
                        profile.picture = "https://ca.slack-edge.com/T6SG2QGG2-U06LZ0G6996-g674f15ea47f-512";
                    }

                    const listingProfile = document.querySelector('#listing-profile');

                    function returnProfile(display) {

                        let displayType = display;

                        // Crée un élément de liste pour chaque profil
                        const profileContainer = document.createElement(displayType);
                        // si le paramètre appelé est une div donc c'est un carousel on ajoute la class sur la div
                        if (displayType === "div") {
                            profileContainer.classList.add("vjslider__slide");
                        }

                        // Création du lien
                        const profileLink = document.createElement('a');
                        profileLink.classList.add("profile");
                        let profileLinkUrl = `${urlFile}/developpeur-web/${profile.firstname}-${profile.id}.html`;

                        profileLink.href = profileLinkUrl.toLowerCase();
                        const profileListLink = profileContainer.appendChild(profileLink);

                        //on rempli l'élément
                        profileLink.innerHTML = `<img src="${profile.picture} " alt="${profile.firstname} ${profile.lastname} ">`;
                        profileLink.innerHTML += `<span class="profile-name"> ${profile.firstname} ${profile.lastname}</span>`;

                        //on ajoute chaque liste au conteneur
                        listingProfile.appendChild(profileContainer);

                    }

                    //si sur la page c'est un diaporama qui est demandé
                    if (listingProfile.classList.contains("vjslider__slider")) {
                        returnProfile("div");
                        //puis on ajoute le script carousel aprés l'exécution de ce script
                        const scriptCarousel = document.createElement("script");
                        scriptCarousel.src = urlFile + "/node_modules/vjslider/dist/vjslider.js";
                        document.body.appendChild(scriptCarousel);
                    } else {
                        returnProfile("li");
                    }


                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération du fichier JSON:', error);
            });
    } else {
        console.log("La classe 'display-profils' n'est pas présente sur le body. Le chargement des profils ne sera pas effectué.");
    }
});
