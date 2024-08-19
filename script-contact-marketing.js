function pageSpecificFunctions() {
  navbarRepo();
  transitionPage();
  calendar();
}

gsap.to(".main-wrapper", { opacity: 1, delay: 0.5 });
