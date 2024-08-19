document.addEventListener("DOMContentLoaded", function () {
  initializeScrollControlButtons();
  burgerAnimation();
  initializeGSAPAnimations();
  initializeHoverAnimations();
  initializeSimpleHoverTouchAnimations();
  initNavAnimations();
  secondSection();
  navbarRepo();
  dataColor();
  initializeScrollFlipAnimations();
  createScrollTrigger2();
  setupCecoStrategy();
  info();
});

// Utility function to debounce events
window.addEventListener(
  "resize",
  debounce(() => {
    ScrollTrigger.refresh();
  }, 200)
);
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
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
//BURGER

gsap.set(".menu-container", { x: "-100vw", opacity: 0 });
gsap.set(".menu-wrapper-row", { width: 0 });

document
  .querySelector(".brand-nav")
  .addEventListener("click", function scrollToTop() {
    const menuWrapper = document.querySelector(".menu-wrapper");

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

    if (menuWrapper && getComputedStyle(menuWrapper).display !== "none") {
      // Se è visibile, chiudi il menu prima di eseguire l'animazione di scroll
      const isMobile = window.innerWidth <= 767;
      closeMenu(isMobile, performScroll);
    } else {
      performScroll();
    }
  });

let menuOpen = false;

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
      ":root",
      {
        duration: 1,
        "--brand-call": "",
        "--shape-color": "",
        "--brand-arrow": "",
        ease: "linear",
      },
      "<"
    )
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

  menuOpen = false;
}

function burgerAnimation() {
  const burgerButton = document.querySelector("#burger");
  const burgerMobileButton = document.querySelector("#burger-mobile");

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
        )
        .to(
          "#nav",
          { backgroundColor: "#f2f2f2", duration: 0.5, ease: "linear" },
          "-=0.8"
        )
        .to(
          ":root",
          {
            duration: 1,
            "--brand-call": "#0d0d0d",
            "--shape-color": "#0d0d0d",
            "--brand-arrow": "#0d0d0d",
            ease: "linear",
          },
          "-=0.6"
        )
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
}
//Fine Burger
//Animazioni Hero

