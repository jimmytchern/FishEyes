//Class pour creer un nouveaux média video ou image
export class Medium {
  createMedia(type, alt, date, id, link, likes, photographerId, tags, path) {
    if (type == "jpg") {
      const photo = new Photo();
      photo.type = type;
      photo.alt = alt;
      photo.date = new Date(date);
      photo.id = id;
      photo.link = link;
      photo.likes = likes;
      photo.photographerId = photographerId;
      photo.tags = tags;
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      photo.path = path + link;

      return photo;
    } else if (type == "mp4") {
      const video = new Video();
      video.type = type;
      video.alt = alt;
      video.date = new Date(date);
      video.id = id;
      video.link = link;
      video.likes = likes;
      video.photographerId = photographerId;
      video.tags = tags;
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      return video;
    }
  }
}
// crée classe qui hérite d'une autre classe
export class Photo extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;
    const cardsMediaImg = document.createElement("img");
    cardsMediaImg.src = linkToSmalPhoto + this.link;
    cardsMediaImg.alt = this.alt;
    cardsMediaImg.classList.add("media-img");

    return cardsMediaImg;
  }
}
// crée classe qui hérite d'une autre classe
export class Video extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;
    const cardsMediaVideo = document.createElement("video");
    cardsMediaVideo.loop = true;
    cardsMediaVideo.muted = true;

    cardsMediaVideo.src = linkToSmalPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideo.classList.add("media-img");

    return cardsMediaVideo;
  }
}
