// Class pour créer un nouveaux photographe
export class Photographers {
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

  // getFolderName : returns le nom du dossier pour les photos  chaque photographes
  getFolderName() {
    return this.name.toLowerCase().replace(" ", "");
  }
}
