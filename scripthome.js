function pageSpecificFunctions() {
  initializeGSAPAnimations();
  navbarRepo(true);
  burgerAnimation(true);
  initializeScrollFlipAnimations();
  swiperHome();
  // Differisci le altre funzioni non essenziali
  requestIdleCallback(() => {
    secondSection(true);
    createScrollTrigger2();
    setupCecoStrategy();
    portfolioInfo();
    togglePortfolio();
    videoPause();
    toggleCeco();
    changeCSSVariablesOnScroll();
    animateCecoOnScroll();
  });
}
function initializeGSAPAnimations() {
  const tl = gsap.timeline({
    onComplete: () => document.getElementById("cover-div").remove(),
  });

  // Split the text elements
  let h1Split = new SplitType(".h1-usp", {
    types: "words",
    tagName: "span",
  });
  let callSplit = new SplitType(".brand-nav-hero", {
    types: "chars",
    tagName: "span",
  });
  let uspSplit = new SplitType(".usp", {
    types: "words",
    tagName: "span",
  });

  // Animation timeline
  tl.to("#cover-div", { opacity: 0, duration: 0.2 })
    .to(".wrapper-hero", { opacity: 1, duration: 0.1 })
    .fromTo(
      ".brand-nav-hero .char",
      { y: "-10rem" },
      {
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.05,
      }
    )
    .fromTo(
      ".h1-usp .word",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.0325,
      }
    )
    .fromTo(
      ".usp .word",
      {
        rotationX: 90,
        transformOrigin: "bottom center",
      },
      {
        rotationX: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: { amount: 0.3 },
      },
      "<"
    )
    .fromTo(
      "#nav",
      { opacity: 0, y: "-5rem" },
      { delay: 0.5, opacity: 1, y: "0", duration: 0.5, ease: "back.out(1.7)" },
      "<"
    )
    .fromTo(
      "#big-call",
      { opacity: 0 },
      { opacity: 1, ease: "linear", duration: 1 },
      "<"
    )
    .fromTo(
      ".heading-container",
      { x: "50vw", opacity: 0 },
      { x: "0", opacity: 1, duration: 0.5, ease: "power2" },
      "<"
    )
    .to(
      ":root",
      {
        duration: 1,
        "--linear-grad1": "#f06",
        "--linear-grad2": "#e0ff0d",
        ease: "linear",
      },
      "<"
    )
    .fromTo(
      "#arrow",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "bounce" },
      "<"
    );

  tl.call(function () {
    console.log("Animazione completata");
  });
  //----------------------------------------animazione freccia

  let arrowAnimation = gsap.to(
    "#arrow",

    {
      scale: 0.5,
      ease: "power1",
      duration: 2,
      repeat: -1,
      yoyo: true,
    }
  );

  // Ferma l'animazione di rimbalzo quando .hero-trigger entra nella viewport
  ScrollTrigger.create({
    trigger: ".hero-spacer",
    start: "top bottom",
    end: "top 90%",
    scrub: true,
    onEnter: () => {
      arrowAnimation.pause();
    },
    onLeaveBack: () => {
      arrowAnimation.play();
    },
  });

  // Inizializza l'animazione di rimbalzo al caricamento della pagina
  arrowAnimation.play();
}
//----------------------------------------------------fine animazione freccia

