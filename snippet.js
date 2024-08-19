//cambia il testo riscrivendolo
gsap.from(".herohead", {
  delay: 1.5,
  duration: 2.5,
  text: "CALLtoACTION",
  ease: "power1.in",
});

//cambia colore e grandezza font
gsap.to(".prova", {
  duration: 2,
  fontSize: "120",
  color: "green",
});

//codice per animare un percorso svg
document.addEventListener("DOMContentLoaded", function () {
  // Funzione per animare un percorso
  function animatePath(path) {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Crea l'animazione con GSAP
    gsap.fromTo(
      path,
      {
        strokeDashoffset: pathLength,
      },
      {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: "bounce",
      }
    );
  }

  // Seleziona i percorsi
  const arrowPath1 = document.getElementById("arrowPath1");
  const arrowPath2 = document.getElementById("arrowPath2");

  // Anima i percorsi
  animatePath(arrowPath1);
  animatePath(arrowPath2);
});

// gsap animation hero
document.addEventListener("DOMContentLoaded", function () {
  // Attendi che l'animazione di caricamento sia completata
  // Qui dovresti sostituire con il tuo trigger per la fine dell'animazione di caricamento
  setTimeout(function () {
    // Anima ogni parola con un effetto slide in dal basso
    gsap.to(".word-hero", {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, 1800); // Modifica il tempo di attesa secondo la durata della tua animazione di caricamento
});

//---------------------------------------------------------------------------------------------------

//gsap text animation
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play(),
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      x: "1em",
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.2 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 100,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: -120,
      duration: 0.3,
      ease: "power1.out",
      stagger: { amount: 0.7 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.8 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.05,
      ease: "power1.out",
      stagger: { amount: 0.4, from: "random" },
    });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true,
      },
    });
    tl.from($(this).find(".word"), {
      opacity: 0.2,
      duration: 0.2,
      ease: "power1.out",
      stagger: { each: 0.4 },
    });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

//-----------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Registra il plugin ScrollTrigger con GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Crea una timeline GSAP
  const tl = gsap.timeline(hero);

  // Aggiungi l'animazione di slide in dal basso
  tl.to(".word-hero", {
    delay: 2.5,
    duration: 1,
    opacity: 1,
    y: 0,
    stagger: { amount: 0.5 },
    ease: "bounce",
  })
    .to(
      ".highlight",
      {
        color: "var(--primary)", // Colore di evidenziazione
        duration: 1,
        stagger: { amount: 0.5 },
        ease: "linear",
      },
      "-=1" // Esegui contemporaneamente a .word-hero
    )
    .to(
      ":root",
      {
        duration: 1, // Durata dell'animazione
        "--linear-grad1": "#e0ff0d", // Nuovo colore per var(--linear-grad1)
        "--linear-grad2": "#f06", // Nuovo colore per var(--linear-grad2)
        ease: "linear",
      },
      "+=1" // Esegui contemporaneamente a .word-hero
    )
    .from(
      ".dot",
      {
        opacity: 0,
        duration: 1,
        ease: "linear",
      },
      "<"
    );

  // Crea uno ScrollTrigger per far scomparire le parole
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom top",
    onEnter: () => {
      gsap.to(".word-hero", {
        opacity: 0,
        y: 0,
        stagger: { amount: 0.5 },
        duration: 0.5,
        ease: "none",
      });
    },
    onLeaveBack: () => {
      gsap.to(".word-hero", {
        opacity: 1,
        y: 20,
        stagger: { amount: 0.5 },
        duration: 1,
        ease: "none",
      });
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Registra il plugin ScrollTrigger con GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Seleziona l'elemento con l'ID "red-dot"
  const redDot = document.getElementById("red-dot");

  // Crea una timeline per l'animazione di rotazione e movimento
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tl.to(redDot, {
    y: "15vh",
    duration: 1,
    ease: "bounce",
  }).to(redDot, {
    y: 0,
    duration: 2,
    ease: "linear",
  });

  // Aggiungi l'animazione di rotazione per il red-dot
  const rotateAnimation = gsap.to(redDot, {
    rotation: 360,
    transformOrigin: "center",
    duration: 4,
    ease: "linear",
    repeat: -1,
  });

  // Utilizza ScrollTrigger per fermare e riprendere l'animazione
  ScrollTrigger.create({
    trigger: redDot,

    start: "top center",
    end: "bottom center",
    //markers: true,
    onEnter: () => {
      tl.pause();
      rotateAnimation.pause();
    },
    onLeaveBack: () => {
      tl.play();
      rotateAnimation.play();
    },
    onLeave: () => {
      tl.pause();
      rotateAnimation.pause();
    },
    onEnterBack: () => {
      tl.play();
      rotateAnimation.play();
    },
  });

  // Fermare l'animazione all'inizio dello scroll e riprendere alla fine dello scroll
  ScrollTrigger.create({
    trigger: redDot,
    //markers: true,
    start: "top center",
    onUpdate: (self) => {
      if (self.direction === 1) {
        tl.pause();
        rotateAnimation.pause();
        gsap.to(redDot, {
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: "bounce",
        });
      } else {
        if (self.progress === 0) {
          tl.play();
          rotateAnimation.play();
        }
      }
    },
  });
});
// FINE gsap animation hero

