const landingHeader = document.querySelector("[data-landing-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const landingNavigation = document.querySelector("[data-landing-nav]");
const backToTopButton = document.querySelector("[data-back-to-top]");
const mobileMediaQuery = window.matchMedia("(max-width: 720px)");

const getScrollPosition = () => window.scrollY || document.documentElement.scrollTop || 0;

const closeLandingMenu = () => {
  if (!landingHeader || !menuToggle) {
    return;
  }

  landingHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
};

const openLandingMenu = () => {
  if (!landingHeader || !menuToggle) {
    return;
  }

  landingHeader.classList.add("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Закрыть меню");
};

if (menuToggle && landingHeader) {
  menuToggle.addEventListener("click", () => {
    const isMenuOpen = landingHeader.classList.contains("is-menu-open");

    if (isMenuOpen) {
      closeLandingMenu();
      return;
    }

    openLandingMenu();
  });
}

if (landingNavigation) {
  const navigationLinks = landingNavigation.querySelectorAll("a");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeLandingMenu();
    });
  });
}

document.addEventListener("click", (event) => {
  if (!landingHeader || !landingHeader.classList.contains("is-menu-open")) {
    return;
  }

  if (!landingHeader.contains(event.target)) {
    closeLandingMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLandingMenu();
  }
});

const closeMenuOnScrollGesture = () => {
  if (mobileMediaQuery.matches && landingHeader?.classList.contains("is-menu-open")) {
    closeLandingMenu();
  }
};

window.addEventListener("touchmove", closeMenuOnScrollGesture, {
  passive: true
});

window.addEventListener("wheel", closeMenuOnScrollGesture, {
  passive: true
});

let previousScrollPosition = getScrollPosition();
let scrollTicking = false;

const updateLandingInterface = () => {
  const currentScrollPosition = getScrollPosition();
  const shouldCompactHeader = mobileMediaQuery.matches && currentScrollPosition > 90;
  const backToTopThreshold = mobileMediaQuery.matches ? 180 : 360;
  const shouldShowBackToTop = currentScrollPosition > backToTopThreshold;

  if (landingHeader) {
    landingHeader.classList.toggle("is-compact", shouldCompactHeader);
  }

  if (backToTopButton) {
    backToTopButton.classList.toggle("is-visible", shouldShowBackToTop);
    backToTopButton.setAttribute("aria-hidden", shouldShowBackToTop ? "false" : "true");
    backToTopButton.tabIndex = shouldShowBackToTop ? 0 : -1;
  }

  if (
    mobileMediaQuery.matches &&
    landingHeader?.classList.contains("is-menu-open") &&
    Math.abs(currentScrollPosition - previousScrollPosition) > 2
  ) {
    closeLandingMenu();
  }

  previousScrollPosition = currentScrollPosition;
  scrollTicking = false;
};

const requestLandingInterfaceUpdate = () => {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(updateLandingInterface);
};

window.addEventListener("scroll", requestLandingInterfaceUpdate, {
  passive: true
});

window.addEventListener("resize", requestLandingInterfaceUpdate, {
  passive: true
});

window.addEventListener("pageshow", updateLandingInterface);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateLandingInterface();
  }
});

const handleMobileBreakpointChange = () => {
  closeLandingMenu();
  updateLandingInterface();
};

if (typeof mobileMediaQuery.addEventListener === "function") {
  mobileMediaQuery.addEventListener("change", handleMobileBreakpointChange);
} else {
  mobileMediaQuery.addListener(handleMobileBreakpointChange);
}

if (backToTopButton) {
  backToTopButton.setAttribute("aria-hidden", "true");
  backToTopButton.tabIndex = -1;

  backToTopButton.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    closeLandingMenu();

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

updateLandingInterface();

const observedSections = document.querySelectorAll("#service, #benefits, #steps, #contacts");

const navigationSectionLinks = landingNavigation
  ? Array.from(landingNavigation.querySelectorAll('a[href^="#"]'))
  : [];

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navigationSectionLinks.forEach((link) => {
          const isCurrentLink = link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("is-active", isCurrentLink);

          if (isCurrentLink) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.01
    }
  );

  observedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

const landingForm = document.querySelector("[data-landing-form]");

if (landingForm) {
  const formStatus = landingForm.querySelector("[data-form-status]");
  const submitButton = landingForm.querySelector("[data-form-submit]");
  const submitButtonDefaultText = submitButton.textContent;

  const fields = {
    name: landingForm.querySelector('[data-form-field="name"]'),
    email: landingForm.querySelector('[data-form-field="email"]'),
    message: landingForm.querySelector('[data-form-field="message"]')
  };

  const errors = {
    name: landingForm.querySelector('[data-form-error="name"]'),
    email: landingForm.querySelector('[data-form-error="email"]'),
    message: landingForm.querySelector('[data-form-error="message"]')
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldError = (fieldName, message) => {
    const field = fields[fieldName];
    const error = errors[fieldName];

    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
  };

  const clearFieldError = (fieldName) => {
    const field = fields[fieldName];
    const error = errors[fieldName];

    field.setAttribute("aria-invalid", "false");
    error.textContent = "";
  };

  const clearAllErrors = () => {
    Object.keys(fields).forEach(clearFieldError);
  };

  const setStatus = (message, type) => {
    formStatus.textContent = message;
    formStatus.classList.remove("is-success", "is-error");

    if (!message) {
      formStatus.classList.remove("is-visible");
      return;
    }

    formStatus.classList.add("is-visible", type === "success" ? "is-success" : "is-error");
  };

  const validateForm = () => {
    let isValid = true;

    clearAllErrors();

    const nameValue = fields.name.value.trim();
    const emailValue = fields.email.value.trim();
    const messageValue = fields.message.value.trim();

    if (nameValue.length < 2) {
      setFieldError("name", "Введите имя минимум из 2 символов.");
      isValid = false;
    }

    if (!emailPattern.test(emailValue)) {
      setFieldError("email", "Введите корректный email.");
      isValid = false;
    }

    if (messageValue.length < 10) {
      setFieldError("message", "Опишите задачу минимум в 10 символах.");
      isValid = false;
    }

    return isValid;
  };

  const setLoading = (isLoading) => {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Отправляем..." : submitButtonDefaultText;
  };

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener("input", () => {
      clearFieldError(fieldName);
      setStatus("", "error");
    });
  });

  landingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    setStatus("", "error");

    const trapField = landingForm.querySelector('[name="contact_trap"]');

    if (trapField && trapField.value.trim()) {
      return;
    }

    if (!validateForm()) {
      setStatus("Проверьте поля формы и исправьте ошибки.", "error");

      const firstInvalidField = landingForm.querySelector('[aria-invalid="true"]');

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    const formData = new FormData(landingForm);
    formData.delete("contact_trap");

    try {
      setLoading(true);

      const response = await fetch(landingForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      landingForm.reset();
      clearAllErrors();

      setStatus(
        "Заявка отправлена. Это учебная форма, но логика отправки работает как в реальном проекте.",
        "success"
      );
    } catch (error) {
      setStatus(
        "Не получилось отправить заявку. Проверьте интернет и попробуйте ещё раз.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  });
}
