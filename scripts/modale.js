//Modal
function openModalForm(currentPhotographer) {
  //nom du photographe contacter
  const modalTitle = document.querySelector(".modal-title");
  //Bouton de la modale pour affichage mobile
  const btnModalMobile = document.querySelector(".btn-modal-mobile");
  // Bouton de la modale
  const bannerBtnTablet = document.querySelector(".banner-btn");
  //Modale complete afficher
  const contactModal = document.querySelector(".contact-modal");
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const formLastNameInp = document.querySelector(".lastName-inp");
  const formEmailInp = document.querySelector(".email-inp");
  const formMsgInp = document.querySelector(".msg-inp");
  const errorMessage = document.querySelectorAll(".message-alert");
  //Croix qui sert a fermer la modale
  const modalClose = document.querySelector(".modal-close");

  let verifFirst;
  let verifLast;
  let verifMail;
  let verifMsg;
  // On genere le nom du photographe sur la modale vierge
  modalTitle.innerHTML = `Contactez-Moi ${currentPhotographer.name} `;

  //open modal
  btnModalMobile.addEventListener("click", () => {
    const body = document.getElementById("body");
    body.setAttribute("aria-hiden", "true");
    contactModal.style.display = "flex";
    contactModal.setAttribute("aria-hidden", "false");

    modalClose.focus();
  });
  bannerBtnTablet.addEventListener("click", () => {
    contactModal.style.display = "flex";
    contactModal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scrool");
    modalClose.focus();
  });
  formFirstNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      //Affichage du message d'erreur
      errorMessage[0].style.display = "inline";
      verifFirst = false;
    } else {
      errorMessage[0].style.display = "none";
      verifFirst = true;
    }
  });
  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      verifLast = false;
    } else {
      errorMessage[1].style.display = "none";
      verifLast = true;
    }
  });
  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
      verifMail = true;
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      verifMail = false;
    }
  });

  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      verifMsg = false;
    } else {
      errorMessage[3].style.display = "none";
      verifMsg = true;
    }
  });

  // Message de validation si tous est OK et affichage dans la console
  document.getElementById("contact").addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      verifFirst === true &&
      verifLast === true &&
      verifMail === true &&
      verifMsg === true
    ) {
      const modalValidationMsg = document.createElement("div");
      const validationTxt = document.createElement("div");
      const contactModal = document.querySelector(".modal-content");
      const modalTitle = document.querySelector(".modal-title");
      validationTxt.classList.add("validation-txt");
      const bannerModal = document.querySelector("form");
      bannerModal.style.display = "none";
      modalTitle.style.display = "none";
      modalValidationMsg.classList.add("modal-validation-msg");
      modalValidationMsg.style.display = "flex";
      contactModal.append(modalValidationMsg);
      modalValidationMsg.append(validationTxt);
      validationTxt.innerHTML = `Votre message a bien été envoyé à <br> ${currentPhotographer.name} `;

      let datas = new FormData(bannerModal);
      for (let i of datas.entries()) {
        console.log(i[0], ":", i[1]);
      }
    }
  });

  function closeModal() {
    const contactModal = document.querySelector(".contact-modal");
    contactModal.style.display = "none";
    contactModal.setAttribute("aria-hidden", "true");
    body.setAttribute("aria-hiden", "true");
  }

  modalClose.addEventListener("click", () => {
    closeModal();
  });
  //Accessibilité : on peut fermer en appuyant sur esc
  contactModal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(e);
    }
  });
}

export { openModalForm };
