"use strict";
import data from "../JS/data";
import { createPhotographerElt } from "../JS/elementPhotographers";

//FilterTag
//DOM element
const tagsElt = document.getElementById("tags");
const photographersElt = document.getElementById("photographers");

//Photographe data
const photographers = data.photographers;

//la logique du tag pour afficher les bons photographes
const toggleFilter = (evt) => {
  evt.preventDefault();
  const selectedTag = getClassToToggle(evt.target);
  addTagParamToURL(selectedTag);
  toggleNavSelectedTags();
  const tagsInURL = getParamsFromURL("tag");
  const photographerToDisplay = getFilteredPhotographers(tagsInURL);

  displayFilteredPhotographers(photographerToDisplay);
  toggleEltSelectedTags();

  const tagsListElts = document.querySelectorAll(".ph-elt-tags");
  tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));
};

//Obtenir la classe sur laquelle vous avez cliqué
const getClassToToggle = (target) => {
  let tagSelected = "";
  if (target.tagName === "A") tagSelected = target.textContent;
  if (target.tagName === "LI") tagSelected = target.lastChild.textContent;

  return tagSelected.toLowerCase();
};

//Obtenir les paramètres de l'URL actuelle
const getParamsFromURL = (param) => {
  const currentPath = window.location.href;
  const currentParams = new URL(currentPath).searchParams;

  return currentParams.getAll(param);
};

// Ajouter une nouvelle balise à l'URL actuelle
const addTagParamToURL = (tagToAdd) => {
  if (tagToAdd == "") return;

  let url = "index.html";
  let tagParams = getParamsFromURL("tag");

  if (tagParams.includes(tagToAdd))
    tagParams = tagParams.filter((tag) => tag !== tagToAdd);
  else tagParams.push(tagToAdd);

  tagParams.forEach((tag, index) => {
    if (index === 0) url += `?tag=${tag}`;
    else url += `&tag=${tag}`;
  });
  window.history.pushState({}, "", url);
};

//Basculez la classe sélectionnée vers les balises de la barre de navigation
const toggleNavSelectedTags = () => {
  const tagParams = getParamsFromURL("tag");
  tagsElt.childNodes.forEach((elt) => {
    if (tagParams.includes(elt.lastChild.textContent.toLowerCase()))
      elt.classList.add("selected");
    else elt.className = "";
  });
};

//Créer le DOM avec les éléments à afficher
const displayFilteredPhotographers = (photographerToDisplay) => {
  photographersElt.innerHTML = "";
  photographerToDisplay.forEach((photographer) =>
    photographersElt.appendChild(createPhotographerElt(photographer))
  );
};

//Basculer la classe sélectionnée vers les balises sur les éléments des photographes
const toggleEltSelectedTags = () => {
  const tagParams = getParamsFromURL("tag");
  const phTagsElts = document.querySelectorAll(".ph-elt-tags li");
  phTagsElts.forEach((elt) => {
    if (tagParams.includes(elt.lastChild.textContent.toLowerCase()))
      elt.classList.add("selected");
    else elt.className = "";
  });
};

//Générer un tableau de photographes à afficher
const getFilteredPhotographers = (tagsList) => {
  let photographersToDisplay = photographers;
  photographersToDisplay = photographersToDisplay.filter((photographer) => {
    for (let i = 0; i < tagsList.length; i++) {
      if (!photographer.tags.includes(tagsList[i])) return false;
    }
    return true;
  });

  return photographersToDisplay;
};

//Afficher les photographes filtrés en fonction des paramètres dans l'URL (création de page)
const checkFilterOnPageCreation = () => {
  toggleNavSelectedTags();
  const tagsInURL = getParamsFromURL("tag");
  const photographerToDisplay = getFilteredPhotographers(tagsInURL);

  displayFilteredPhotographers(photographerToDisplay);
  toggleEltSelectedTags();

  const tagsListElts = document.querySelectorAll(".ph-elt-tags");
  tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));
};

export { getFilteredPhotographers, toggleFilter, checkFilterOnPageCreation };
