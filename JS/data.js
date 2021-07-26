"use strict";

// fetch méthode
fetch("./JS/data.json")
  //transformer le fichier json
  .then((response) => response.json())
  //le log dans la console
  .then((data) => console.log(data.photographers));
