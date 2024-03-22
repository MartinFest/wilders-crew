
// Inclure les fichiers suivants
includeHTML(urlFile + "/includes/profil-template.html", "profil-container");



// pour Afficher les profils utilisateurs
document.addEventListener("DOMContentLoaded", function () {

    fetch('../scripts/wilders-profil.json') // Récupère le fichier JSON
        .then(response => response.json()) // Convertit la réponse en objet JSON
        .then(data => {
            // Traite les données
            data.forEach(profile => {

                //modifier l'url des liens du header 
                //quand on est dans une page qui est dans un sous dossier
                const navbar = document.querySelector('.navbar');
                const navbarLink2 = navbar.querySelectorAll('.nav-link');
                // navbarLink.href = prepend(urlFile);
                // console.log("navbarLink  " + navbarLink);

                // Get all the link elements by their common class
                const navbarLinks = navbar.getElementsByClassName('.nav-link');

                // Prepend a string to the URLs of all links
                for (let i = 0; i < navbarLinks.length; i++) {
                    let originalUrl = navbarLinks[i].href;
                    let newUrl = "../" + originalUrl;
                    navbarLinks[i].href = newUrl;
                }
                console.log("urlFile " + urlFile);
                
                // for(const property in navbarLink){
                //     console.log(`coucou ${property}: ${navbarLink[property]}`);

                // for(let i = 0; i < navbarLink.length; i++){
                    // let originalUrl = navbarLink[i].href;
                    // let newUrl = urlFile + "/" +originalUrl;
                    // navbarLink[i].href = newUrl;
                    // console.log("urlFile 2 " + navbarLink[i].innerHTML);
                    // console.log("originalUrl " + originalUrl);
               // }
                            
                //obtenir l'url en cours
                let url_en_cours = window.location.href;
                let idProfil = url_en_cours.substring(url_en_cours.lastIndexOf('-'));
                // idProfil = idProfil.substring(1);
                idProfil = parseInt(idProfil.substring(1));
                // console.log("idProfil "+idProfil);

                //si le profil id correspond à celui de l'url 
                if (profile.id == idProfil) {

                    // console.log(typeof idProfil);
                    // console.log(profile);
                    // console.log("profile id : " + profile.id);
                    // console.log("profile lastname : " + profile.lastname);

                    // on récupére les datas du profil souhaité via l'id de l'url
                    // const profileSelect = profile[1][10];

                    // console.log("profileSelect : "+profileSelect);

                    /* --VARIABLES-- */
                    // Crée un élément de liste pour chaque profil
                    const profileContainer = document.getElementById("profil-container");
                    /*Détails profil*/
                    const profilImg = document.getElementById('profil-picture-img');
                    let profilImgURL;
                    const titleName = document.getElementById('container-title-name');
                    const citation = document.getElementById('citation');
                    const description = document.getElementById('description');
                    /*Lien*/
                    const btnContact = document.getElementById('btn-contact');
                    /*URLS*/
                    const btnCv = document.getElementById('btn-cv');
                    const githubProfil = document.getElementById('github-profil');
                    const linkedinProfil = document.getElementById('linkedin-profil');
                    const codepenProfil = document.getElementById('codepen-profil');

                    // if (profilImg) {
                    //     console.log('profilImg existe ');
                    // }

                    /*-- LA PHOTO --*/
                    if (profile.picture === "#") {
                        //on insérer une image par défaut
                        profilImgURL = "https://ca.slack-edge.com/T6SG2QGG2-U06LZ0G6996-g674f15ea47f-512";
                    } else {
                        profilImgURL = profile.picture;
                    }
                    const lastName = profile.lastname.toUpperCase();
                    profilImg.src = profilImgURL;
                    profilImg.alt = `${profile.firstname} ${lastName}`;
                    console.log("profilImg " + profilImg);
                    /* H1 nom */
                    titleName.innerHTML = `${profile.firstname} ${lastName}`;

                    /* CITATION */
                    citation.innerHTML = profile.dicton;

                    /* DESCRIPTION */
                    description.innerHTML = profile.description;

                    /* btnContact */
                    // btnContact.href = `${profile.firstname}-${profile.id}.html`;

                    /* btnCv */
                    btnCv.href = profile.cv;

                    /* github */
                    githubProfil.href = profile.github;

                    /* linkedin */
                    linkedinProfil.href = profile.linkedin;

                    /* codepen */
                    codepenProfil.href = profile.codepen;

                }
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération du fichier JSON:', error);
        });

});
