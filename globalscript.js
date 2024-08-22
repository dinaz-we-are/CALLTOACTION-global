document.addEventListener("DOMContentLoaded", function () {
  initializeScripts();
});

async function initializeScripts() {
  await loadGSAP();
  await loadAdditionalScripts();
  initializeMainFunctions();
}

async function loadGSAP() {
  const gsapScripts = [
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js",
  ];
  
  await Promise.all(gsapScripts.map(src => loadScript(src)));
}

async function loadAdditionalScripts() {
  const additionalScripts = [
    "https://unpkg.com/split-type",
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
  ];

  await Promise.all(additionalScripts.map(src => loadScript(src)));
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${src}"]`)) { // Controlla se lo script è già stato caricato
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      resolve(); // Risolvi subito se lo script è già stato caricato
    }
  });
}

function initializeMainFunctions() {
  gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin, Observer);
  gsap.set(".menu-container", { x: "-100vw", opacity: 0 });
  gsap.set(".menu-wrapper-row", { width: 0 });

  window.addEventListener("resize", debounce(() => ScrollTrigger.refresh(), 200));  
  burgerAnimation();
  changeLogoColor();
  dataColor();
  initializeScrollControlButtons();
  initializeHoverAnimations();
  initializeSimpleHoverTouchAnimations();
  ctaAnimations();
  info();

  if (typeof pageSpecificFunctions === "function") {
    pageSpecificFunctions();
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
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
  tl.to("#cover-div", { opacity: 0, duration: 0.025 })
    .to(".wrapper-hero", { opacity: 1, duration: 0.025 },"<")
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
      {
        delay: 0.5,
        opacity: 1,
        y: "0",
        duration: 0.5,
        ease: "back.out(1.7)",
      },
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
}

  //animazione freccia
function arrowAnima() {
  let arrowAnimation = gsap.to("#arrow", {
    scale: 0.5,
    ease: "power1",
    duration: 2,
    repeat: -1,
    yoyo: true,
  });

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
  arrowAnimation.play();
  }