// Crea una funzione per rendere l'animazione fluida
function createScrollTrigger2() {
  // Prima animazione
  ScrollTrigger.create({
    //markers: true,
    scrub: true,
    trigger: ".hero-trigger",
    start: "top 95%",
    end: "top 85% ",
    //toggleActions: "play none none reset",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(".usp .word, .h1-usp .word", {
        opacity: 0,
        x: "-100vw",
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.3 },
      })
        .to(
          ".heading-container",
          {
            x: "50vw",
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          ".brand_header",
          {
            y: "-10rem",
            opacity: 0,
            ease: "back.out(1.7)",
            duration: 1,
          },
          "<"
        );
    },
    onLeaveBack: () => {
      const tl = gsap.timeline();
      tl.to(".usp .word, .h1-usp .word", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.3 },
      })
        .to(
          ".heading-container",
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          ".brand_header",
          {
            y: 0,
            opacity: 1,
            ease: "back.out(1.7)",
            duration: 1,
          },
          "<"
        );
    },
  });

  // Seconda animazione
  ScrollTrigger.create({
    trigger: ".hero-trigger",
    start: "bottom 35%",
    end: "bottom center",
    scrub: true,
    //markers: true,
    toggleActions: "play none none reverse",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to("#nav", {
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 5px 2px rgba(0, 0, 0, 0.4)",
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          "#logo-home",
          {
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          ".call, .header",
          {
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          ".cta-contact-nav",
          { y: 0, duration: 0.5, ease: "back.out(1.7)" },
          "<"
        );
    },
    onLeaveBack: () => {
      const tl = gsap.timeline();
      tl.to(
        ".call, .header",
        {
          opacity: 1,
          duration: 1,
          ease: "none",
        },
        "<"
      )
        .to(
          "#nav",
          {
            backdropFilter: "blur(0px)", // Rimuove l'effetto blur
            boxShadow: "none", // Rimuove il box shadow
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          "#logo-home",
          {
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          ".cta-contact-nav",
          {
            y: "-5rem",
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "<"
        );
    },
  });

  // Forza un refresh di ScrollTrigger
  ScrollTrigger.refresh();
}

//FLIP animation

function initializeScrollFlipAnimations() {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }

  // ScrollTrigger.normalizeScroll(true); // Rimosso per evitare interferenze con touch-action

  $("[tr-scrollflip-element='component']").each(function (index) {
    let componentEl = $(this),
      originEl = componentEl.find("[tr-scrollflip-element='origin']"),
      targetEl = componentEl.find("[tr-scrollflip-element='target']"),
      scrubStartEl = componentEl.find("[tr-scrollflip-scrubstart]"),
      scrubEndEl = componentEl.find("[tr-scrollflip-scrubend]");

    let startSetting = attr(
        "top top",
        scrubStartEl.attr("tr-scrollflip-scrubstart")
      ),
      endSetting = attr(
        "bottom bottom",
        scrubEndEl.attr("tr-scrollflip-scrubend")
      ),
      staggerSpeedSetting = attr(
        0,
        componentEl.attr("tr-scrollflip-staggerspeed")
      ),
      staggerDirectionSetting = attr(
        "start",
        componentEl.attr("tr-scrollflip-staggerdirection")
      ),
      scaleSetting = attr(false, componentEl.attr("tr-scrollflip-scale")),
      breakpointSetting = attr(0, componentEl.attr("tr-scrollflip-breakpoint"));

    let timeline, resizeTimer;

    originEl.each(function (index) {
      let flipId = $(this).attr("data-flip-id");
      if (flipId) {
        targetEl
          .filter(`[data-flip-id='${flipId}']`)
          .attr("data-flip-id", flipId);
      }
    });

    function createTimeline() {
      if (timeline) {
        timeline.kill();
        gsap.set(targetEl, { clearProps: "all" });
      }

      $("body").addClass("scrollflip-relative");
      gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
        const state = Flip.getState(originEl);
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scrubStartEl,
            endTrigger: scrubEndEl,
            start: startSetting,
            end: endSetting,
            scrub: true,
          },
        });
        timeline.add(
          Flip.from(state, {
            targets: targetEl,
            scale: scaleSetting,
            stagger: {
              amount: staggerSpeedSetting,
              from: staggerDirectionSetting,
            },
          })
        );
      });
      $("body").removeClass("scrollflip-relative");
    }

    createTimeline();

    window.addEventListener(
      "resize",
      debounce(() => {
        createTimeline();
      }, 250)
    );
  });
}

//-----------------------------------fine flip

//----------------------------------------page transition

