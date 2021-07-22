//Formulaire
//DOM_______________________________________________________

const btnContact = document.getElementById("ph-contact");
const modalForm = document.getElementById("form-dialog");
const coverForm = document.getElementById("cover");
const formSubmit = document.getElementById("form-submit");
const displayForm = () => {
  modalForm.style.display = "block";
  coverForm.style.display = "block";
};

//DOM FORUMLAIRE
const firstnameInput = document.getElementById("first-name");
const lastnameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSubmitBtnElt = document.getElementById("form-submit-btn");

//Click Event_______________________________________________

btnContact.addEventListener("click", displayForm);

//Close modal Event_________________________________________
const modalClose = document.getElementById("close-btn");
function Close() {
  modalForm.style.display = "none";
  coverForm.style.display = "none";
}
modalClose.addEventListener("click", Close);

//Ajouter le nom du photographe au formulaire
const addPhotographerNameInForm = (photographerName) => {
  const nameElt = document.getElementById("ph-form-name");
  nameElt.textContent = photographerName;
};

//Gestion Keyboard
const keyboardTrapForm = () => {
  firstnameInput.focus();
  formDialogElt.addEventListener("keydown", keyboardNavigationForm);
};

//Gerer la navigation au clavier dans le formulaire
function keyboardNavigationForm(evt) {
  if (evt.keyCode === 9) {
    if (evt.shiftKey) {
      if (document.activeElement === closeBtnElt) {
        evt.preventDefault();
        formSubmitBtnElt.focus();
      }
    } else {
      if (document.activeElement === formSubmitBtnElt) {
        evt.preventDefault();
        closeBtnElt.focus();
      }
    }
  }

  if (evt.keyCode === 27) closeForm();
}

//Afficher le contenu du formulaire lors de la soumission
function submitForm(e) {
  e.preventDefault();
  console.log(`Prénom : ${firstnameInput.value}`);
  console.log(`Nom : ${lastnameInput.value}`);
  console.log(`Email : ${emailInput.value}`);
  console.log(`Votre message : ${messageInput.value}`);

  closeForm();
}

export { addPhotographerNameInForm };
