const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  };

  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  const projectUrl = card.getAttribute("data-project-url");

  if (!projectUrl) {
    return;
  }

  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Open project: ${projectUrl}`);

  const openProject = () => {
    window.open(projectUrl, "_blank", "noopener,noreferrer");
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }
    openProject();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});

document.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    const container = target.closest(".image-container");
    if (container) {
      container.classList.add("is-missing");
    }
  },
  true
);

document.addEventListener(
  "load",
  (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    const container = target.closest(".image-container");
    if (container) {
      container.classList.remove("is-missing");
    }
  },
  true
);
