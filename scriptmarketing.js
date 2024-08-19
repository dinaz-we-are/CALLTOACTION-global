function pageSpecificFunctions() {
  navbarRepo();
  changePrice();
  toggleServiceSection();
  toggleButtonAnimation();
  toggleFaq();
  secondSection(false);
  transitionPage();
}

//

//
function changePrice(isActive) {
  $(".number").each(function () {
    var $this = $(this),
      countTo = isActive ? $this.attr("data-year") : $this.attr("data-month");

    $({ countNum: $this.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 500,
        easing: "linear",
        step: function (now) {
          $this.text(Math.round(now.toFixed(2)));
        },
        complete: function () {
          $this.text(this.countNum);
        },
      }
    );
  });
}

//
function toggleServiceSection() {
  document.querySelectorAll(".pricing_card").forEach((card) => {
    const serviceContainer = card.querySelector(".service-container");
    const plusBtn = card.querySelector(".plus-btn");
    const trigger = card.querySelector(".h-btn-container");

    trigger.addEventListener("click", () => {
      const isOpen = serviceContainer.classList.contains("open");
      if (isOpen) {
        // Close the service section
        gsap.to(serviceContainer, { height: 0, duration: 0.5 });
        gsap.to(plusBtn, {
          rotation: 0,
          duration: 0.5,
          width: "",
          ease: "ease.out",
        });
        gsap.to(card.querySelectorAll(".vector-9, .ellipse-47"), {
          stroke: "currentColor",
          duration: 0.5,
        });
        gsap.to(card.querySelectorAll(".vector-8"), {
          attr: { "stroke-width": "" },
          stroke: "currentcolor",
          duration: 0.5,
        });
        serviceContainer.classList.remove("open");
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
          rotation: 90,
          duration: 0.5,
          width: "4rem",
          ease: "ease.out",
        });
        gsap.to(card.querySelectorAll(".vector-9, .ellipse-47"), {
          stroke: "transparent",
          duration: 0.5,
        });
        gsap.to(card.querySelectorAll(".vector-8"), {
          attr: { "stroke-width": 2 },
          stroke: "#f06",
          duration: 0.5,
        });
        serviceContainer.classList.add("open");
      }
    });
  });
}
//

function toggleButtonAnimation() {
  const toggleBtn = document.querySelector(".toggle_btn");
  const toggleCircle = toggleBtn.querySelector(".toggle_btn_circle");
  const number = document.querySelectorAll(".number");
  //const textToggle1 = document.getElementById("text-toggle1");
  //const textToggle2 = document.getElementById("text-toggle2");

  let isActive = false;

  function toggle() {
    isActive = !isActive;

    if (isActive) {
      // Sposta il cerchio a destra
      gsap.to(toggleCircle, {
        x: toggleBtn.clientWidth - toggleCircle.clientWidth - 1.2 * 16,
        duration: 0.3,
      });

      // Cambia i colori
      gsap.to(toggleBtn, { backgroundColor: "var(--ciano)", duration: 0.3 });
      gsap.to(number, { color: "var(--ciano)", duration: 0.3 });
      //gsap.to(textToggle1, { color: "var(--soft-white)", duration: 0.3 });
      //gsap.to(textToggle2, { color: "var(--ciano)", duration: 0.3 });
    } else {
      // Sposta il cerchio a sinistra
      gsap.to(toggleCircle, { x: 0, duration: 0.3 });

      // Ripristina i colori originali
      gsap.to(toggleBtn, { backgroundColor: "", duration: 0.3 });
      gsap.to(number, { color: "", duration: 0.3 });
      //gsap.to(textToggle1, { color: "", duration: 0.3 });
      //gsap.to(textToggle2, { color: "", duration: 0.3 });
    }

    // Chiama la funzione per cambiare i prezzi
    changePrice(isActive);
  }

  toggleBtn.addEventListener("click", toggle);
  toggleBtn.addEventListener("touchstart", toggle);
}
