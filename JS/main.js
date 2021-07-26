import { createPhotographerElt } from "./elementPhotographers";
import {
  getFilteredPhotographers,
  toggleFilter,
  checkFilterOnPageCreation,
} from "./tags";

//DOM
const photographersElt = document.getElementById("photographers");
const tagsElt = document.getElementById("tags");

// Construire la page d'accueil (DOM + logique de filtrage)
const createHomepage = () => {
  tagsElt.addEventListener("click", toggleFilter);

  let photographersToDisplay = getFilteredPhotographers([]);
  photographersToDisplay.forEach((photographer) =>
    photographersElt.appendChild(createPhotographerElt(photographer))
  );

  const tagsListElts = document.querySelectorAll(".ph-elt-tags");
  tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));

  checkFilterOnPageCreation();
};

export { createHomepage };
