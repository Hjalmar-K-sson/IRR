//Targeting navbar elements to be toggled for visibility / invisibility
const navbarToggle = document.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelector("#navbar-links");
//Checking if the navbar menu is expanded
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";
//Function changes visibility of navbar menu
const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};
navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinks.addEventListener("click", (e) => e.stopPropagation());

navbarMenu.addEventListener("click", toggleNavbarVisibility);
