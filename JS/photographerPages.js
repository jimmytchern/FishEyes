"use strict";

import {
  getParamFromUrl,
  fillEltWithText,
  createInteractiveListElt,
  fillImgElt,
  createEltWithClassName,
  createTextualElt,
  createLinkElt,
} from "./utilitaires";
import { addPhotographerNameInForm } from "./modal";
import { createTotalLikeElt, incrementLikesOnKeyboard } from "./like";
import {
  manageLightBox,
  configureLightboxControls,
  manageLightBoxOnKeyboard,
} from "./lightbox";
import { sortPhotographers, manageSortEvents } from "./sort";
import mediaPlant from "./mediaPlant";
import data from "./data";
//DOM
const headerBannerElt = document.getElementById("header-banner");
const photographerPageElt = document.getElementById("photographer-page");

// Variable Photographes
const photographerId = getParamFromUrl(document.location.href, "id");
const photographerData = data.photographers.filter(
  (elt) => elt.id == photographerId
)[0];
const photographerWorks = data.media.filter(
  (elt) => elt.photographerId == photographerId
);

// Construire la page photographe DOM
const createPhotographerPage = () => {
  fillPhotographerHeader();
  createPhotographerWorksSection("Popularité");
  fillPhotographerData();
  addPhotographerNameInForm(photographerData.name);
  manageSortEvents();
};

//Remplissir l'en-tête HTML du photographe avec les données du photographe
const fillPhotographerHeader = () => {
  const titleElt = document.getElementById("ph-title");
  fillEltWithText(titleElt, photographerData.name);

  const cityElt = document.getElementById("ph-city");
  fillEltWithText(
    cityElt,
    `${photographerData.city}, ${photographerData.country}`
  );

  const taglineElt = document.getElementById("ph-tagline");
  fillEltWithText(taglineElt, photographerData.tagline);

  const tagsElt = document.getElementById("ph-tags");
  photographerData.tags.forEach((tag) =>
    createInteractiveListElt(tagsElt, tag, `index.html?tag=${tag}`)
  );

  const portraitElt = document.getElementById("ph-portrait");
  fillImgElt(
    portraitElt,
    `images/${photographerData.portrait}`,
    photographerData.alt
  );

  configureLightboxControls();
};

// Ajouter chaque élément de travail du photographe

const createPhotographerWorksSection = (filterTag) => {
  const worksElts = document.getElementById("works-elts");
  worksElts.innerHTML = "";
  const sortedWorks = sortPhotographers(photographerWorks, filterTag);
  sortedWorks.forEach((work) => worksElts.appendChild(createWorkElt(work)));
};

// Créer un seul élément de travail pour un photographe

const createWorkElt = (workData) => {
  const elt = createEltWithClassName("div", "work-elt");
  const aElt = createLinkElt("#", `${workData.alt}, closeup view`);
  const infosElt = createEltWithClassName("div", "work-elt-infos");
  const titleElt = createTextualElt("h2", workData.alt, "work-title");
  const priceElt = createTextualElt(
    "span",
    `${workData.price} €`,
    "work-price"
  );
  const likeElt = createTextualElt("span", workData.likes, "work-like");
  likeElt.setAttribute("id", workData.id);
  const heartElt = createEltWithClassName("span", "fas");

  heartElt.classList.add("fa-heart");
  heartElt.setAttribute("aria-label", "likes");
  heartElt.setAttribute("role", "button");
  heartElt.setAttribute("tabindex", "0");
  heartElt.addEventListener("keydown", incrementLikesOnKeyboard);

  const workType = workData.video === undefined ? "image" : "video";
  const media = new mediaPlant(workType, workData);
  const mediaElt = media.createElt();
  aElt.appendChild(mediaElt);
  mediaElt.addEventListener("click", manageLightBox(media));

  likeElt.appendChild(heartElt);
  infosElt.appendChild(titleElt);
  infosElt.appendChild(priceElt);
  infosElt.appendChild(likeElt);
  elt.appendChild(aElt);
  elt.appendChild(infosElt);

  aElt.addEventListener("keydown", manageLightBoxOnKeyboard(media));

  return elt;
};