//fine animazione freccia
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
//fine flip  
//swiper
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
//ceco  
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
  //Burger
  function burgerAnimation(isHomePage = false) {
    const burgerButton = document.querySelector("#burger");
    const burgerMobileButton = document.querySelector("#burger-mobile");
    const brandNavbar = document.querySelector(".brand-navbar");
    let menuOpen = false;
  
    function performScroll() {
      gsap.to(document.body, {
        duration: 0.2,
        opacity: 0,
        onComplete: function () {
          gsap.to(window, {
            scrollTo: { y: 0 },
            onComplete: function () {
              gsap.to(document.body, { duration: 0.2, opacity: 1 });
            },
          });
        },
      });
    }
  
    function closeMenu(isMobile, callback) {
      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh();
          if (callback) callback();
        },
      });
  
      tl.to(".menu-container", {
        x: "-100vw",
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
      })
        .to(
          "#logo-hidden",
          { opacity: 0, rotateY: 90, duration: 0.5, ease: "power1.out" },
          "<"
        )
        .to(
          "#logo-home",
          { opacity: "", rotateY: 0, duration: 0.5, ease: "power1.out" },
          ">"
        )
        .call(() => changeLogoColor(), null, 0)
        .to("#nav", { backgroundColor: "", duration: 0.5, ease: "linear" }, "<")
        .to(".line-middle", { opacity: 1, ease: "power1.out" }, "<")
        .to(
          ".line-bottom",
          { y: "0", rotationZ: 0, duration: 0.3, ease: "power1.out" },
          "<"
        )
        .to(
          ".line-top",
          { y: "0", rotationZ: 0, duration: 0.3, ease: "power1.out" },
          "<"
        )
        .to(
          ".menu-wrapper-row",
          {
            width: 0,
            duration: 0.2,
            ease: "power1.out",
            stagger: isMobile ? 0.1 : 0.2,
          },
          "<"
        )
        .set(".cta-contact-nav", { display: "flex" }, "<")
        .set(".brand-container", { display: "none" }, "<")
        .to(
          ".cta-contact-nav",
          {
            rotationX: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "<"
        )
        .to(".page-wrapper", { opacity: 1 }, "-=0.6")
        .set(".menu-wrapper", { display: "none" }, "-=0.4");
  
      if (isHomePage) {
        tl.to(".background-nav", { opacity: 1, duration: 0 }, "-=1");
      }
  
      menuOpen = false;
    }
  
    function animateBurger(isMobile, callback) {
      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh();
          if (callback) callback();
        },
      });
  
      if (!menuOpen) {
        tl.set(".menu-wrapper", { display: "flex" })
          .to(".page-wrapper", { opacity: 0 }, "-=0.5")
          .to(".cta-contact-nav", {
            rotationX: 90,
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          })
          .set(".brand-container", { display: "flex" })
          .set(".cta-contact-nav", { display: "none" }, "<")
          .to(
            ".menu-wrapper-row",
            {
              width: "100%",
              duration: 0.2,
              ease: "power1.out",
              stagger: 0.2,
            },
            "-=0.5"
          )
          // Prima parte dell'animazione: movimento verticale
          .to(
            ".line-top",
            {
              y: isMobile ? "11px" : "14px",
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          )
          .to(
            ".line-bottom",
            {
              y: isMobile ? "-11px" : "-14px",
              duration: 0.3,
              ease: "power1.out",
            },
            "<"
          )
          .to(
            ".line-middle",
            { opacity: 0, duration: 0.2, ease: "power1.out" },
            "<"
          )
          // Seconda parte dell'animazione: rotazione
          .to(".line-top", { rotationZ: -45, duration: 0.2, ease: "power1.out" })
          .to(
            ".line-bottom",
            { rotationZ: 45, duration: 0.2, ease: "power1.out" },
            "<"
          );
        if (isHomePage) {
          tl.to(".background-nav", { opacity: 0, duration: 0.5 }, "-=1");
        }
        tl.to(
          "#nav",
          { backgroundColor: "#f2f2f2", duration: 0.5, ease: "linear" },
          "-=0.8"
        )
          .to(
            "#logo-home",
            { opacity: 0, rotateY: 90, duration: 0.5, ease: "power1.out" },
            "<"
          )
          .to(
            "#logo-hidden",
            { opacity: 1, rotateY: 0, duration: 0.5, ease: "power1.out" },
            ">"
          )
          .call(() => changeLogoColor("", "", "", "#0d0d0d"), null, "-=0.6")
          .to(
            ".menu-container",
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            },
            "-=0.6"
          );
  
        menuOpen = true;
      } else {
        closeMenu(isMobile, callback);
      }
    }
  
    burgerButton.addEventListener("click", () => animateBurger(false));
    burgerMobileButton.addEventListener("click", () => animateBurger(true));
  
    if (isHomePage) {
      brandNavbar.addEventListener("click", function scrollToTop() {
        const menuWrapper = document.querySelector(".menu-wrapper");
        if (menuWrapper && getComputedStyle(menuWrapper).display !== "none") {
          // Se è visibile, chiudi il menu prima di eseguire l'animazione di scroll
          const isMobile = window.innerWidth <= 767;
          closeMenu(isMobile, performScroll);
        } else {
          performScroll();
        }
      });
    }
  }
  
   //
  function changeLogoColor(
    navLogoColor = "",
    shapeColor = "",
    brandArrowColor = "",
    brandCall = ""
  ) {
    gsap.to(":root", {
      "--navlogo-c": navLogoColor,
      "--shape-color": shapeColor,
      "--brand-arrow": brandArrowColor,
      "--brand-call": brandCall,
      duration: 0.5,
      ease: "linear",
    });
  }
  //
  
  function initializeScrollControlButtons() {
    const blockScrollButtons = document.querySelectorAll("[data-block-scroll]");
    const unblockScrollButtons = document.querySelectorAll(
      "[data-unblock-scroll]"
    );
    const toggleScrollButtons = document.querySelectorAll("[data-toggle-scroll]");
    const scrollContainers = document.querySelectorAll("[data-scroll-container]");
    let scrollPosition = { top: 0, left: 0 };
  
    function saveScrollPosition() {
      scrollPosition.top = window.scrollY || document.documentElement.scrollTop;
      scrollPosition.left = window.scrollX || document.documentElement.scrollLeft;
    }
  
    function restoreScrollPosition() {
      window.scrollTo(scrollPosition.left, scrollPosition.top);
    }
  
    function handleBlockScroll() {
      saveScrollPosition();
      document.body.classList.add("no-scroll");
      scrollContainers.forEach((container) => {
        container.classList.add("scrollable");
      });
    }
  
    function handleUnblockScroll() {
      restoreScrollPosition();
      document.body.classList.remove("no-scroll");
      scrollContainers.forEach((container) => {
        container.classList.remove("scrollable");
      });
    }
  
    function handleToggleScroll() {
      if (document.body.classList.contains("no-scroll")) {
        restoreScrollPosition();
        document.body.classList.remove("no-scroll");
      } else {
        saveScrollPosition();
        document.body.classList.add("no-scroll");
      }
    }
  
    blockScrollButtons.forEach((button) => {
      button.addEventListener("click", handleBlockScroll);
    });
  
    unblockScrollButtons.forEach((button) => {
      button.addEventListener("click", handleUnblockScroll);
    });
  
    toggleScrollButtons.forEach((button) => {
      button.addEventListener("click", handleToggleScroll);
    });
  }
  //
  
  //DATACOLOR
  function dataColor() {
    const elementsWithColor = document.querySelectorAll("[data-color]");
  
    elementsWithColor.forEach((element) => {
      const color = element.getAttribute("data-color");
  
      if (color) {
        gsap.to(element, {
          color: color,
          duration: 1,
          ease: "power1",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "top top",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        console.warn(
          `Element ${element} does not have a valid data-color attribute.`
        );
      }
    });
  }
  //Fine data Color
  // SecondSection
  function secondSection(isHomePage = false) {
    if (isHomePage) {
      // Animazione zIndex Hero specifica per la home page
      ScrollTrigger.create({
        trigger: ".hero-spacer",
        start: "top 20%",
        end: "top top",
        onEnter: () => {
          gsap.to("#hero", { zIndex: 1 });
        },
      });
    }
  
    // Animazione con ScrollTrigger per .focus-wrapper
  
    // Match Media per diverse risoluzioni
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 320px) and (max-width: 767px)", () => {
      console.log("Mobile breakpoint active");
      gsap.fromTo(
        "#focus",
        { opacity: 1, transformOrigin: "top left" },
        {
          x: "10vw",
          scale: 0.8,
          opacity: 0.5,
          y: "33%",
          rotate: 90,
          transformOrigin: "top left",
          ease: "power1",
          scrollTrigger: {
            trigger: ".path-section",
            start: "top 90%",
            end: "top top",
            toggleActions: "play none none none",
          },
        }
      );
    });
  
    mm.add("(min-width: 768px) and (max-width: 991px)", () => {
      console.log("Tablet breakpoint active");
      gsap.fromTo(
        "#focus",
        { opacity: 1, transformOrigin: "top left" },
        {
          x: "12vw",
          opacity: 0.5,
          rotate: 90,
          y: "50%",
          transform: "translateY(-50%)",
          transformOrigin: "top left",
          ease: "power1",
          scrollTrigger: {
            trigger: ".path-section",
            start: "top 80%",
            end: "top top",
            toggleActions: "play none none none",
          },
        }
      );
    });
  
    mm.add("(min-width: 992px)", () => {
      console.log("Desktop breakpoint active");
      gsap.fromTo(
        "#focus",
        { opacity: 1, transformOrigin: "top left" },
        {
          x: "10vw",
          opacity: 0.5,
          rotate: 90,
          y: "50%",
          transform: "translateY(-50%)",
          transformOrigin: "top left",
          ease: "power1",
          scrollTrigger: {
            trigger: ".path-section",
            start: "top 80%",
            end: "top top",
            toggleActions: "play none none none",
          },
        }
      );
    });
  
    const containers = document.querySelectorAll(".path-container");
    const images = document.querySelectorAll(".img-target");
  
    gsap.matchMedia().add("(min-width: 320px) and (max-width: 991px)", () => {
      // Regole per schermi mobile
      containers.forEach((container) => {
        const imgId = container.getAttribute("data-img-id");
        const image = document.getElementById(imgId);
        const customPathVectors = container.querySelectorAll(".path-vector");
  
        customPathVectors.forEach((customPathVector) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "top top",
              toggleActions: "play none none reverse",
            },
          });
  
          tl.from(customPathVector, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            x: -200,
            ease: "power1.out",
          });
  
          if (isHomePage) {
            tl.to(customPathVector, {
              rotation: 90,
              x: "-0.6rem",
              y: "0.6rem",
              duration: 0.2,
              ease: "power1.in",
            });
          }
        });
  
        if (image) {
          gsap.fromTo(
            container,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: container,
                start: "top 90%",
                end: "top 10%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power1.out",
                  });
                  gsap.to(image, {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power1.out",
                  });
                },
                onLeave: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power1.out" });
                },
                onEnterBack: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power1.out",
                  });
                  gsap.to(image, {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power1.out",
                  });
                },
                onLeaveBack: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power1.out" });
                },
              },
            }
          );
        }
      });
    });
  
    gsap.matchMedia().add("(min-width: 992px)", () => {
      // Regole per schermi desktop
      containers.forEach((container) => {
        const imgId = container.getAttribute("data-img-id");
        const image = document.getElementById(imgId);
        const customPathVectors = container.querySelectorAll(".path-vector");
  
        customPathVectors.forEach((customPathVector) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "top top",
              toggleActions: "play none none reverse",
            },
          });
  
          tl.from(customPathVector, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            x: -200,
            ease: "power1.out",
          });
  
          if (isHomePage) {
            tl.to(customPathVector, {
              rotation: 90,
              x: "-1rem",
              y: "1rem",
              duration: 0.2,
              ease: "power1.in",
            });
          }
        });
  
        if (image) {
          gsap.fromTo(
            container,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power1.out",
                  });
                  gsap.to(image, {
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out",
                  });
                },
                onLeave: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power1.out" });
                },
                onEnterBack: () => {
                  gsap.to(images, {
                    opacity: 0,
                    duration: 1,
                    ease: "power1.out",
                  });
                  gsap.to(image, {
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out",
                  });
                },
                onLeaveBack: () => {
                  gsap.to(image, { opacity: 0, duration: 1, ease: "power1.out" });
                },
              },
            }
          );
        }
      });
    });
    gsap.from(".img-tg-cont", {
      y: "200",
      opacity: 0,
      duration: 1.5,
      ease: "linear",
      scrollTrigger: {
        trigger: ".focus-wrapper",
        start: "top 20%",
        end: "top top",
        toggleActions: "play none none reverse",
      },
    });
  }
  
  //
  
  function initializeHoverAnimations() {
    const boxes = document.querySelectorAll(".link-wrapper-menu");
  
    boxes.forEach((box) => {
      // Crea una timeline per hover
      const hoverTimeline = gsap.timeline({ paused: true });
  
      hoverTimeline.fromTo(
        box.querySelector(".icon-menu-link"),
        {
          x: "-15rem",
          scale: 0.5,
          opacity: 0,
        },
        {
          x: "-0.5rem",
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(3)",
        },
        0
      );
      hoverTimeline.to(
        box.querySelector(".sublink"),
        {
          scale: 0.8,
          y: 5,
          duration: 0.5,
          color: "#f06",
          transformOrigin: "top left",
          ease: "power1.out",
        },
        0
      );
      hoverTimeline.to(
        box.querySelector(".link-heading"),
        {
          rotationZ: 3,
          x: "1rem",
          y: 5,
          scale: 1.2,
          duration: 0.3,
          ease: "power1.out",
          transformOrigin: "bottom left",
        },
        0.1
      );
  
      // Crea una timeline per touch
      const touchTimeline = gsap.timeline({ paused: true });
      touchTimeline.fromTo(
        box.querySelector(".icon-menu-link"),
        {
          x: "-15rem",
          scale: 0.5,
          opacity: 0,
        },
        {
          x: "-0.5rem",
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(3)",
        },
        0
      );
      touchTimeline.to(
        box.querySelector(".sublink"),
        {
          scale: 0.8,
          y: 5,
          duration: 0.5,
          color: "#f06",
          transformOrigin: "top left",
          ease: "power1.out",
        },
        0
      );
      touchTimeline.to(
        box.querySelector(".link-heading"),
        {
          rotationZ: 3,
          x: "1rem",
          y: 5,
          scale: 1.2,
          duration: 0.3,
          ease: "power1.out",
          transformOrigin: "bottom left",
        },
        0
      );
  
      // Gestisci gli eventi hover
      box.addEventListener("mouseenter", () => hoverTimeline.play());
      box.addEventListener("mouseleave", () => hoverTimeline.reverse());
  
      // Gestisci gli eventi touch
      box.addEventListener("touchstart", () => touchTimeline.play());
      box.addEventListener("touchend", () => touchTimeline.reverse());
    });
  }
  
  function initializeSimpleHoverTouchAnimations() {
    const links = document.querySelectorAll(".link-text-menu");
  
    links.forEach((link) => {
      // Crea una timeline per hover
      const hoverTimeline = gsap.timeline({ paused: true });
  
      hoverTimeline.to(
        link,
        {
          rotationZ: 10, // leggera rotazione
          color: "#f06", // cambio colore del testo
          duration: 0.3,
          ease: "back.out(3)",
        },
        0
      );
  
      // Crea una timeline per touch
      const touchTimeline = gsap.timeline({ paused: true });
  
      touchTimeline.to(
        link,
        {
          rotationZ: 10, // leggera rotazione
          color: "#f06", // cambio colore del testo
          duration: 0.3,
          ease: "back.out(3)",
        },
        0
      );
  
      // Gestisci gli eventi hover
      link.addEventListener("mouseenter", () => hoverTimeline.play());
      link.addEventListener("mouseleave", () => hoverTimeline.reverse());
  
      // Gestisci gli eventi touch
      link.addEventListener("touchstart", () => touchTimeline.play());
      link.addEventListener("touchend", () => touchTimeline.reverse());
    });
  }
  //
  //info
  function info() {
    document.querySelectorAll(".cm-talk-content").forEach((talk) => {
      const serviceContainer = talk.querySelector(".cta-container");
      const plusBtn = talk.querySelector(".plus-btn-cta");
      const trigger = talk.querySelector(".cta-service-btn");
  
      let isPaused = false;
  
      // Funzione per gestire l'hover e il touch
      function handleHover() {
        if (!isPaused) {
          gsap.to(plusBtn, {
            scale: 1.5,
            rotation: 90,
            color: "#f06",
            duration: 0.5,
            ease: "ease.out",
          });
          gsap.to(
            plusBtn.querySelectorAll(".ellipse-47"),
            {
              stroke: "transparent",
              duration: 0.5,
              ease: "ease.out",
            },
            0
          );
        }
      }
  
      function handleHoverOut() {
        if (!isPaused) {
          gsap.to(plusBtn, {
            rotation: 0,
            scale: 1,
            color: "",
            duration: 0.5,
            ease: "ease.out",
          });
          gsap.to(
            plusBtn.querySelectorAll(".ellipse-47"),
            {
              stroke: "",
              duration: 0.5,
              ease: "ease.out",
            },
            0
          );
        }
      }
  
      // Aggiungi eventi hover e touch
      plusBtn.addEventListener("mouseenter", handleHover);
      plusBtn.addEventListener("mouseleave", handleHoverOut);
      plusBtn.addEventListener("touchstart", handleHover);
      plusBtn.addEventListener("touchend", handleHoverOut);
  
      trigger.addEventListener("click", () => {
        const isOpen = serviceContainer.classList.contains("open");
        if (isOpen) {
          // Close the service section
          gsap.to(serviceContainer, { height: 0, duration: 0.5 });
          gsap.to(plusBtn, {
            scale: 1,
            rotation: 0,
            color: "",
            duration: 0.5,
            ease: "ease.out",
          });
          gsap.to(
            plusBtn.querySelectorAll(".ellipse-47, .vector-9"),
            {
              stroke: "",
              duration: 0.5,
              ease: "ease.out",
            },
            0
          );
          serviceContainer.classList.remove("open");
          isPaused = false;
        } else {
          // Open the service section
          gsap.set(serviceContainer, { height: "auto" });
          const height = serviceContainer.offsetHeight;
          gsap.fromTo(
            serviceContainer,
            { height: 0 },
            { height: height, duration: 0.5 }
          );
          gsap.to(plusBtn, {
            scale: 1.5,
            rotation: 90,
            color: "#f06",
            duration: 0.5,
            ease: "ease.out",
          });
          gsap.to(
            plusBtn.querySelectorAll(".ellipse-47, .vector-9"),
            {
              stroke: "transparent",
              duration: 0.5,
              ease: "ease.out",
            },
            0
          );
          serviceContainer.classList.add("open");
          isPaused = true;
        }
      });
    });
  }
  
  //
  //CTA
  function ctaAnimations() {
    const boxes = document.querySelectorAll(".btn-cta");
  
    boxes.forEach((box) => {
      const gradientDiv = box.querySelector(".button-bg-gradient");
  
      if (!gradientDiv) {
        console.error("Element gradientDiv not found.");
        return;
      }
  
      const color1 = getComputedStyle(gradientDiv)
        .getPropertyValue("--background-first")
        .trim();
      const color2 = getComputedStyle(gradientDiv)
        .getPropertyValue("--primary")
        .trim();
  
      // Crea una timeline per hover e touch
      const createTimeline = (width) => {
        const animationTimeline = gsap.timeline({ paused: true });
  
        animationTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            duration: 0.8,
            ease: "linear",
          },
          0
        );
        animationTimeline.to(
          box.querySelector(".button-spacer"),
          {
            width: width,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0
        );
        animationTimeline.to(
          ":root",
          {
            "--padding-button": "20",
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );
        animationTimeline.to(
          box.querySelector(".text-cta"),
          {
            scale: 1.1,
            duration: 0.6,
            ease: "power1.out",
          },
          0
        );
  
        // Gestisci gli eventi hover e touch
        const playAnimation = () => animationTimeline.play();
        const reverseAnimation = () => animationTimeline.reverse();
  
        box.addEventListener("mouseenter", playAnimation);
        box.addEventListener("mouseleave", reverseAnimation);
        box.addEventListener("touchstart", playAnimation);
        box.addEventListener("touchend", reverseAnimation);
  
        return animationTimeline;
      };
  
      gsap.matchMedia().add("(min-width: 992px)", () => {
        createTimeline("10%");
      });
  
      gsap.matchMedia().add("(min-width: 320px) and (max-width: 991px)", () => {
        createTimeline("0%");
      });
  
      ScrollTrigger.create({
        trigger: box,
        start: "top 95%",
        end: "bottom 5%",
        toggleActions: "play none none reverse",
        onEnter: () => gsap.to(box, { x: 0, duration: 0.6, ease: "power2.out" }),
      });
  
      // Attivare l'animazione in loop per viewport < 992px
      gsap.matchMedia().add("(max-width: 992px)", () => {
        const loopTimeline = gsap.timeline({ repeat: -1, paused: true });
  
        loopTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color2}, ${color1})`,
            duration: 1.6,
            ease: "linear",
          },
          0
        );
        loopTimeline.to(
          gradientDiv,
          {
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            duration: 1.6,
            ease: "linear",
          },
          1.5
        );
  
        loopTimeline.play();
  
        // Gestisci gli eventi touch per interrompere e riavviare l'animazione in loop
        const stopLoop = () => loopTimeline.pause();
        const resumeLoop = () => loopTimeline.play();
  
        box.addEventListener("touchstart", stopLoop);
        box.addEventListener("touchend", resumeLoop);
        box.addEventListener("mouseenter", stopLoop);
        box.addEventListener("mouseleave", resumeLoop);
      });
    });
  }
  
  //videoPause
  
  function videoPause() {
    // Trova tutti i contenitori di video di sfondo
    const videoContainers = document.querySelectorAll(
      "div.w-background-video[data-pause-on-scroll]"
    );
    console.log("Found video containers:", videoContainers);
  
    videoContainers.forEach((container) => {
      const video = container.querySelector("video");
      if (video) {
        ScrollTrigger.create({
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            video.play();
          },
          onLeave: () => {
            video.pause();
          },
          onEnterBack: () => {
            video.play();
          },
          onLeaveBack: () => {
            video.pause();
          },
        });
      }
    });
  }
  //
  //faq
  function toggleFaq() {
    document.querySelectorAll(".dropdown-container").forEach((faq) => {
      const faqContainer = faq.querySelector(".p-toggle");
      const dropBtn = faq.querySelector(".drop-toggle");
      const trigger = faq.querySelector(".dropdown-wrapper");
  
      trigger.addEventListener("click", () => {
        const isOpen = faqContainer.classList.contains("open");
        if (isOpen) {
          // Close the service section
          gsap.to(faqContainer, { height: 0, duration: 0.5 });
          gsap.to(dropBtn, {
            rotation: 0,
            duration: 0.5,
            color: "",
            ease: "ease.out",
          });
  
          faqContainer.classList.remove("open");
        } else {
          // Open the service section
          gsap.set(faqContainer, { height: "auto" });
          const height = faqContainer.offsetHeight;
          gsap.fromTo(
            faqContainer,
            { height: 0 },
            { height: height, duration: 0.5 }
          );
          gsap.to(dropBtn, {
            rotation: 180,
            duration: 0.5,
            color: "#f06",
            ease: "ease.out",
          });
  
          faqContainer.classList.add("open");
        }
      });
    });
  }
  //TransitionPage
  function transitionPage() {
    let tl1 = gsap.timeline();
    tl1
      .to(".h1-page, .text-block-hero", {
        opacity: 1,
        x: "0rem",
        ease: "power2.out",
      })
      .to(".cover-page", { x: "0rem", opacity: 1, ease: "power2.out" }, "<")
      .to("#nav", {
        y: "0rem",
        ease: "power2.out",
      });
  
    // link click
    $("a:not(.excluded-class)").on("click", function (e) {
      let currentUrl = $(this).attr("href");
      const isMobile = window.innerWidth <= 767; // Condizione per verificare se è mobile
      const delay = isMobile ? parseInt($(this).attr("data-delay"), 10) : 0;
  
      if (
        $(this).prop("hostname") === window.location.host &&
        !currentUrl.includes("#") &&
        $(this).attr("target") !== "_blank"
      ) {
        e.preventDefault();
  
        if (delay) {
          // Se c'è un delay, esegui la transizione dopo il delay
          setTimeout(() => {
            let tl = gsap.timeline({
              onComplete: () => (window.location.href = currentUrl),
            });
  
            tl.fromTo(
              ".page-wrapper, #nav, .menu-wrapper",
              { xPercent: 0 },
              { xPercent: 100, opacity: 0 }
            );
          }, delay);
        } else {
          // Se non c'è delay, esegui immediatamente la transizione
          let tl = gsap.timeline({
            onComplete: () => (window.location.href = currentUrl),
          });
  
          tl.fromTo(
            ".page-wrapper, #nav, .menu-wrapper",
            { xPercent: 0 },
            { xPercent: 100, opacity: 0 }
          );
        }
      }
    });
  
    // On Back Button Tap
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };
  }
  //
  
  function navbarRepo(isHomePage = false) {
    const stickyElement = document.querySelector("#nav");
    const pathWrapper = isHomePage
      ? document.querySelector("#navbar-repo")
      : null;
    const menuWrapper = document.querySelector(".menu-wrapper");
    let navbarScrollTrigger = null;
    let isPathWrapperInView = false;
    let lastViewportHeight = window.innerHeight;
  
    const showAnim = gsap
      .from(stickyElement, {
        yPercent: -100,
        paused: true,
        duration: 0.2,
        ease: "ease.out",
      })
      .progress(1);
  
    function isMenuVisible() {
      return getComputedStyle(menuWrapper).display === "flex";
    }
  
    function createNavbarScrollTrigger() {
      return ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const currentViewportHeight = window.innerHeight;
  
          // Check if the menu is visible
          if (isMenuVisible()) {
            return; // Skip the animation if menu is visible
          }
  
          // Check if the viewport height changed significantly
          if (Math.abs(currentViewportHeight - lastViewportHeight) > 50) {
            lastViewportHeight = currentViewportHeight;
            if (currentViewportHeight > lastViewportHeight) {
              showAnim.play(); // Show navbar when address bar appears
            } else {
              showAnim.reverse(); // Hide navbar when address bar disappears
            }
            return;
          }
  
          // Normal scroll behavior
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    }
  
    function checkAndUpdateNavbar() {
      if (isHomePage && pathWrapper) {
        ScrollTrigger.create({
          trigger: pathWrapper,
          start: "top 20%",
          end: "bottom center",
          onEnter: () => {
            isPathWrapperInView = true;
            if (!navbarScrollTrigger) {
              navbarScrollTrigger = createNavbarScrollTrigger();
            }
          },
          onLeaveBack: () => {
            isPathWrapperInView = false;
            if (navbarScrollTrigger) {
              navbarScrollTrigger.kill();
              navbarScrollTrigger = null;
              gsap.set(stickyElement, { y: 0 });
            }
          },
        });
      } else {
        navbarScrollTrigger = createNavbarScrollTrigger();
      }
    }
  
    window.addEventListener(
      "resize",
      debounce(() => {
        lastViewportHeight = window.innerHeight;
        if (navbarScrollTrigger) {
          navbarScrollTrigger.kill();
          navbarScrollTrigger = createNavbarScrollTrigger();
        }
        checkAndUpdateNavbar();
      }, 200)
    );
  
    checkAndUpdateNavbar();
  
    // Observer per monitorare le modifiche a .menu-wrapper
    const observer = new MutationObserver(() => {
      if (navbarScrollTrigger) {
        navbarScrollTrigger.kill();
        navbarScrollTrigger = createNavbarScrollTrigger();
      }
    });
  
    observer.observe(menuWrapper, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  
  //
  //togglePortfolio
  function togglePortfolio() {
    document.querySelectorAll(".case-wrapper").forEach((cases) => {
      const caseContainer = cases.querySelector(".c-toggle");
      const dropBtn = cases.querySelector(".case-toggle");
      const trigger = cases.querySelector(".case-container");
  
      trigger.addEventListener("click", () => {
        const isOpen = caseContainer.classList.contains("open");
        if (isOpen) {
          // Close the service section
          gsap.to(caseContainer, { height: 0, duration: 0.5 });
          gsap.to(dropBtn, {
            rotation: 0,
            duration: 0.5,
            color: "",
            ease: "ease.out",
          });
  
          caseContainer.classList.remove("open");
        } else {
          // Open the service section
          gsap.set(caseContainer, { height: "auto" });
          const height = caseContainer.offsetHeight;
          gsap.fromTo(
            caseContainer,
            { height: 0 },
            { height: height, duration: 0.5 }
          );
          gsap.to(dropBtn, {
            rotation: 180,
            duration: 0.5,
            color: "#f06",
            ease: "ease.out",
          });
  
          caseContainer.classList.add("open");
        }
      });
    });
  }
  //
  //portfolio info
  function portfolioInfo() {
    let currentOpenContainer = null;
    let currentOpenButton = null;
  
    document.querySelectorAll(".div-content-portfolio").forEach((portfolio) => {
      const buttons = portfolio.querySelectorAll(".portfolio-btn-link");
      buttons.forEach((btn) => {
        const targetSelector = btn.getAttribute("data-btn");
        const serviceContainer = portfolio.querySelector(
          `.btn-link[data-btn="${targetSelector}"]`
        );
  
        // Funzione per gestire l'hover e il touch
        function handleHover() {
          if (!btn.classList.contains("active")) {
            gsap.to(btn.querySelector(".portfolio-btn"), {
              rotation: 0,
              scale: 1.1,
              color: "#f06",
              duration: 0.5,
              ease: "ease.out",
            });
            gsap.to(btn.querySelector(".text-btn-portfolio"), {
              color: "#f06",
              duration: 0.5,
              ease: "linear",
            });
          }
        }
  
        function handleHoverOut() {
          if (!btn.classList.contains("active")) {
            gsap.to(btn.querySelector(".portfolio-btn"), {
              scale: 1,
              color: "currentcolor",
              duration: 0.5,
              ease: "ease.out",
            });
            gsap.to(btn.querySelector(".text-btn-portfolio"), {
              color: "currentcolor",
              duration: 0.5,
              ease: "linear",
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
            gsap.to(currentOpenContainer, { height: 0, duration: 0.5 });
            currentOpenContainer.classList.remove("open");
            resetButtonState(currentOpenButton);
          }
  
          if (isOpen) {
            // Chiudi il container abbinato al pulsante
            gsap.to(serviceContainer, { height: 0, duration: 0.5 });
            serviceContainer.classList.remove("open");
            resetButtonState(btn);
            currentOpenContainer = null;
            currentOpenButton = null;
          } else {
            // Apri il container abbinato al pulsante
            gsap.set(serviceContainer, { height: "100%" });
            const height = serviceContainer.offsetHeight;
            gsap.fromTo(
              serviceContainer,
              { height: 0 },
              { height: height, duration: 0.5 }
            );
            serviceContainer.classList.add("open");
            currentOpenContainer = serviceContainer;
            currentOpenButton = btn;
            setButtonState(btn);
          }
        });
  
        function setButtonState(button) {
          button.classList.add("active");
          gsap.to(button.querySelector(".portfolio-btn"), {
            rotation: 90,
            scale: 1.1,
            color: "#f06",
            duration: 0.5,
            ease: "ease.out",
          });
          gsap.to(button.querySelector(".text-btn-portfolio"), {
            color: "#f06",
            duration: 0.5,
            ease: "linear",
          });
        }
  
        function resetButtonState(button) {
          if (button) {
            button.classList.remove("active");
            gsap.to(button.querySelector(".portfolio-btn"), {
              rotation: 0,
              scale: 1,
              color: "currentcolor",
              duration: 0.5,
              ease: "ease.out",
            });
            gsap.to(button.querySelector(".text-btn-portfolio"), {
              color: "currentcolor",
              duration: 0.5,
              ease: "linear",
            });
          }
        }
      });
    });
  }
  //
  //Modulo contactSelection
  function contactSelection() {
    var buttons = document.querySelectorAll("[data-contact-target]");
    var forms = document.querySelectorAll(".form-component");
    var contactSelection = document.querySelector(".contact-selection");
    var backButtons = document.querySelectorAll(".back-selection");
    var images = document.querySelectorAll(".image-form-cover");
  
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-contact-target");
        var form = document.querySelector(
          '.form-component[data-contact-origin="' + target + '"]'
        );
        var image = document.querySelector(
          '.image-form-cover[data-contact-target="' + target + '"]'
        );
  
        // Nascondi tutti i form
        forms.forEach(function (f) {
          gsap.to(f, { height: 0, duration: 0.5 });
        });
  
        // Nascondi tutte le immagini
        images.forEach(function (img) {
          gsap.to(img, { opacity: 0, duration: 0.5 });
        });
  
        // Animare l'altezza di .contact-selection a 0 se il target è diverso da "selection"
        if (target !== "selection") {
          gsap.to(contactSelection, {
            height: 0,
            duration: 0.5,
            onComplete: function () {
              contactSelection.style.display = "none";
            },
          });
        }
  
        // Delay e poi animare l'altezza del form specifico ad auto
        if (form) {
          gsap.to(form, { height: "auto", duration: 0.5, delay: 0.5 });
        }
  
        // Mostra l'immagine corrispondente
        if (image) {
          gsap.to(image, { opacity: 0.5, duration: 0.5, delay: 0.5 });
        }
      });
    });
  
    backButtons.forEach(function (backButton) {
      backButton.addEventListener("click", function () {
        var form = backButton.closest(".form-component");
        var target = backButton.getAttribute("data-contact-target");
  
        // Animare l'altezza del form a 0
        if (form) {
          gsap.to(form, {
            height: 0,
            duration: 0.5,
            onComplete: function () {
              form.style.height = "0";
            },
          });
        }
  
        // Nascondi tutte le immagini
        images.forEach(function (img) {
          gsap.to(img, { opacity: 0, duration: 0.5 });
        });
  
        // Delay e poi animare l'altezza di .contact-selection ad auto se il target è "selection"
        if (target === "selection") {
          gsap.set(contactSelection, { display: "flex" });
          gsap.to(contactSelection, {
            height: "auto",
            duration: 0.5,
            delay: 0.5,
          });
  
          // Mostra l'immagine di default
          var defaultImage = document.querySelector(
            '.image-form-cover[data-contact-target="0"]'
          );
          if (defaultImage) {
            gsap.to(defaultImage, { opacity: 0.5, duration: 0.5, delay: 0.5 });
          }
        }
      });
    });
  }
  //calendar
  function calendar() {
    var inputFields = document.querySelectorAll(".form-text-field-2");
    var calendarModal = document.getElementById("calendar-modal");
    var timeSelectionModal = document.getElementById("time-selection-modal");
    var timeSelectionEl = document.getElementById("time-selection");
    var calendarEl = document.getElementById("calendar");
    var currentInputField;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        firstDay: 1, // Set the first day of the week to Monday
        selectable: true,
        headerToolbar: {
            left: "prev",
            center: "title",
            right: "next",
        },
        locale: "it",
        buttonText: {
            today: "oggi",
        },
        dayHeaderFormat: { weekday: "short" },
        selectAllow: function(selectInfo) {
            // Disallow selection on weekends (Saturday is 5, Sunday is 6)
            var day = selectInfo.start.getUTCDay();
            console.log("Checking if day is selectable:", day); // Log for debugging
            return day !== 5 && day !== 6;
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            console.log("Fetching events for range: ", fetchInfo.startStr, " to ", fetchInfo.endStr);
            fetch("https://us-central1-webflow-project---calltoaction.cloudfunctions.net/getCalendarEvents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    timeMin: fetchInfo.startStr,
                    timeMax: fetchInfo.endStr,
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    console.error("Network response was not ok ", response.statusText);
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((events) => {
                console.log("Events fetched from backend: ", events);
                // Nascondere gli eventi nel calendario impostando il display su 'none'
                events.forEach(event => {
                    event.className = 'hidden-event';
                });
                successCallback(events);
            })
            .catch((err) => {
                console.error("Error fetching events: ", err);
                failureCallback(err);
            });
        },
        select: function(info) {
            var day = info.start.getUTCDay();
            if (day === 5 || day === 6) {
                console.log("Selected day is a weekend, not allowed."); // Log for debugging
                return; // Ensure weekends are not selectable
            }
            console.log("Date selected: ", info.start);
            openTimeSelection(info.start);
        },
        dateClick: function(info) {
            var day = info.date.getUTCDay();
            if (day === 5 || day === 6) {
                console.log("Clicked day is a weekend, not allowed."); // Log for debugging
                return; // Ensure weekends are not clickable
            }
            console.log("Date clicked: ", info.date);
            openTimeSelection(info.date);
        },
        eventOverlap: false,
        selectOverlap: function(event) {
            return !event; // disable selection if there is an event
        },
        eventBackgroundColor: "red", // color for occupied events
    });

    calendar.render();

    inputFields.forEach(function(inputField) {
        inputField.addEventListener("click", function() {
            console.log("Input field clicked: ", inputField);
            calendarModal.style.display = "block";
            calendar.updateSize(); // Aggiorna la dimensione del calendario alla prima apertura
            currentInputField = inputField;
        });
    });

    function openTimeSelection(date) {
        var day = date.getUTCDay();
        if (day === 5 || day === 6) {
            console.log("Day is a weekend, not allowed for time selection."); // Log for debugging
            return; // Ensure weekends are not selectable
        }

        console.log("Opening time selection for date: ", date);
        timeSelectionEl.innerHTML = "";
        timeSelectionModal.style.display = "block";

        var times = [];
        for (var hour = 10; hour <= 19; hour++) {
            times.push({ hour: hour, minute: 0 });
            times.push({ hour: hour, minute: 30 });
        }
        times.push({ hour: 20, minute: 0 });

        times.forEach(function(time) {
            var dateTime = new Date(date);
            dateTime.setHours(time.hour, time.minute, 0, 0);
            if (!isTimeSlotOccupied(dateTime)) {
                var button = document.createElement("button");
                button.innerText =
                    ("0" + time.hour).slice(-2) + ":" + ("0" + time.minute).slice(-2);
                button.addEventListener("click", function() {
                    var formattedDate =
                        ("0" + date.getDate()).slice(-2) +
                        "/" +
                        ("0" + (date.getMonth() + 1)).slice(-2) +
                        "/" +
                        date.getFullYear() +
                        " " + button.innerText;
                    console.log("Selected Date: ", formattedDate);
                    currentInputField.value = formattedDate;
                    timeSelectionModal.style.display = "none";
                    calendarModal.style.display = "none";
                });
                timeSelectionEl.appendChild(button);
            }
        });
    }
    function isTimeSlotOccupied(dateTime) {
        var events = calendar.getEvents();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = new Date(event.start);
            var end = new Date(event.end);
            if (dateTime >= start && dateTime < end) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener("click", function(event) {
        if (
            !calendarModal.contains(event.target) &&
            !timeSelectionModal.contains(event.target) &&
            !event.target.classList.contains("form-text-field-2")
        ) {
            calendarModal.style.display = "none";
            timeSelectionModal.style.display = "none";
        }
    });
}
  //
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  
