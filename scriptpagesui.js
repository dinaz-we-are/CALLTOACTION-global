function pageSpecificFunctions() {
  navbarRepo();
  logoAnima();
  secondSection(false);
  swiperUI();
  videoPause();
  toggleFaq();
  transitionPage();
  portfolioInfo();
  togglePortfolio();
}

//

//---------------hero animation + transistion

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
//fine logo animation

//Swiper

function swiperUI() {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 600,
    navigation: {
      nextEl: document.querySelector(".swiper-button-next"),
      prevEl: document.querySelector(".swiper-button-prev"),
    },
    on: {
      init: function () {
        this.update();
        updateOpacityAndParallax(this);
      },
      slideChange: function () {
        updateOpacityAndParallax(this);
      },
    },
  });

  function updateOpacityAndParallax(swiper) {
    const slides = swiper.slides;
    slides.forEach((slide, index) => {
      if (index === swiper.activeIndex) {
        gsap.to(slide, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(slide.querySelector(".parallax-bg-img"), {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(slide, {
          opacity: 0.6,
          scale: 0.8,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(slide.querySelector(".parallax-bg-img"), {
          scale: 0.8,
          opacity: 0.6,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector(".swiper-container"));
}
//

//