function setupCecoStrategy() {
  let cecoSplit = new SplitType(".ceco-heading", {
    types: "words",
    tagName: "span",
  });

  let animationCeco = gsap.fromTo(
    ".ceco-heading .word",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.5 },
    }
  );

  // Crea il ScrollTrigger e collega l'animazione
  ScrollTrigger.create({
    trigger: ".connessioni-section",
    start: "top 30%",
    end: "bottom bottom",
    toggleActions: "play none none resume",
    animation: animationCeco,
  });

  let isMobile = window.innerWidth < 768;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".trigger-ceco",
      start: "bottom 80%",
      end: "bottom top",
      scrub: true,
    },
  });

  // Animazioni per tutte le dimensioni
  tl.to(".top-wrapper", {
    y: "-55vh",
    duration: 1,
    borderRadius: "5rem",
  })
    .to(
      ".ceco-heading",
      {
        opacity: 0,
        duration: 1,
      },
      "<"
    )
    .fromTo(
      ".inner-section",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      },
      "<"
    );

  // Condizione specifica per mobile
  if (isMobile) {
    // Movimento di bottom-wrapper specifico per mobile
    tl.to(
      ".bottom-wrapper",
      {
        y: "70vh",
        duration: 1,
        borderRadius: "5rem",
      },
      "<"
    );
  } else {
    // Movimento di bottom-wrapper per desktop e tablet
    tl.to(
      ".bottom-wrapper",
      {
        y: "60vh",
        duration: 1,
        borderRadius: "5rem",
      },
      "<"
    );
  }
}

//------------------------ menu navbar