//gsap text animation

//----------------Codice per animar una sfumatura
const container = document.querySelector(".arrow-container");

const updateGradient = () => {
  const gradient = `
    linear-gradient(45deg,
      #f4f4f4 0%, 
      #0d0d0d 50%, 
      #f4f4f4 100%)
  `;
  container.style.background = gradient;
};

gsap.to(container, {
  duration: 15,
  backgroundPosition: "200% 200%",
  ease: "none",
  repeat: -1,
  yoyo: true,
});

gsap
  .timeline({ repeat: -1, yoyo: true })
  .to(container, {
    duration: 7.5,
    background: "linear-gradient(45deg, #0d0d0d, #f4f4f4)",
  })
  .to(container, {
    duration: 7.5,
    background: "linear-gradient(45deg, #f4f4f4, #0d0d0d)",
  });

//-------------------------------------------------------------------scroll orizzontale con gsap con sezioni larghe 100%

// Primo scroll
let scroller1 = document.querySelector(".scroll");
let sections1 = gsap.utils.toArray(".scroll .h-section");

let scrollTween1 = gsap.to(sections1, {
  xPercent: -100 * (sections1.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll",
    pin: true,
    scrub: 1,
    snap: 1 / (sections1.length - 1),
    end: "+=" + scroller1.offsetWidth,
  },
});

// Secondo scroll
let scroller2 = document.querySelector(".path-wrapper");
let sections2 = gsap.utils.toArray(".path-wrapper .path-container");

let scrollTween2 = gsap.to(sections2, {
  xPercent: -100 * (sections2.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".path-wrapper",
    pin: true,
    scrub: 1,
    snap: 1 / (sections2.length - 1),
    end: "+=" + scroller2.offsetWidth,
  },
});

// Funzione per cambiare il colore
function changeBrandCallColor(color) {
  document.documentElement.style.setProperty("--brand-call", color);
}

// Trigger per section-light
ScrollTrigger.create({
  //markers: true,
  trigger: ".section-light",
  start: "top top",
  end: "bottom top",
  onEnter: () => changeBrandCallColor("#0d0d0d"),
  onLeave: () => changeBrandCallColor("#f2f2f2"),
  onEnterBack: () => changeBrandCallColor("#0d0d0d"),
  onLeaveBack: () => changeBrandCallColor("#f2f2f2"),
});

// Trigger per section-dark
ScrollTrigger.create({
  //markers: true,
  trigger: ".section-dark",
  start: "top center",
  end: "bottom center",
  onEnter: () => changeBrandCallColor("#f2f2f2"),
  onLeave: () => changeBrandCallColor("#0d0d0d"),
  onEnterBack: () => changeBrandCallColor("#f2f2f2"),
  onLeaveBack: () => changeBrandCallColor("#0d0d0d"),
});
