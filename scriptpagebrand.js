function pageSpecificFunctions() {
  navbarRepo();
  logoAnima();
  secondSection(false);
  toggleFaq();
  transitionPage();
  portfolioInfo();
  togglePortfolio();
  videoPause();
}

//

//

function logoAnima() {
  // Seleziona tutti gli elementi con la classe .logo-cont-wrapper
  const logos = document.querySelectorAll(".logo-cont-wrapper");

  // Crea l'animazione per ogni logo
  // Crea l'animazione con effetto stagger
  logos.forEach((logo) => {
    const anim = gsap.fromTo(
      logo,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        paused: true,
      }
    );

    ScrollTrigger.create({
      trigger: logo,
      start: "top 80%", // Inizia l'animazione quando il top dell'elemento è al 80% della viewport
      end: "bottom top",
      onEnter: () => anim.play(),
      onEnterBack: () => anim.play(),
      onLeave: () => anim.reverse(),
      onLeaveBack: () => anim.reverse(),
      toggleActions: "play none none reverse", // Gioca l'animazione all'ingresso e la ripete all'uscita
    });
  });
}
//---------------------------------------------fine logo animation
//sezione path

//
