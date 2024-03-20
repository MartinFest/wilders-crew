document.addEventListener("DOMContentLoaded", function () {
    fetch('./scripts/wilders-profil.json') // Récupère le fichier JSON
        .then(response => response.json()) // Convertit la réponse en objet JSON
        .then(data => {
            // Traite les données
            data.forEach(profile => {
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
                    const profileLink = document.createElement('a');
                    profileLink.classList.add("profile");
                    const profileListLink = profileContainer.appendChild(profileLink);

                    //on rempli l'élément
                    profileLink.innerHTML = `<img src="${profile.picture} " alt="${profile.firstname} ${profile.lastname} ">`;
                    profileLink.innerHTML += `<span class="profile-name"> ${profile.firstname} ${profile.lastname}</span>`;

                    //on ajoute chaque liste au conteneur
                    listingProfile.appendChild(profileContainer);

                }

                if (listingProfile.classList.contains("vjslider__slider")) {
                    returnProfile("div")
                } else {
                    returnProfile("li");
                }

            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération du fichier JSON:', error);
        });
});