//
//Swiper
function swiperHome() {
  var swiper = new Swiper(".swiper-container-home", {
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
    speed: 500,
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
      slide.style.opacity = index === swiper.activeIndex ? 1 : 0.6;
    });

    // Applica animazioni GSAP
    gsap.to(slides[swiper.activeIndex].querySelector(".parallax-bg-img"), {
      scale: 1.1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    // Animazioni parallax per slide precedenti e successive
    if (slides[swiper.activeIndex - 1]) {
      gsap.to(
        slides[swiper.activeIndex - 1].querySelector(".parallax-bg-img"),
        {
          scale: 0.5,
          opacity: 0.6,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
    if (slides[swiper.activeIndex + 1]) {
      gsap.to(
        slides[swiper.activeIndex + 1].querySelector(".parallax-bg-img"),
        {
          scale: 0.5,
          opacity: 0.6,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
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

  observer.observe(document.querySelector(".swiper-container-home"));
}

//
function toggleCeco() {
  let currentOpenContainer = null;
  const pageWrapper = document.querySelector(".page-wrapper");

  document.querySelectorAll("#ceco .card-item").forEach((btn) => {
    const targetSelector = btn.getAttribute("data-ceco");

    const serviceContainer = document.querySelector(
      `.ceco-popup[data-ceco="${targetSelector}"]`
    );

    if (!serviceContainer) {
      console.error(`Service container for ${targetSelector} not found.`);
      return;
    }

    // Funzione per gestire l'hover e il touch
    function handleHover() {
      if (!btn.classList.contains("active")) {
        gsap.to(btn.querySelector(".card-item-wrapper"), {
          borderBottomRightRadius: "1rem",
          borderBottomLeftRadius: "15rem",
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(btn.querySelector(".plus-btn-ceco"), {
          color: "#f2f2f2",
          rotation: 90,
          scale: 1.1,
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(btn.querySelectorAll(".vector-8, .vector-9"), {
          strokeWidth: "1.5",
          duration: 0.5,
          ease: "ease.out",
        });
      }
    }

    function handleHoverOut() {
      if (!btn.classList.contains("active")) {
        gsap.to(btn.querySelector(".card-item-wrapper"), {
          borderBottomRightRadius: "10rem",
          borderBottomLeftRadius: "1rem",
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(btn.querySelector(".plus-btn-ceco"), {
          color: "",
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(btn.querySelectorAll(".vector-8, .vector-9"), {
          strokeWidth: "",
          duration: 0.5,
          ease: "ease.out",
        });
      }
    }

    // Aggiungi eventi hover e touch
    btn.addEventListener("mouseenter", handleHover);
    btn.addEventListener("mouseleave", handleHoverOut);
    btn.addEventListener("touchstart", handleHover);
    btn.addEventListener("touchend", handleHoverOut);

    btn.addEventListener("click", () => {
      const isOpen = serviceContainer.classList.contains("open");

      if (currentOpenContainer && currentOpenContainer !== serviceContainer) {
        // Chiudi il container attualmente aperto
        gsap.to(currentOpenContainer, { opacity: 0, height: 0, duration: 0.5 });
        currentOpenContainer.classList.remove("open");
        currentOpenContainer = null;
        gsap.to(pageWrapper, { opacity: 1, duration: 0.5 });
      }

      if (isOpen) {
        // Chiudi il container abbinato al pulsante
        gsap.to(serviceContainer, { opacity: 0, height: 0, duration: 0.5 });
        serviceContainer.classList.remove("open");
        currentOpenContainer = null;
        gsap.to(pageWrapper, { opacity: 1, duration: 0.5 });
      } else {
        // Apri il container abbinato al pulsante
        gsap.set(serviceContainer, { height: "auto" });
        const height = serviceContainer.offsetHeight;
        gsap.fromTo(
          serviceContainer,
          { height: 0 },
          { height: height, duration: 0.5 }
        );
        gsap.to(serviceContainer, { opacity: 1, duration: 0.5 });
        serviceContainer.classList.add("open");
        currentOpenContainer = serviceContainer;
        gsap.to(pageWrapper, { opacity: 0.5, duration: 0.5 });
      }
    });

    // Aggiungi evento per il pulsante di chiusura
    const closeButton = serviceContainer.querySelector(".popup-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        gsap.to(serviceContainer, { opacity: 0, height: 0, duration: 0.5 });
        serviceContainer.classList.remove("open");
        currentOpenContainer = null;
        gsap.to(pageWrapper, { opacity: 1, duration: 0.5 });
      });
    } else {
      console.error(
        `Close button not found in service container for ${targetSelector}`
      );
    }
  });
}
//
// Assicurati di includere GSAP e ScrollTrigger nel tuo progetto

function changeCSSVariablesOnScroll() {
  // Colore originale e nuovo della navbar
  const originalNavColor = "transparent";
  const newNavColor = "#0d0d0d";

  // Funzione per cambiare il colore di sfondo della navbar
  function changeNavColor(color) {
    gsap.to(".background-nav", {
      backgroundColor: color,
      duration: 0,
      ease: "none",
    });
  }

  // Quando il bottom di .trigger-ceco-2 ha scrollato verso l'alto di 100vh
  ScrollTrigger.create({
    trigger: ".trigger-ceco-2",
    start: "top+=100vh top",
    onEnter: () => changeNavColor(newNavColor), // Cambia il colore al nuovo
    onLeaveBack: () => changeNavColor(originalNavColor), // Ripristina il colore originale
  });

  // Quando il bottom di .trigger-ceco-2 raggiunge il top della viewport (scorrendo verso il basso)
  ScrollTrigger.create({
    trigger: ".trigger-ceco-2",
    start: "bottom top",
    onEnterBack: () => changeNavColor(newNavColor), // Cambia il colore al nuovo
    onLeave: () => changeNavColor(originalNavColor), // Ripristina il colore originale
  });
}
//

function animateCecoOnScroll() {
  // Funzione per attivare l'animazione continua
  function startContinuousRotation() {
    // Rotazione continua in senso orario per ceco-element
    gsap.to(".ceco-element", {
      rotation: "+=360",
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    // Rotazione continua in senso antiorario per ceco-graphic-item
    gsap.to(".ceco-graphic-item", {
      rotation: "-=360",
      duration: 10,
      ease: "none",
      repeat: -1,
    });
  }

  // Quando il bottom di .trigger-ceco-2 ha scrollato verso l'alto di 80vh
  ScrollTrigger.create({
    trigger: ".trigger-ceco-2",
    start: "top+=80vh top",
    onEnter: startContinuousRotation,
    onLeaveBack: () => {
      // Fermare l'animazione e resettare la rotazione quando si torna indietro
      gsap.set(".ceco-element", { rotation: 0 });
      gsap.set(".ceco-graphic-item", { rotation: 0 });
      ScrollTrigger.refresh(); // Assicura che ScrollTrigger sia aggiornato
    },
  });
}
