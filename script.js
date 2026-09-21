document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMobile = document.getElementById("nav-mobile");
  const iconOpen = document.getElementById("mobile-menu-icon-open");
  const iconClose = document.getElementById("mobile-menu-icon-close");
  const yearEl = document.getElementById("current-year");
  const yearsCountEl = document.getElementById("years-count");
  const currentYear = new Date().getFullYear();

  if (yearEl) {
    yearEl.textContent = currentYear;
  }

  if (yearsCountEl) {
    yearsCountEl.textContent = currentYear - 1998;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const closeMobileMenu = () => {
    navMobile.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  };

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = !navMobile.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      navMobile.classList.remove("hidden");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
    }
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    closeMobileMenu();
  };

  document.querySelectorAll("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", () => scrollToSection(el.dataset.scrollTo));
  });

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
});
