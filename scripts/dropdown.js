export function displayFilterMenu(displayMediaList) {
  const dropDownMenu = document.querySelector(".dropdownMenu ");
  const filterSelect = document.querySelector(".filter-select");
  const filterDeployment = document.querySelector(".filterDeployment");
  const filterOptions = document.querySelectorAll(".filter-option");
  //selection du premier enfant de l'element filter select
  const firstFilterOption = document.querySelector(
    ".filter-select a:first-child"
  );

  //selection du dernier enfant de l'element filter select
  const lastFilterOption = document.querySelector(
    ".filter-select a:last-child"
  );
  // parcours le tableau filterOptions au click sur le menu dropdown
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      // si un filtre ne contient pas la classe selected alors alors selection du premier parent du filtre qui contient la classe
      // filterOptions.selected
      if (!this.classList.contains("selected")) {
        const selected = this.parentNode.querySelector(
          ".filter-option.selected"
        );

        selected.classList.remove("selected");
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");
        //  l'ancêtre le plus proche de l'élément "filterDeployment" span
        // et remplace le texte (passe le filtre selectionner en haut de liste)
        this.closest(".filter-select").querySelector(
          ".filterDeployment span"
        ).textContent = this.textContent;
        hideDropdown();
        displayMediaList();
      }
    });
  }
  // Accessibilité du dropDown Menu
  dropDownMenu.addEventListener("click", function (e) {
    e.preventDefault();
    if (filterSelect.classList.contains("open")) {
      hideDropdown();
    } else {
      displayDropdown();
    }
  });
  // Accessibilité avec la touche TAB
  lastFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && !e.shiftKey) {
      hideDropdown();
    }
  });

  firstFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && e.shiftKey) {
      hideDropdown();
    }
  });

  window.addEventListener("click", function (e) {
    if (!filterSelect.contains(e.target)) {
      hideDropdown();
    }
  });
  // Deroulement du menu
  function displayDropdown() {
    filterSelect.classList.add("open");
    filterDeployment.setAttribute("aria-expanded", "true");
  }

  function hideDropdown() {
    filterSelect.classList.remove("open");
    filterDeployment.setAttribute("aria-expanded", "false");
  }
}
