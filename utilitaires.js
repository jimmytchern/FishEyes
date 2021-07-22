"use strict";

//  Crée un element avec une classe
const createEltWithClassName = (eltTag, eltClass) => {
  const elt = document.createElement(eltTag);
  elt.classList.add(eltClass);

  return elt;
};

// Crée un lien avec href et l'attribut du titre
const createLinkElt = (linkHref, linkTitle) => {
  const elt = document.createElement("a");
  elt.setAttribute("href", linkHref);
  elt.setAttribute("title", linkTitle);

  return elt;
};

// Crée un 'imgElt" qui stock les src et attribut
const createImgElt = (imgSrc, imgAlt) => {
  const elt = document.createElement("img");
  fillImgElt(elt, imgSrc, imgAlt);

  return elt;
};

//Crée un element de text avec 'content' et 'class'
const createTextualElt = (eltTag, eltContent, eltClass) => {
  const elt = createEltWithClassName(eltTag, eltClass);
  fillEltWithText(elt, eltContent);

  return elt;
};

// Crée une liste intéractive des elemnts 'tags'
const createInteractiveListElt = (parentElt, eltText, hrefURL) => {
  const liElt = document.createElement("li");
  const aElt = createEltWithClassName("a", "filter-tag");
  aElt.setAttribute("href", hrefURL);
  aElt.setAttribute("title", eltText);
  aElt.textContent = eltText;

  liElt.appendChild(aElt);

  parentElt.appendChild(liElt);
};

// Obtenir la valeur du paramètre à partir de l'URL
const getParamFromUrl = (urlString, param) => {
  const url = new URL(urlString);
  const paramValue = url.searchParams.get(param);

  return paramValue;
};

//Remplir l'element avec du texte
const fillEltWithText = (elt, text) => {
  elt.textContent = text;

  return elt;
};

//Remplir l'elemnt avec une image
const fillImgElt = (elt, imgSrc, imgAlt) => {
  elt.setAttribute("src", imgSrc);
  elt.setAttribute("alt", imgAlt);

  return elt;
};

export {
  createEltWithClassName,
  createLinkElt,
  createImgElt,
  createTextualElt,
  createInteractiveListElt,
  getParamFromUrl,
  fillEltWithText,
  fillImgElt,
};
