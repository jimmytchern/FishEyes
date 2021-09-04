// Class pour créer un nouveaux photographe,
export class Photographers {
  // Permet d'interagir avec le new, et donc de dupliquer la class
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    // name : nom du photographe
    this.name = name;
    // id: Id du photographe
    this.id = id;
    // ville : du Photographe
    this.city = city;
    // country : Pays du photographe
    this.country = country;
    // Tags : tags du photographe
    this.tags = tags;
    // tagline : Tagline du photographe
    this.tagline = tagline;
    // price : Prix par impression du photographe
    this.price = price;
    //portrait : lien vers la photo du photographe
    this.portrait = portrait;
  }

  // getFolderName : returns le nom du dossier pour les photos de chaque photographes
  getFolderName() {
    // retourne la chaine de caractére en minuscule
    return this.name.toLowerCase().replace(" ", "");
  }
}
