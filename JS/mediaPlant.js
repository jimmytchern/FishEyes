import { createImgElt, createTextualElt } from "./utilitaires";

class imagePlant {
  constructor(props) {
    this.src = props.image;
    this.alt = props.alt;
    this.id = props.id;
    this.type = "image";
  }
  // Créer l'élément DOM pour la vignette images(img)
  createElt() {
    const elt = createImgElt(`images/${this.src}`, `${this.alt}, closeup view`);
    elt.setAttribute("role", "button");

    return elt;
  }

  // Créer l'élément DOM en taille réelle de l'image
  createFullElt() {
    const elt = createImgElt(`images/${this.src}`, this.alt);
    elt.setAttribute("id", "current-media-lightbox");

    return elt;
  }
}

//Pour les videos
class videoPlant {
  constructor(props) {
    this.src = props.video;
    this.alt = props.alt;
    this.id = props.id;
    this.type = "video";
  }
  //Logique du DOM
  domCreation(text) {
    let elt = createTextualElt("video", text, "video-elt");
    let srcElt = document.createElement("source");
    srcElt.setAttribute("src", `videos/${this.src}`);
    elt.appendChild(srcElt);

    return elt;
  }
  //Créer l'élément DOM pour la vignette - vidéo
  createElt() {
    const elt = this.domCreation(`${this.alt}, closeup view`);
    elt.setAttribute("role", "button");

    return elt;
  }
  //Créer l'élément en taille réelle - vidéo
  createFullElt() {
    let elt = this.domCreation(this.alt);
    elt.setAttribute("controls", true);
    elt.setAttribute("id", "current-media-lightbox");

    return elt;
  }
}

export default class mediaPlant {
  constructor(type, props) {
    if (type === "image") return new imagePlant(props);
    if (type === "video") return new videoPlant(props);
  }
}
