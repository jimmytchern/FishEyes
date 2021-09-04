// Le patron de conception ‘Constructeur’
//les fonctions sont aussi des objets, on peut leur ajouter des proprietes.
// en utilisant ‘this’
//Class pour creer un tableau constructor avec des methodes de tri sur les objets instancié avec la class Medium
export class MediumList {
  constructor() {
    this.mediaList = [];
  }
  //(notation plus courte) language ES6
  addMedia(media) {
    //Ajoute un nouveau media au tableau
    this.mediaList.push(media);
  }

  getMediaList(sort, ...tags) {
    // Variable qui stock la nouvelle copie du tableau crée avec .slice
    const localMediaList = this.mediaList.slice();
    let returnedList = [];
    // condition de tri
    if (sort === "popularite") {
      // trie les elements du tableau et renvoie le tableau en fonction du nombre de like
      localMediaList.sort((a, b) => b.likes - a.likes);
      //Tri en fonction de la date des photos
    } else if (sort === "date") {
      localMediaList.sort((a, b) => b.date - a.date);
      //Tri en fonction de l'ordre alphabetique du titre
    } else if (sort === "titre") {
      localMediaList.sort(function (a, b) {
        const titleA = a.title.toUpperCase(); // Retourne en majuscule
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    }

    if (tags.length !== 0) {
      localMediaList.forEach((media) => {
        media.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(media)) {
            returnedList.push(media);
          }
        });
      });
    } else {
      returnedList = localMediaList.slice();
    }

    return returnedList;
  }
  // avoir les likes des photos
  getLikes() {
    let sum = 0;
    this.mediaList.forEach((media) => {
      sum += media.likes;
    });
    //retourner le nombre
    return sum;
  }
}
