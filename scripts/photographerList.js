//  Class pour créer un nouveaux photographe
export class PhotographerList {
  // creation du tableau photographer list
  constructor() {
    this.photographerList = [];
  }
  // addPhotographer ajoute l'objet creer avec la classe Photographer dans le tableau photographerList
  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }
  // Mon probleme de tag : (soutenance Ryade)
  // getPhotographerList : retourne un nouveaux tableau  avec les photographes triés selon le tag selectionner par l'uttilisateur
  getPhotographerList(...tags) {
    let returnedList = [];
    // si la longueur de la chaine de caractere n'est pas égale a 0 :    ( vrai )
    if (tags.length !== 0) {
      console.log("la valeur du tag selectionner est différente de 0");
      //faire reference a l'objet voulu et pour chaque element du tableau avec le parametre photograph :
      this.photographerList.forEach((photograph) => {
        photograph.tags.forEach((tag) => {
          //includes determine si le tableau contient la valeur, si oui il la renvoie
          //renvoie vrai si et uniquement si ses deux opérandes sont true
          if (tags.includes(tag) && !returnedList.includes(photograph)) {
            returnedList.push(photograph);
            console.log("salutation");
          }
        });
      });
    } else {
      returnedList = this.photographerList.slice();
      console.log("aucun tag selectionner");
    }

    return returnedList;
  }

  // retourne un tableau qui contient tous les tags
  getAllTags() {
    const tags = [];

    this.photographerList.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });

    return new Set(tags);
  }
  // retourne un photographe depuis son ID
  getPhotographerById(id) {
    for (const photographer of this.photographerList) {
      if (photographer.id === id) {
      }
    }
  }
}