//Remplir l'élément HTML avec les données du photographe
const fillPhotographerData = () => {
  const pageElt = document.getElementById("photographer-page");
  const elt = createEltWithClassName("aside", "ph-data");
  elt.setAttribute("aria-label", "photographer likes and price");
  const priceElt = document.createElement("span");

  priceElt.textContent = `${photographerData.price}€ / jour`;

  elt.appendChild(createTotalLikeElt());
  elt.appendChild(priceElt);

  pageElt.appendChild(elt);
};

//Masquer le contenu de la page de l'accessibilité lors de l'ouverture d'un modal
const openDialogModal = () => {
  headerBannerElt.setAttribute("aria-hidden", "true");
  photographerPageElt.setAttribute("aria-hidden", "true");
};

// Afficher le contenu de la page à partir de l'accessibilité lors de la fermeture d'un modal
const closeDialogModal = () => {
  headerBannerElt.setAttribute("aria-hidden", "false");
  photographerPageElt.setAttribute("aria-hidden", "false");
};

export {
  createPhotographerPage,
  photographerWorks,
  openDialogModal,
  closeDialogModal,
  createPhotographerWorksSection,
};
/*
//--------------------------------------------MODAL--------------------------------------------------------

//Elément DOM
const contactElt = document.getElementById("ph-contact");
const formElt = document.getElementById("contact-form");
const formDialogElt = document.getElementById("form-dialog");
const coverFormElt = document.getElementById("cover");
const closeBtnElt = document.getElementById("close-btn");

// Elément DOM formulaire
const firstnameInput = document.getElementById("first-name");
const lastnameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSubmitBtnElt = document.getElementById("form-submit-btn");

//Ajouter l'ecouteur d'evenement au formulaire

const path = document.location.pathname;
if (path.includes("photographer-page.html")) {
  contactElt.addEventListener("click", openForm);
  closeBtnElt.addEventListener("click", closeForm);
  formElt.addEventListener("submit", submitForm);
}

//Ouvrir le formulaire
function openForm() {
  openDialogModal();

  formDialogElt.style.display = "block";
  formDialogElt.setAttribute("aria-hidden", "false");
  coverFormElt.style.display = "block";
  coverFormElt.setAttribute("aria-hidden", "false");

  keyboardTrapForm();
}

//Gestion de keyboard
const keyboardTrapForm = () => {
  firstnameInput.focus();
  formDialogElt.addEventListener("keydown", keyboardNavigationForm);
};

//Gérer la navigation au clavier dans le formulaire
function keyboardNavigationForm(evt) {
  if (evt.keyCode === 9) {
    if (evt.shiftKey) {
      if (document.activeElement === closeBtnElt) {
        evt.preventDefault();
        formSubmitBtnElt.focus();
      }
    } else {
      if (document.activeElement === formSubmitBtnElt) {
        evt.preventDefault();
        closeBtnElt.focus();
      }
    }
  }

  if (evt.keyCode === 27) closeForm();
}

//Fermer le formulaire
function closeForm() {
  closeDialogModal();
  contactElt.focus();

  formDialogElt.style.display = "none";
  formDialogElt.setAttribute("aria-hidden", "true");
  coverFormElt.style.display = "none";
  coverFormElt.setAttribute("aria-hidden", "true");
}

//Afficher le contenu du formulaire lors de la soumission
function submitForm(e) {
  e.preventDefault();
  console.log(`Prénom : ${firstnameInput.value}`);
  console.log(`Nom : ${lastnameInput.value}`);
  console.log(`Email : ${emailInput.value}`);
  console.log(`Votre message : ${messageInput.value}`);

  closeForm();
}

//Ajoutez le nom du photographe au titre du formulaire
const addPhotographerNameInForm = (photographerName) => {
  const nameElt = document.getElementById("ph-form-name");
  nameElt.textContent = photographerName;
};

export { addPhotographerNameInForm };
*/
