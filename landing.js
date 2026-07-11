const landingHeader = document.querySelector("[data-landing-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const landingNavigation = document.querySelector("[data-landing-nav]");
const backToTopButton = document.querySelector("[data-back-to-top]");
const mainContent = document.querySelector("#main-content");
const skipLink = document.querySelector("[data-skip-link]");
const mobileMediaQuery = window.matchMedia("(max-width: 720px)");

const navigationLinks = landingNavigation
  ? Array.from(landingNavigation.querySelectorAll("a"))
  : [];

const getScrollPosition = () => window.scrollY || document.documentElement.scrollTop || 0;

const setNavigationFocusable = (isFocusable) => {
  navigationLinks.forEach((link) => {
    if (isFocusable) {
      link.removeAttribute("tabindex");
      return;
    }

    link.tabIndex = -1;
  });
};

const syncNavigationAccessibility = () => {
  if (!landingHeader || !landingNavigation) {
    return;
  }

  const isMobileMenuClosed =
    mobileMediaQuery.matches && !landingHeader.classList.contains("is-menu-open");

  if (isMobileMenuClosed) {
    landingNavigation.setAttribute("aria-hidden", "true");
    landingNavigation.inert = true;
    setNavigationFocusable(false);
    return;
  }

  landingNavigation.removeAttribute("aria-hidden");
  landingNavigation.inert = false;
  setNavigationFocusable(true);
};

const closeLandingMenu = ({ restoreFocus = false } = {}) => {
  if (!landingHeader || !menuToggle) {
    return;
  }

  const wasMenuOpen = landingHeader.classList.contains("is-menu-open");

  landingHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
  syncNavigationAccessibility();

  if (restoreFocus && wasMenuOpen && mobileMediaQuery.matches) {
    window.requestAnimationFrame(() => {
      menuToggle.focus();
    });
  }
};

const openLandingMenu = () => {
  if (!landingHeader || !menuToggle) {
    return;
  }

  landingHeader.classList.add("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Закрыть меню");
  syncNavigationAccessibility();

  if (mobileMediaQuery.matches) {
    const firstNavigationLink = navigationLinks[0];

    window.requestAnimationFrame(() => {
      firstNavigationLink?.focus();
    });
  }
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

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeLandingMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!landingHeader || !landingHeader.classList.contains("is-menu-open")) {
    return;
  }

  if (!landingHeader.contains(event.target)) {
    closeLandingMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && landingHeader?.classList.contains("is-menu-open")) {
    closeLandingMenu({ restoreFocus: true });
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

if (skipLink && mainContent) {
  skipLink.addEventListener("click", () => {
    window.requestAnimationFrame(() => {
      mainContent.focus({
        preventScroll: true
      });
    });
  });
}

let previousScrollPosition = getScrollPosition();
let interfaceFrameId = null;
let lastCompactHeaderState = null;
let lastBackToTopState = null;

const updateLandingInterface = () => {
  const currentScrollPosition = getScrollPosition();
  const shouldCompactHeader = mobileMediaQuery.matches && currentScrollPosition > 90;
  const backToTopThreshold = mobileMediaQuery.matches ? 180 : 360;
  const shouldShowBackToTop = currentScrollPosition > backToTopThreshold;

  if (landingHeader && lastCompactHeaderState !== shouldCompactHeader) {
    landingHeader.classList.toggle("is-compact", shouldCompactHeader);
    lastCompactHeaderState = shouldCompactHeader;
  }

  if (backToTopButton && lastBackToTopState !== shouldShowBackToTop) {
    backToTopButton.classList.toggle("is-visible", shouldShowBackToTop);
    backToTopButton.setAttribute("aria-hidden", shouldShowBackToTop ? "false" : "true");
    backToTopButton.tabIndex = shouldShowBackToTop ? 0 : -1;
    lastBackToTopState = shouldShowBackToTop;
  }

  if (
    mobileMediaQuery.matches &&
    landingHeader?.classList.contains("is-menu-open") &&
    Math.abs(currentScrollPosition - previousScrollPosition) > 2
  ) {
    closeLandingMenu();
  }

  previousScrollPosition = currentScrollPosition;
  interfaceFrameId = null;
};

const requestLandingInterfaceUpdate = () => {
  if (interfaceFrameId !== null) {
    return;
  }

  interfaceFrameId = window.requestAnimationFrame(updateLandingInterface);
};

window.addEventListener("scroll", requestLandingInterfaceUpdate, {
  passive: true
});

window.addEventListener("resize", requestLandingInterfaceUpdate, {
  passive: true
});

window.addEventListener("pageshow", requestLandingInterfaceUpdate);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    requestLandingInterfaceUpdate();
  }
});

