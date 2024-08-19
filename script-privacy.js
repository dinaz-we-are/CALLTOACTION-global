function pageSpecificFunctions() {
  navbarRepo();
  transitionPage();
  toggleFaq();
}

gsap.to(".main-wrapper", { opacity: 1, delay: 0.5 });
