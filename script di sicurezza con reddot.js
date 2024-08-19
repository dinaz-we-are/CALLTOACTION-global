function pageSpecificFunctions() {
  navbarRepo(true);
  burgerAnimation(true);
  initializeScrollFlipAnimations();
  initializeGSAPAnimations();
  secondSection(true);
  createScrollTrigger2();
  setupCecoStrategy();
  swiperHome();
  portfolioInfo();
  togglePortfolio();
  videoPause();
  toggleCeco();
  changeCSSVariablesOnScroll();
  animateCecoOnScroll();
}
function initializeGSAPAnimations() {
  const tl = gsap.timeline();

  let callSplit = new SplitType(".brand-nav-hero", {
    types: "chars",
    tagName: "span",
  });
  let uspSplit = new SplitType(".usp", {
    types: "words",
    tagName: "span",
  });

  // Anima la visibilità del contenitore principale
  tl.to(".wrapper-hero", { opacity: 1, duration: 0.1 })
    .fromTo(
      ".brand-nav-hero .char",
      { opacity: 0, y: -500 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: { amount: 0.5 },
      }
    )
    .to(".h1-usp", {
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    })
    .fromTo(
      ".usp .word",
      {
        opacity: 0,
        rotationX: 90,
        transformOrigin: "bottom center",
      },
      {
        opacity: 1,
        rotationX: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.1,
      },
      "<"
    )
    .fromTo(
      "#nav",
      { opacity: 0, y: "-5rem" },
      { opacity: 1, y: "0", duration: 0.5, ease: "back.out(1.7)" },
      "<"
    )
    .fromTo(
      ".heading-container",
      { x: "50vw", opacity: 0 },
      { x: "0", opacity: 1, duration: 0.5, ease: "power2" },
      "<"
    )
    .fromTo(
      "#big-call",
      { opacity: 0 },
      { opacity: 1, ease: "linear", duration: 1 },
      "-=3" // Inizia 1 secondo prima della fine dell'animazione precedente
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
      tl.to(".usp .word, .h1-usp", {
        opacity: 0,
        x: -200,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.5 },
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
      tl.to(".usp .word, .h1-usp", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.5 },
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
