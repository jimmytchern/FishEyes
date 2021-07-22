//DOM_____________________________________________________
const btnBox = document.getElementById("sort-btn");
const listHidden = document.getElementById("sort-list");
const option1List = document.getElementById("sort-1");
const option2List = document.getElementById("sort-2");
const option3List = document.getElementById("sort-3");
//console.log(option1List,option2List,option3List); //OK

//DOM Click EVENT_________________________________________
const togleList = () => {
  //if (listHidden.style.display == "block") {
  //listHidden.style.display = "none";
  //} else if (listHidden.style.display == "none") {
  listHidden.style.display = "block";
  // }
};
//Click EVENT_____________________________________________
btnBox.addEventListener("click", togleList);

//Fermer la liste
const closeList = () => {
  listHidden.style.display = "none";
};

option1List.addEventListener("click", closeList);
