"use strict";

import { createEltWithClassName } from "../JS/Utilitaires";
import { photographerWorks } from "../JS/photographerPages";

//DOM
const worksElt = document.getElementById("works-elts");

//Configurer les likes
const path = document.location.pathname;
if (path.includes("photographerPages.html")) {
  worksElt.addEventListener("click", incrementLikesOnClick);
}

//Configurer pour la trouche entrée
const incrementLikesOnKeyboard = (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    incrementLikes(evt.target);
  }
};

//Incrémenter les likes en cliquant
function incrementLikesOnClick(evt) {
  if (evt.target.tagName === "SPAN") {
    evt.preventDefault();
    incrementLikes(evt.target);
  }
}

//Incrementer les likes et les afficher sur le DOM
const incrementLikes = (target) => {
  let currentWork = photographerWorks.filter(
    (elt) => elt.id == target.parentElement.id
  )[0];
  currentWork.likes++;
  target.parentElement.childNodes[0].nodeValue = currentWork.likes;
  updateTotalLikesElt();
};

//Créer un élément total de likes
const createTotalLikeElt = () => {
  const elt = document.createElement("span");
  elt.setAttribute("id", "total-likes");
  let totalLikes = 0;
  photographerWorks.forEach((work) => (totalLikes += work.likes));

  const heartElt = createEltWithClassName("i", "fas");
  heartElt.classList.add("fa-heart");
  heartElt.setAttribute("aria-label", "likes");
  elt.textContent = `${totalLikes} `;
  elt.appendChild(heartElt);

  return elt;
};

//Mettre à jour le nombre total de likes
const updateTotalLikesElt = () => {
  const totalLikesElt = document.getElementById("total-likes");
  let totalLikes = 0;
  photographerWorks.forEach((work) => (totalLikes += work.likes));
  totalLikesElt.childNodes[0].nodeValue = `${totalLikes} `;
};

export { createTotalLikeElt, incrementLikesOnKeyboard };
