"use strict";
import {
  openDialogModal,
  closeDialogModal,
  photographerWorks,
} from "./photographerPages";
import { createTextualElt } from "./Utilitaires";
import { mediaPlant } from "./mediaPlant";

// Position du média actuel
let indexCurrentMedia = -1;
let focusedMedia = document.activeElement;

//DOM
const coverElt = document.getElementById("lightbox-cover");
const lightboxElt = document.getElementById("lightbox");
const contentElt = document.getElementById("lightbox-content");
const closeElt = document.getElementById("lightbox-close");
const bodyElt = document.getElementsByTagName("body")[0];
const htmlElt = document.getElementsByTagName("html")[0];
const previousElt = document.getElementById("lightbox-previous");
const nextElt = document.getElementById("lightbox-next");

//Rendre les éléments de navigation interactifs
const configureLightboxControls = () => {
  closeElt.addEventListener("click", closeLightBox);
  previousElt.addEventListener("click", goToPreviousMedia);
  nextElt.addEventListener("click", goToNextMedia);

  window.addEventListener("keydown", manageKeyboardNav);
};

//Gérer la lightbox en appuyant sur Entrée
const manageLightBoxOnKeyboard = function (mediaElt) {
  return function manageKeyboard(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      manageLightBox(mediaElt)();
    }
  };
};

//Gérer l'élément multimédia individuel à l'intérieur de la lightbox
const manageLightBox = function (mediaElt) {
  return function manage() {
    openLightbox();
    fillLightbox(mediaElt);
    focusedMedia = document.activeElement;

    const mediaClicked = document.getElementById("current-media-lightbox");
    if (mediaElt.type === "image") closeElt.focus();
    if (mediaElt.type === "video") mediaClicked.focus();
    lightboxElt.addEventListener("keydown", keyboardTrapLightbox);
  };
};

//Afficher la lightbox sur le navigateur
const openLightbox = () => {
  openDialogModal();

  coverElt.style.display = "block";
  coverElt.setAttribute("aria-hidden", "false");
  lightboxElt.style.display = "block";
  lightboxElt.setAttribute("aria-hidden", "false");
  htmlElt.scrollTop = 0;
  bodyElt.scrollTop = 0;
  bodyElt.style.overflow = "hidden";
};

// Gérer le piège du clavier sur la lightbox
const keyboardTrapLightbox = (evt) => {
  const currentMedia = document.getElementById("current-media-lightbox");

  if (currentMedia.tagName === "IMG") {
    if (evt.keyCode === 9) {
      if (evt.shiftKey) {
        if (document.activeElement === closeElt) {
          evt.preventDefault();
          nextElt.focus();
        }
      } else {
        if (document.activeElement === nextElt) {
          evt.preventDefault();
          closeElt.focus();
        }
      }
    }
  } else {
    if (evt.keyCode === 9) {
      if (evt.shiftKey) {
        if (document.activeElement === currentMedia) {
          evt.preventDefault();
          nextElt.focus();
        }
      } else {
        if (document.activeElement === nextElt) {
          evt.preventDefault();
          currentMedia.focus();
        }
      }
    }
  }

  if (evt.keyCode === 27) closeLightBox();
};

//Supprimer la lighbox de la vue du browser
const closeLightBox = () => {
  closeDialogModal();
  focusedMedia.focus();

  coverElt.style.display = "none";
  coverElt.setAttribute("aria-hidden", "true");
  lightboxElt.style.display = "none";
  lightboxElt.setAttribute("aria-hidden", "true");
  bodyElt.style.overflow = "auto";
};

// Remplissez la lightbox avec le média sur lequel ont a cliqué
const fillLightbox = (media) => {
  contentElt.innerHTML = "";
  contentElt.appendChild(media.createFullElt());
  const mediaTitle = createTextualElt("h3", media.alt, "lightbox-media-title");
  contentElt.appendChild(mediaTitle);

  indexCurrentMedia = getCurrentMediaPosition(media);
};

// Obtenir l'index du média actuel affiché sur lightbox
const getCurrentMediaPosition = (media) => {
  for (let i = 0; i < photographerWorks.length; i++) {
    if (photographerWorks[i].id === media.id) return i;
  }

  return -1;
};

//Crée un nouveau media
const createNewMedia = () => {
  const mediaData = photographerWorks[indexCurrentMedia];
  const mediaType = mediaData.image ? "image" : "video";

  const newMedia = new MediaFactory(mediaType, mediaData);
  fillLightbox(newMedia);
};

// Afficher les médias précédents du photographe dans la lightbox
const goToPreviousMedia = () => {
  if (indexCurrentMedia > 0) indexCurrentMedia--;
  else indexCurrentMedia = photographerWorks.length - 1;

  createNewMedia();
};

//Les Suivants
const goToNextMedia = () => {
  if (indexCurrentMedia < photographerWorks.length - 1) indexCurrentMedia++;
  else indexCurrentMedia = 0;

  createNewMedia();
};

// Gérer la navigation au clavier
const manageKeyboardNav = (evt) => {
  switch (evt.key) {
    case "Left":
    case "ArrowLeft":
      goToPreviousMedia();
      break;
    case "Right":
    case "ArrowRight":
      goToNextMedia();
      break;
    case "Esc":
    case "Escape":
      closeLightBox();
      break;
    default:
      return;
  }

  evt.preventDefault();
};

export { manageLightBox, configureLightboxControls, manageLightBoxOnKeyboard };