const handleMobileBreakpointChange = () => {
  closeLandingMenu();
  lastCompactHeaderState = null;
  syncNavigationAccessibility();
  requestLandingInterfaceUpdate();
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

syncNavigationAccessibility();
updateLandingInterface();

const observedSections = document.querySelectorAll("#service, #benefits, #steps, #contacts");

const navigationSectionLinks = landingNavigation
  ? Array.from(landingNavigation.querySelectorAll('a[href^="#"]'))
  : [];

let activeNavigationSectionId = "";

const setActiveNavigationSection = (sectionId) => {
  if (!sectionId || activeNavigationSectionId === sectionId) {
    return;
  }

  activeNavigationSectionId = sectionId;

  navigationSectionLinks.forEach((link) => {
    const isCurrentLink = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("is-active", isCurrentLink);

    if (isCurrentLink) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (visibleEntry) {
        setActiveNavigationSection(visibleEntry.target.id);
      }
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

const faqLists = document.querySelectorAll("[data-faq-list]");

faqLists.forEach((faqList) => {
  const faqItems = Array.from(faqList.querySelectorAll("[data-faq-item]"));
  let faqResizeFrameId = null;

  const closeFaqItem = (item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const answer = item.querySelector("[data-faq-answer]");

    if (!trigger || !answer || !item.classList.contains("is-open")) {
      return;
    }

    if (answer.style.height === "auto" || !answer.style.height) {
      answer.style.height = `${answer.scrollHeight}px`;
    }

    window.requestAnimationFrame(() => {
      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      answer.setAttribute("aria-hidden", "true");
      answer.style.height = "0px";
    });
  };

  const openFaqItem = (item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const answer = item.querySelector("[data-faq-answer]");

    if (!trigger || !answer) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        closeFaqItem(otherItem);
      }
    });

    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    answer.setAttribute("aria-hidden", "false");
    answer.style.height = `${answer.scrollHeight}px`;
  };

  const updateOpenFaqAnswerHeight = () => {
    faqItems.forEach((item) => {
      if (!item.classList.contains("is-open")) {
        return;
      }

      const answer = item.querySelector("[data-faq-answer]");

      if (answer) {
        answer.style.height = "auto";
      }
    });

    faqResizeFrameId = null;
  };

  const requestFaqResizeUpdate = () => {
    if (faqResizeFrameId !== null) {
      return;
    }

    faqResizeFrameId = window.requestAnimationFrame(updateOpenFaqAnswerHeight);
  };

  faqList.classList.add("is-ready");

  faqItems.forEach((item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const answer = item.querySelector("[data-faq-answer]");

    if (!trigger || !answer) {
      return;
    }

    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    answer.setAttribute("aria-hidden", "true");
    answer.style.height = "0px";

    trigger.addEventListener("click", () => {
      if (item.classList.contains("is-open")) {
        closeFaqItem(item);
        return;
      }

      openFaqItem(item);
    });

    answer.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "height" || !item.classList.contains("is-open")) {
        return;
      }

      answer.style.height = "auto";
    });
  });

  document.addEventListener("click", (event) => {
    const clickedFaqItem = event.target.closest("[data-faq-item]");

    if (clickedFaqItem && faqList.contains(clickedFaqItem)) {
      return;
    }

    faqItems.forEach(closeFaqItem);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    faqItems.forEach(closeFaqItem);
  });

  window.addEventListener("resize", requestFaqResizeUpdate, {
    passive: true
  });
});

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