function initializeGSAPAnimations() {
  const tl = gsap.timeline();
  const tlTop = gsap.timeline();
  const tlBottom = gsap.timeline();

  // Controlla se l'animazione di heading-wrapper e loading-wrapper è già stata eseguita
  if (!sessionStorage.getItem("loadingAnimationDone")) {
    // Imposta il flag per indicare che l'animazione è stata eseguita
    sessionStorage.setItem("loadingAnimationDone", "true");

    let headingSplit = new SplitType(".heading-wrapper", {
      types: "chars",
      tagName: "span",
    });

    gsap.set(".heading-wrapper, .usp", { opacity: 1 });

    tl.from(".heading-wrapper:not(.top):not(.bottom) .char", {
      delay: 0.8,
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -50 : 50),
      duration: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.5 },
    });

    tlTop.from(".heading-wrapper.top .char", {
      delay: 0.3,
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.5 },
    });

    tlBottom.from(".heading-wrapper.bottom .char", {
      delay: 0.3,
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.5 },
    });

    tlTop.to(".heading-wrapper.top .char", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "back.in(1.7)",
      stagger: { amount: 0.5 },
    });

    tlBottom.to(".heading-wrapper.bottom .char", {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "back.in(1.7)",
      stagger: { amount: 0.5 },
    });

    tl.to(".heading-wrapper:not(.top):not(.bottom) .char", {
      delay: 0.5,
      y: "-50vh",
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.5 },
    }).to(
      ".loading-wrapper",
      {
        opacity: 0,
        duration: 0.5,
        ease: "none",
        onComplete: () => {
          document.querySelector(".loading-wrapper").style.display = "none";
        },
      },
      "-=1"
    );
  } else {
    // Se l'animazione è già stata eseguita, imposta display:none per .loading-wrapper
    document.querySelector(".loading-wrapper").style.display = "none";
  }
  let uspSplit = new SplitType(".usp", {
    types: "words",
    tagName: "span",
  });
  let h1Split = new SplitType(".women-services", {
    types: "words",
    tagName: "span",
  });

  tl.to(":root", {
    "--stroke-offset": "1000px",
    duration: 1,
    ease: "power2.out",
  })
    .from(
      ".usp .word",
      {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.5 },
      },
      "<"
    )
    .from(
      ".women-services .word",
      {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: { amount: 0.5 },
      },
      "<"
    )
    .from(
      ".brand_header",
      {
        opacity: 0,
        y: "-5rem",
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=1"
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
    .from(
      "#arrow-2",
      {
        opacity: 0,
        duration: 1,
        ease: "bounce",
      },
      "<"
    );

  tl.call(function () {
    console.log("Animazione completata");
  });

  //----------------------------------------animazione freccia

  let arrowAnimation = gsap.fromTo(
    "#arrow-2",
    { y: "-6rem", scale: 0.5 },
    {
      y: 0,
      scale: 0.6,
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

  // Gestisce l'opacità di #arrow-2 e #arrow durante lo scroll
  ScrollTrigger.create({
    //markers: true,
    trigger: ".hero-trigger",
    start: "top 90%",
    end: "top 90%",
    scrub: true,
    onEnter: () => {
      let tl = gsap.timeline();
      tl.to("#arrow-2", {
        color: "transparent",
        opacity: 0,
        ease: "back.out(1.7)",
      }).to(
        "#arrow",
        {
          "--arrow-mobile": "#e0ff0d",
          opacity: 1,
          ease: "back.out(1.7)",
        },
        "<" // Il "<" indica di iniziare questa animazione contemporaneamente alla precedente
      );
    },
    onLeaveBack: () => {
      let tl = gsap.timeline();
      tl.to("#arrow", {
        opacity: 0,
        ease: "back.out(1.7)",
        "--arrow-mobile": "transparent",
      }).to(
        "#arrow-2",
        {
          color: "#e0ff0d",
          opacity: 1,
          ease: "back.out(1.7)",
        },
        "<" // Il "<" indica di iniziare questa animazione contemporaneamente alla precedente
      );
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
      tl.to(".brand_header", {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          ".usp .word",
          {
            opacity: 0,
            x: -200,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: { amount: 0.5 },
          },
          "<"
        )
        .to(
          ".women-services .word",
          {
            x: -200,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: { amount: 0.5 },
          },
          "<"
        );
    },
    onLeaveBack: () => {
      const tl = gsap.timeline();
      tl.to(".brand_header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          ".usp .word",
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: { amount: 0.5 },
          },
          "<"
        )
        .to(
          ".women-services .word",
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: { amount: 0.5 },
          },
          "<"
        );
    },
  });

  // Seconda animazione
  ScrollTrigger.create({
    trigger: ".hero-trigger",
    start: "top 35%",
    end: "top center",
    //markers: true,
    toggleActions: "play none none reset",
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to("#logo-header", {
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }).to(
        ".call",
        {
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<"
      );
    },
    onLeaveBack: () => {
      const tl = gsap.timeline();
      tl.to("#logo-header", {
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      }).to(
        ".call",
        {
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<"
      );
    },
  });

  // Forza un refresh di ScrollTrigger
  ScrollTrigger.refresh();
}

// Chiama la funzione per creare gli scroll triggers

// ------------------------------------Animazione Entrata e uscita Hero

function initNavAnimations() {
  const mmNav = gsap.matchMedia();

  mmNav.add("(min-width: 992px)", () => {
    console.log("Desktop breakpoint for nav");
    const tlNav = gsap.timeline({
      scrollTrigger: {
        trigger: ".focus-wrapper",
        start: "top 20%",
        end: "top top",
        scrub: true,
      },
    });

    tlNav
      .to(".header", {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
      .to(
        "#nav",
        {
          delay: 0.5,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "<"
      );
  });

  mmNav.add("(min-width: 768px) and (max-width: 991px)", () => {
    console.log("Tablet breakpoint for nav");
    const tlNav = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    tlNav
      .to(".header", {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
      .to(
        "#nav",
        {
          delay: 0.5,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "<"
      );
  });

  mmNav.add("(min-width: 481px) and (max-width: 767px)", () => {
    console.log("Mobile grande breakpoint for nav");
    const tlNav = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    tlNav
      .to(".header", {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
      .to(
        "#nav",
        {
          delay: 0.5,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "<"
      );
  });

  mmNav.add("(max-width: 480px)", () => {
    console.log("Mobile piccolo breakpoint for nav");
    const tlNav = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-trigger",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    tlNav
      .to(".header", {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
      .to(
        "#nav",
        {
          delay: 0.5,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "<"
      );
  });

  ScrollTrigger.refresh();
}

//inizio seconda sezione - focus wrapper e Path

function secondSection() {
  // Animazione zIndex Hero
  ScrollTrigger.create({
    trigger: ".hero-spacer",
    start: "top 20%",
    end: "top top",
    onEnter: () => {
      gsap.to("#hero", { zIndex: 1 });
    },
  });

  // Animazione con ScrollTrigger per .focus-wrapper

  // Match Media per diverse risoluzioni
  const mm = gsap.matchMedia();

  mm.add("(min-width: 320px) and (max-width: 767px)", () => {
    console.log("Mobile breakpoint active");
    gsap.fromTo(
      "#focus ",
      { opacity: 1, transformOrigin: "top left" },
      {
        x: "10vw",
        scale: 0.8,
        //color: "#f06",
        opacity: 0.5,
        y: "33%",
        rotate: 90,
        //transform: "translateY(-33%)",
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
        x: "10vw",
        opacity: 0.5,
        rotate: 90,
        y: "25%",
        //transform: "translateY(-50%)",
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

  containers.forEach((container) => {
    const imgId = container.getAttribute("data-img-id");
    const image = document.getElementById(imgId);
    const customPathVectors = container.querySelectorAll(".path-vector");

    customPathVectors.forEach((customPathVector) => {
      gsap.from(customPathVector, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        x: -50,
        ease: "power1.out",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "top top",
          toggleActions: "play none none reverse",
        },
      });
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
            //markers: true,
            trigger: container,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to(images, { opacity: 0, duration: 1, ease: "power1.out" });
              gsap.to(image, { opacity: 0.6, duration: 1, ease: "power1.out" });
            },
            onLeave: () => {
              gsap.to(image, { opacity: 0, duration: 1, ease: "power1.out" });
            },
            onEnterBack: () => {
              gsap.to(images, { opacity: 0, duration: 1, ease: "power1.out" });
              gsap.to(image, { opacity: 0.6, duration: 1, ease: "power1.out" });
            },
            onLeaveBack: () => {
              gsap.to(image, { opacity: 0.6, duration: 1, ease: "power1.out" });
            },
          },
        }
      );
    }
  });
}

//-----------------------------------------------FINE SECOND SECTION

//-------------------------inizio cambio navbar sticky fixed

function navbarRepo() {
  const stickyElement = document.querySelector("#nav");
  const menuWrapper = document.querySelector(".menu-wrapper");
  const pathWrapper = document.querySelector(".path-wrapper");

  let navbarScrollTrigger = null;
  let isPathWrapperInView = false;

  function checkMenuWrapper() {
    return getComputedStyle(menuWrapper).display === "flex";
  }

  function createNavbarScrollTrigger() {
    const isMobile = window.innerWidth < 992;
    const duration = isMobile ? 0.3 : 0.5;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
      if (!checkMenuWrapper() && isPathWrapperInView) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          gsap.to(stickyElement, {
            y: "-5rem",
            duration: duration,
            ease: "power1.out",
          });
        } else if (currentScrollY < lastScrollY) {
          gsap.to(stickyElement, {
            y: 0,
            duration: duration,
            ease: "power1.out",
          });
        }
        lastScrollY = currentScrollY;
        ticking = false;
      }
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });

    return {
      kill: () => {
        window.removeEventListener("scroll", updateNavbar);
      },
    };
  }

  function updateNavbarZIndex() {
    if (checkMenuWrapper()) {
      gsap.set(stickyElement, { zIndex: 900 });
    } else {
      gsap.set(stickyElement, { zIndex: "" }); // Ripristina il valore originale rimuovendo lo stile inline
      ScrollTrigger.refresh();
    }
  }

  function checkAndUpdateNavbar() {
    updateNavbarZIndex(); // Aggiungi qui la chiamata per aggiornare lo z-index
    if (checkMenuWrapper()) {
      if (navbarScrollTrigger) {
        navbarScrollTrigger.kill();
        navbarScrollTrigger = null;
      }
    } else if (!navbarScrollTrigger && isPathWrapperInView) {
      navbarScrollTrigger = createNavbarScrollTrigger();
    }
  }

  // Configura ScrollTrigger per monitorare la posizione di .path-wrapper
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
        // Mantieni la navbar ferma quando .path-wrapper esce dalla viewport
        gsap.set(stickyElement, { y: 0 });
      }
    },
  });

  window.addEventListener(
    "resize",
    debounce(() => {
      if (navbarScrollTrigger) {
        navbarScrollTrigger.kill();
        navbarScrollTrigger = createNavbarScrollTrigger();
      }
      checkAndUpdateNavbar();
    }, 200)
  );

  const observer = new MutationObserver(() => {
    checkAndUpdateNavbar();
  });

  observer.observe(menuWrapper, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  checkAndUpdateNavbar();
}

// Funzione debounce per limitare la frequenza di esecuzione della funzione di resize
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

//------------------------------------fine navbar

//---------------------------------DATACOLOR
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
          start: "top 60%",
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
//-----------------------------------------fine DATA color
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
      trigger: ".trigger-usp",
      start: "bottom 80%",
      end: "bottom top",
      scrub: true,
    },
  });

  // Animazioni per tutte le dimensioni
  tl.to(".top-wrapper", {
    y: "-55vh",
    duration: 1,
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
        backgroundColor: "#0d0d0d",
      },
      {
        backgroundColor: "#f2f2f2",
        duration: 1,
      },
      "<"
    )
    .to(
      ":root",
      {
        duration: 1,
        "--brand-call": "#0d0d0d",
        "--shape-color": "#0d0d0d",
        "--brand-arrow": "#0d0d0d",
        ease: "linear",
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
      },
      "<"
    );
  }
}

//------------------------ menu navbar

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
    hoverTimeline.fromTo(
      box.querySelector(".sublink"),
      { opacity: 0, y: "6rem" },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
      },
      0
    );
    hoverTimeline.to(
      box.querySelector(".link-heading"),
      {
        rotationZ: 3,
        x: 20,
        y: -2,
        scale: 1.2,
        duration: 0.3,
        ease: "power1.out",
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
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(3)",
      },
      0
    );
    touchTimeline.to(
      box.querySelector(".sublink-container"),
      {
        y: 5,
        x: 5,
        duration: 0.3,
        ease: "power1.out",
      },
      0
    );
    touchTimeline.to(
      box.querySelector(".link-heading"),
      {
        rotationZ: 3,
        y: -2,
        scale: 1.2,
        duration: 0.3,
        ease: "power1.out",
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
//Popup
function info() {
  const infoBox = document.querySelector(".info-box-cta");
  const popup = document.querySelector("#info-cta");
  const closeButton = document.querySelector(".info-box-close");
  const pageWrapper = document.querySelector(".page-wrapper");

  if (!infoBox || !popup || !closeButton || !pageWrapper) {
    console.error("Element not found:", {
      infoBox,
      popup,
      closeButton,
      pageWrapper,
    });
    return;
  }

  infoBox.addEventListener("click", () => {
    gsap.set(popup, { display: "flex", opacity: 0, scale: 0.8 }); // Imposta display a flex e inizializza opacità e scala
    gsap.to(popup, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(pageWrapper, {
      opacity: 0.2,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  closeButton.addEventListener("click", () => {
    gsap.to(popup, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(popup, { display: "none" });
      },
    });
    gsap.to(pageWrapper, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.in",
    });
  });
}

//
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
