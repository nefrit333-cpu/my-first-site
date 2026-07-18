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

const observedSections = document.querySelectorAll(
  "#service, #benefits, #pricing, #calculator, #cases, #testimonials, #brief, #steps, #contacts"
);

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

const testimonials = document.querySelector("[data-testimonials]");
let showTestimonial = () => {};

if (testimonials) {
  const slides = Array.from(testimonials.querySelectorAll("[data-testimonial-slide]"));
  const previousButton = testimonials.querySelector("[data-testimonials-prev]");
  const nextButton = testimonials.querySelector("[data-testimonials-next]");
  const controls = testimonials.querySelector("[data-testimonials-controls]");
  const dots = Array.from(testimonials.querySelectorAll("[data-testimonials-dot]"));
  const currentOutput = testimonials.querySelector("[data-testimonials-current]");
  const status = document.querySelector("[data-testimonials-status]");
  let currentSlideIndex = 0;

  const normalizeSlideIndex = (index) => {
    if (slides.length === 0) {
      return 0;
    }

    return (index + slides.length) % slides.length;
  };

  const setSlideAccessibility = (slide, isActive) => {
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", isActive ? "false" : "true");

    if ("inert" in slide) {
      slide.inert = !isActive;
    }
  };

  showTestimonial = (requestedIndex, { announce = true, moveIndicatorFocus = false } = {}) => {
    if (slides.length === 0) {
      return;
    }

    currentSlideIndex = normalizeSlideIndex(requestedIndex);

    slides.forEach((slide, index) => {
      setSlideAccessibility(slide, index === currentSlideIndex);
    });

    dots.forEach((dot, index) => {
      const isCurrent = index === currentSlideIndex;

      dot.setAttribute("aria-pressed", isCurrent ? "true" : "false");
      dot.tabIndex = isCurrent ? 0 : -1;

      if (isCurrent) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (currentOutput) {
      currentOutput.textContent = String(currentSlideIndex + 1);
    }

    const activeSlide = slides[currentSlideIndex];
    const slideTitle = activeSlide.dataset.testimonialTitle || "Учебный проект";
    const slideAuthor = activeSlide.dataset.testimonialAuthor || "Автор отзыва";

    if (announce && status) {
      status.textContent =
        `Показан отзыв ${currentSlideIndex + 1} из ${slides.length}. ` +
        `${slideAuthor}, проект «${slideTitle}».`;
    }

    if (moveIndicatorFocus && dots[currentSlideIndex]) {
      dots[currentSlideIndex].focus();
    }
  };

  testimonials.classList.add("is-enhanced");

  slides.forEach((slide) => {
    slide.setAttribute("aria-roledescription", "слайд");
  });

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showTestimonial(currentSlideIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showTestimonial(currentSlideIndex + 1);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showTestimonial(Number(dot.dataset.slideIndex));
    });
  });

  if (controls) {
    controls.addEventListener("keydown", (event) => {
      const isIndicatorFocused = dots.includes(document.activeElement);
      let nextIndex = null;

      if (event.key === "ArrowLeft") {
        nextIndex = currentSlideIndex - 1;
      }

      if (event.key === "ArrowRight") {
        nextIndex = currentSlideIndex + 1;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = slides.length - 1;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();

      showTestimonial(nextIndex, {
        moveIndicatorFocus: isIndicatorFocused
      });
    });
  }

  showTestimonial(0, {
    announce: false
  });
}

const calculator = document.querySelector("[data-calculator]");
const projectBrief = document.querySelector("[data-project-brief]");
const landingForm = document.querySelector("[data-landing-form]");
const pricingSelectButtons = Array.from(document.querySelectorAll("[data-pricing-select]"));
const calculatorApplyButton = document.querySelector("[data-calculator-apply]");
const openTestimonialLinks = Array.from(document.querySelectorAll("[data-open-testimonial]"));
const openCaseLinks = Array.from(document.querySelectorAll("[data-open-case]"));
const referenceButtons = Array.from(document.querySelectorAll("[data-reference-cta]"));
const testimonialsTitle = document.querySelector("#testimonialsTitle");
const contactsTitle = document.querySelector("#contactsTitle");

const currencyFormatter = new Intl.NumberFormat("ru-RU");
const formatCurrency = (value) => `${currencyFormatter.format(Number(value) || 0)} ₽`;

const selectedConfiguration = landingForm?.querySelector("[data-selected-configuration]");
const configurationPlan = landingForm?.querySelector("[data-configuration-plan]");
const configurationExtras = landingForm?.querySelector("[data-configuration-extras]");
const configurationPrice = landingForm?.querySelector("[data-configuration-price]");
const configurationStatus = landingForm?.querySelector("[data-configuration-status]");
const clearConfigurationButton = landingForm?.querySelector("[data-clear-configuration]");
const selectedPlanField = landingForm?.querySelector("[data-selected-plan-field]");
const selectedExtrasField = landingForm?.querySelector("[data-selected-extras-field]");
const estimatedPriceField = landingForm?.querySelector("[data-estimated-price-field]");

const selectedReference = landingForm?.querySelector("[data-selected-reference]");
const selectedReferenceTitle = landingForm?.querySelector("#selectedReferenceTitle");
const referenceSource = landingForm?.querySelector("[data-reference-source]");
const referenceProject = landingForm?.querySelector("[data-reference-project]");
const referenceType = landingForm?.querySelector("[data-reference-type]");
const referenceResult = landingForm?.querySelector("[data-reference-result]");
const referenceStatus = landingForm?.querySelector("[data-reference-status]");
const clearReferenceButton = landingForm?.querySelector("[data-clear-reference]");
const referenceSourceField = landingForm?.querySelector("[data-reference-source-field]");
const referenceProjectField = landingForm?.querySelector("[data-reference-project-field]");
const referenceTypeField = landingForm?.querySelector("[data-reference-type-field]");
const referenceResultField = landingForm?.querySelector("[data-reference-result-field]");

const selectedBrief = landingForm?.querySelector("[data-selected-brief]");
const selectedBriefTitle = landingForm?.querySelector("#selectedBriefTitle");
const formBriefSite = landingForm?.querySelector("[data-form-brief-site]");
const formBriefGoal = landingForm?.querySelector("[data-form-brief-goal]");
const formBriefFeatures = landingForm?.querySelector("[data-form-brief-features]");
const formBriefTimeline = landingForm?.querySelector("[data-form-brief-timeline]");
const formBriefBudget = landingForm?.querySelector("[data-form-brief-budget]");
const briefFormStatus = landingForm?.querySelector("[data-brief-form-status]");
const editFormBriefButton = landingForm?.querySelector("[data-edit-form-brief]");
const clearFormBriefButton = landingForm?.querySelector("[data-clear-form-brief]");
const briefSiteTypeField = landingForm?.querySelector("[data-brief-site-type-field]");
const briefGoalField = landingForm?.querySelector("[data-brief-goal-field]");
const briefFeaturesField = landingForm?.querySelector("[data-brief-features-field]");
const briefTimelineField = landingForm?.querySelector("[data-brief-timeline-field]");
const briefBudgetField = landingForm?.querySelector("[data-brief-budget-field]");
const briefStatusField = landingForm?.querySelector("[data-brief-status-field]");
const formMessageField = landingForm?.querySelector('[data-form-field="message"]');

let activeFormConfiguration = null;
let activeFormReference = null;
let activeFormBrief = null;
let openProjectBriefEditor = () => {};

const getExtrasText = (extras) =>
  extras.length > 0 ? extras.map((extra) => extra.name).join(", ") : "Без дополнительных услуг";

const applyConfigurationToForm = (configuration, { announce = true } = {}) => {
  if (
    !configuration ||
    !selectedConfiguration ||
    !configurationPlan ||
    !configurationExtras ||
    !configurationPrice ||
    !selectedPlanField ||
    !selectedExtrasField ||
    !estimatedPriceField
  ) {
    return;
  }

  const extrasText = getExtrasText(configuration.extras);
  const formattedPrice = formatCurrency(configuration.totalPrice);

  activeFormConfiguration = configuration;

  selectedPlanField.value = configuration.planName;
  selectedExtrasField.value = extrasText;
  estimatedPriceField.value = formattedPrice;

  configurationPlan.textContent = configuration.planName;
  configurationExtras.textContent = extrasText;
  configurationPrice.textContent = formattedPrice;

  selectedConfiguration.hidden = false;

  if (announce && configurationStatus) {
    configurationStatus.textContent =
      `В заявку добавлен тариф «${configuration.planName}». ` +
      `Дополнительные услуги: ${extrasText}. ` +
      `Предварительная стоимость ${formattedPrice}.`;
  }
};

const clearFormConfiguration = ({ announce = true } = {}) => {
  activeFormConfiguration = null;

  if (selectedPlanField) {
    selectedPlanField.value = "";
  }

  if (selectedExtrasField) {
    selectedExtrasField.value = "";
  }

  if (estimatedPriceField) {
    estimatedPriceField.value = "";
  }

  if (configurationPlan) {
    configurationPlan.textContent = "";
  }

  if (configurationExtras) {
    configurationExtras.textContent = "";
  }

  if (configurationPrice) {
    configurationPrice.textContent = "";
  }

  if (selectedConfiguration) {
    selectedConfiguration.hidden = true;
  }

  if (announce && configurationStatus) {
    configurationStatus.textContent = "Выбранная конфигурация удалена из заявки.";
  }
};

const getPreferredScrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const updateHashWithoutJump = (hash) => {
  if (hash && window.history?.pushState) {
    window.history.pushState(null, "", hash);
  }
};

const scrollToTrustTarget = (target, focusTarget, hash) => {
  if (!target) {
    return;
  }

  const behavior = getPreferredScrollBehavior();

  target.scrollIntoView({
    behavior,
    block: "start"
  });

  updateHashWithoutJump(hash);

  window.setTimeout(
    () => {
      focusTarget?.focus({
        preventScroll: true
      });
    },
    behavior === "smooth" ? 380 : 0
  );
};

const getReferenceFromButton = (button) => ({
  source: button.dataset.referenceSource || "Не указан",
  project: button.dataset.referenceProject || "Учебный проект",
  type: button.dataset.referenceType || "Сайт",
  result: button.dataset.referenceResult || "Учебный результат"
});

const applyReferenceToForm = (reference, { announce = true } = {}) => {
  if (
    !reference ||
    !selectedReference ||
    !referenceSource ||
    !referenceProject ||
    !referenceType ||
    !referenceResult ||
    !referenceSourceField ||
    !referenceProjectField ||
    !referenceTypeField ||
    !referenceResultField
  ) {
    return;
  }

  activeFormReference = reference;

  referenceSourceField.value = reference.source;
  referenceProjectField.value = reference.project;
  referenceTypeField.value = reference.type;
  referenceResultField.value = reference.result;

  referenceSource.textContent = reference.source;
  referenceProject.textContent = reference.project;
  referenceType.textContent = reference.type;
  referenceResult.textContent = reference.result;

  selectedReference.hidden = false;

  if (announce && referenceStatus) {
    referenceStatus.textContent =
      `В заявку добавлен пример проекта «${reference.project}». ` +
      `Источник: ${reference.source}. Тип проекта: ${reference.type}. ` +
      `Учебный результат: ${reference.result}.`;
  }
};

const clearFormReference = ({ announce = true } = {}) => {
  activeFormReference = null;

  if (referenceSourceField) referenceSourceField.value = "";
  if (referenceProjectField) referenceProjectField.value = "";
  if (referenceTypeField) referenceTypeField.value = "";
  if (referenceResultField) referenceResultField.value = "";

  if (referenceSource) referenceSource.textContent = "";
  if (referenceProject) referenceProject.textContent = "";
  if (referenceType) referenceType.textContent = "";
  if (referenceResult) referenceResult.textContent = "";

  if (selectedReference) {
    selectedReference.hidden = true;
  }

  if (announce && referenceStatus) {
    referenceStatus.textContent = "Выбранный пример проекта удалён из заявки.";
  }
};

const briefStartMarker = "=== Бриф проекта ===";
const briefEndMarker = "=== Конец брифа ===";

const createBriefFormSummaryText = (data) =>
  [
    briefStartMarker,
    `Тип сайта: ${data.siteType}`,
    `Основная задача: ${data.goal}`,
    `Возможности: ${data.features.join(", ")}`,
    `Желаемый срок: ${data.timeline}`,
    `Ориентировочный бюджет: ${data.budget}`,
    briefEndMarker
  ].join("\n");

const removeBriefSummaryFromMessage = (message) => {
  let result = String(message || "");

  while (result.includes(briefStartMarker)) {
    const startIndex = result.indexOf(briefStartMarker);
    const endIndex = result.indexOf(briefEndMarker, startIndex);

    if (endIndex === -1) {
      result = result.slice(0, startIndex);
      break;
    }

    const before = result.slice(0, startIndex).trimEnd();
    const after = result.slice(endIndex + briefEndMarker.length).trimStart();

    result = [before, after].filter(Boolean).join("\n\n");
  }

  return result.replace(/\n{3,}/g, "\n\n").trim();
};

const dispatchFormMessageInput = () => {
  formMessageField?.dispatchEvent(
    new Event("input", {
      bubbles: true
    })
  );
};

const applyBriefToForm = (brief, { announce = true, moveFocus = true } = {}) => {
  if (
    !brief ||
    !brief.siteType ||
    !brief.goal ||
    !Array.isArray(brief.features) ||
    brief.features.length === 0 ||
    !brief.timeline ||
    !brief.budget ||
    !selectedBrief ||
    !formBriefSite ||
    !formBriefGoal ||
    !formBriefFeatures ||
    !formBriefTimeline ||
    !formBriefBudget ||
    !briefSiteTypeField ||
    !briefGoalField ||
    !briefFeaturesField ||
    !briefTimelineField ||
    !briefBudgetField ||
    !briefStatusField
  ) {
    return false;
  }

  const wasAlreadyAdded = Boolean(activeFormBrief);
  const featuresText = brief.features.join(", ");

  activeFormBrief = {
    siteType: brief.siteType,
    goal: brief.goal,
    features: [...brief.features],
    timeline: brief.timeline,
    budget: brief.budget
  };

  briefSiteTypeField.value = brief.siteType;
  briefGoalField.value = brief.goal;
  briefFeaturesField.value = featuresText;
  briefTimelineField.value = brief.timeline;
  briefBudgetField.value = brief.budget;
  briefStatusField.value = "Бриф заполнен";

  formBriefSite.textContent = brief.siteType;
  formBriefGoal.textContent = brief.goal;
  formBriefFeatures.textContent = featuresText;
  formBriefTimeline.textContent = brief.timeline;
  formBriefBudget.textContent = brief.budget;

  selectedBrief.hidden = false;

  if (formMessageField) {
    const userMessage = removeBriefSummaryFromMessage(formMessageField.value);
    const summaryText = createBriefFormSummaryText(brief);

    formMessageField.value = [userMessage, summaryText].filter(Boolean).join("\n\n");
    dispatchFormMessageInput();
  }

  if (announce && briefFormStatus) {
    briefFormStatus.textContent = wasAlreadyAdded
      ? "Данные брифа в заявке обновлены. Текст пользователя и другие выбранные параметры сохранены."
      : "Бриф добавлен в заявку отдельными полями Formspree и текстовой сводкой.";
  }

  if (moveFocus) {
    scrollToTrustTarget(selectedBrief, selectedBriefTitle, "#contacts");
  }

  return true;
};

const clearFormBrief = ({ announce = true, moveFocus = false, removeMessage = true } = {}) => {
  activeFormBrief = null;

  if (briefSiteTypeField) briefSiteTypeField.value = "";
  if (briefGoalField) briefGoalField.value = "";
  if (briefFeaturesField) briefFeaturesField.value = "";
  if (briefTimelineField) briefTimelineField.value = "";
  if (briefBudgetField) briefBudgetField.value = "";
  if (briefStatusField) briefStatusField.value = "";

  if (formBriefSite) formBriefSite.textContent = "";
  if (formBriefGoal) formBriefGoal.textContent = "";
  if (formBriefFeatures) formBriefFeatures.textContent = "";
  if (formBriefTimeline) formBriefTimeline.textContent = "";
  if (formBriefBudget) formBriefBudget.textContent = "";

  if (selectedBrief) {
    selectedBrief.hidden = true;
  }

  if (removeMessage && formMessageField) {
    const updatedMessage = removeBriefSummaryFromMessage(formMessageField.value);

    if (updatedMessage !== formMessageField.value) {
      formMessageField.value = updatedMessage;
      dispatchFormMessageInput();
    }
  }

  if (announce && briefFormStatus) {
    briefFormStatus.textContent =
      "Бриф убран из заявки. Исходные ответы и локальный черновик сохранены.";
  }

  if (moveFocus) {
    window.requestAnimationFrame(() => {
      formMessageField?.focus({
        preventScroll: true
      });
    });
  }
};

editFormBriefButton?.addEventListener("click", () => {
  openProjectBriefEditor();
});

clearFormBriefButton?.addEventListener("click", () => {
  clearFormBrief({
    moveFocus: true
  });
});

openTestimonialLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    showTestimonial(Number(link.dataset.testimonialIndex));
    scrollToTrustTarget(testimonials, testimonialsTitle, link.getAttribute("href"));
  });
});

openCaseLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const caseCard = document.querySelector(`#${link.dataset.caseTarget}`);
    const caseTitle = document.querySelector(`#${link.dataset.caseTitleTarget}`);

    scrollToTrustTarget(caseCard, caseTitle, link.getAttribute("href"));
  });
});

referenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyReferenceToForm(getReferenceFromButton(button));

    window.requestAnimationFrame(() => {
      selectedReferenceTitle?.focus({
        preventScroll: true
      });
    });
  });
});

if (projectBrief) {
  const steps = Array.from(projectBrief.querySelectorAll("[data-brief-step]"));
  const indicators = Array.from(projectBrief.querySelectorAll("[data-brief-indicator]"));
  const progress = projectBrief.querySelector("[data-brief-progress]");
  const progressBar = projectBrief.querySelector("[data-brief-progress-bar]");
  const progressCurrent = projectBrief.querySelector("[data-brief-progress-current]");
  const progressText = projectBrief.querySelector("[data-brief-progress-text]");
  const status = projectBrief.querySelector("[data-brief-status]");
  const controls = projectBrief.querySelector("[data-brief-controls]");
  const previousButton = projectBrief.querySelector("[data-brief-previous]");
  const nextButton = projectBrief.querySelector("[data-brief-next]");
  const summary = projectBrief.querySelector("[data-brief-summary]");
  const summaryTitle = projectBrief.querySelector("#briefSummaryTitle");
  const editButton = projectBrief.querySelector("[data-brief-edit]");
  const applyButton = projectBrief.querySelector("[data-brief-apply]");
  const draftPanel = projectBrief.querySelector("[data-brief-draft]");
  const draftStatus = projectBrief.querySelector("[data-brief-draft-status]");
  const draftTime = projectBrief.querySelector("[data-brief-draft-time]");
  const deleteDraftButton = projectBrief.querySelector("[data-brief-draft-delete]");
  const briefInputs = Array.from(
    projectBrief.querySelectorAll('input[type="radio"], input[type="checkbox"]')
  );

  const summaryFields = {
    siteType: projectBrief.querySelector("[data-brief-summary-site]"),
    goal: projectBrief.querySelector("[data-brief-summary-goal]"),
    features: projectBrief.querySelector("[data-brief-summary-features]"),
    timeline: projectBrief.querySelector("[data-brief-summary-timeline]"),
    budget: projectBrief.querySelector("[data-brief-summary-budget]")
  };

  const briefStorageKey = "dmitriy-web-project-brief-v1";
  const briefStorageVersion = 1;
  const briefDraftLifetime = 30 * 24 * 60 * 60 * 1000;
  const briefStorageTestKey = `${briefStorageKey}-availability-test`;
  const briefTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const briefDateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long"
  });

  const getAllowedValues = (name) =>
    new Set(briefInputs.filter((input) => input.name === name).map((input) => input.value));

  const allowedBriefValues = {
    siteType: getAllowedValues("brief_site_type"),
    goal: getAllowedValues("brief_goal"),
    features: getAllowedValues("brief_features"),
    timeline: getAllowedValues("brief_timeline"),
    budget: getAllowedValues("brief_budget")
  };

  let currentStepIndex = 0;
  let briefStorage = null;
  let isBriefDraftReady = false;
  let isRestoringBriefDraft = false;

  const setBriefElementActive = (element, isActive) => {
    element.hidden = !isActive;
    element.setAttribute("aria-hidden", isActive ? "false" : "true");

    if ("inert" in element) {
      element.inert = !isActive;
    }
  };

  const getSelectedInputs = (step) =>
    Array.from(step.querySelectorAll('input[type="radio"], input[type="checkbox"]')).filter(
      (input) => input.checked
    );

  const getBriefData = () => {
    const formData = new FormData(projectBrief);

    return {
      siteType: String(formData.get("brief_site_type") || ""),
      goal: String(formData.get("brief_goal") || ""),
      features: formData.getAll("brief_features").map(String),
      timeline: String(formData.get("brief_timeline") || ""),
      budget: String(formData.get("brief_budget") || "")
    };
  };

  const hasBriefAnswers = (data) =>
    Boolean(data.siteType || data.goal || data.features.length > 0 || data.timeline || data.budget);

  const hasCompleteBrief = (data) =>
    Boolean(data.siteType && data.goal && data.features.length > 0 && data.timeline && data.budget);

  const getFirstIncompleteStepIndex = () =>
    steps.findIndex((step) => getSelectedInputs(step).length === 0);

  const clearStepError = (step) => {
    const error = step.querySelector("[data-brief-step-error]");

    step.classList.remove("is-invalid");

    if (error) {
      error.textContent = "";
    }
  };

  const setStepError = (step) => {
    const error = step.querySelector("[data-brief-step-error]");
    const message = step.dataset.briefErrorMessage || "Выберите подходящий вариант.";

    step.classList.add("is-invalid");

    if (error) {
      error.textContent = message;
    }

    if (status) {
      status.textContent = message;
    }

    const firstInput = step.querySelector('input[type="radio"], input[type="checkbox"]');
    firstInput?.focus();
  };

  const formatBriefDraftTime = (date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const draftDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayDifference = Math.round((today.getTime() - draftDay.getTime()) / 86400000);
    const time = briefTimeFormatter.format(date);

    if (dayDifference === 0) {
      return `сегодня, ${time}`;
    }

    if (dayDifference === 1) {
      return `вчера, ${time}`;
    }

    return `${briefDateFormatter.format(date)}, ${time}`;
  };

  const updateBriefDraftUi = (message, { state = "idle", updatedAt = null } = {}) => {
    if (draftPanel) {
      draftPanel.dataset.briefDraftState = state;
    }

    if (draftStatus) {
      draftStatus.textContent = message;
    }

    if (!draftTime) {
      return;
    }

    const date = updatedAt ? new Date(updatedAt) : null;

    if (!date || Number.isNaN(date.getTime())) {
      draftTime.hidden = true;
      draftTime.dateTime = "";
      draftTime.textContent = "";
      return;
    }

    draftTime.hidden = false;
    draftTime.dateTime = date.toISOString();
    draftTime.textContent = `Последнее сохранение: ${formatBriefDraftTime(date)}`;
  };

  const setDeleteDraftButtonAvailability = ({ available, keepFocusable = false }) => {
    if (!deleteDraftButton) {
      return;
    }

    if (available) {
      deleteDraftButton.disabled = false;
      deleteDraftButton.removeAttribute("aria-disabled");
      return;
    }

    if (keepFocusable) {
      deleteDraftButton.disabled = false;
      deleteDraftButton.setAttribute("aria-disabled", "true");
      return;
    }

    deleteDraftButton.disabled = true;
    deleteDraftButton.removeAttribute("aria-disabled");
  };

  const disableBriefDraftStorage = () => {
    briefStorage = null;
    setDeleteDraftButtonAvailability({
      available: false
    });

    updateBriefDraftUi("Сохранение недоступно в этом браузере", {
      state: "unavailable"
    });
  };

  const getBriefStorage = () => {
    try {
      const storage = window.localStorage;
      const testValue = String(Date.now());

      storage.setItem(briefStorageTestKey, testValue);
      storage.removeItem(briefStorageTestKey);

      return storage;
    } catch {
      return null;
    }
  };

  const removeBriefDraftFromStorage = () => {
    if (!briefStorage) {
      return false;
    }

    try {
      briefStorage.removeItem(briefStorageKey);
      return true;
    } catch {
      disableBriefDraftStorage();
      return false;
    }
  };

  const removeBriefDraft = ({
    message = "Черновик удалён. Текущие ответы остаются на экране.",
    state = "deleted",
    keepDeleteButtonFocusable = false
  } = {}) => {
    if (!briefStorage) {
      disableBriefDraftStorage();
      return;
    }

    if (!removeBriefDraftFromStorage()) {
      return;
    }

    setDeleteDraftButtonAvailability({
      available: false,
      keepFocusable: keepDeleteButtonFocusable
    });

    updateBriefDraftUi(message, {
      state
    });
  };

  const createBriefDraft = () => {
    const data = getBriefData();
    const updatedAt = new Date().toISOString();

    return {
      version: briefStorageVersion,
      updatedAt,
      currentStepIndex,
      isComplete: projectBrief.classList.contains("is-complete") && hasCompleteBrief(data),
      answers: data
    };
  };

  const saveBriefDraft = ({ message = "Черновик сохранён" } = {}) => {
    if (!isBriefDraftReady || isRestoringBriefDraft || !briefStorage) {
      return;
    }

    const data = getBriefData();

    if (!hasBriefAnswers(data)) {
      if (!removeBriefDraftFromStorage()) {
        return;
      }

      setDeleteDraftButtonAvailability({
        available: false
      });

      updateBriefDraftUi("Черновик сохраняется автоматически", {
        state: "idle"
      });
      return;
    }

    const draft = createBriefDraft();

    try {
      briefStorage.setItem(briefStorageKey, JSON.stringify(draft));

      setDeleteDraftButtonAvailability({
        available: true
      });

      updateBriefDraftUi(message, {
        state: "saved",
        updatedAt: draft.updatedAt
      });
    } catch {
      disableBriefDraftStorage();
    }
  };

  const updateBriefProgress = (stepIndex, { completed = false } = {}) => {
    const currentValue = completed ? steps.length : stepIndex + 1;
    const percentage = (currentValue / steps.length) * 100;
    const visibleText = completed
      ? "Все 5 шагов заполнены"
      : `Шаг ${currentValue} из ${steps.length}`;

    if (progress) {
      progress.setAttribute("aria-valuenow", String(currentValue));
      progress.setAttribute("aria-valuetext", visibleText);
    }

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    if (progressCurrent) {
      progressCurrent.textContent = String(currentValue);
    }

    if (progressText) {
      progressText.textContent = visibleText;
    }

    indicators.forEach((indicator, index) => {
      const isActive = !completed && index === stepIndex;
      const isComplete = completed || index < stepIndex;

      indicator.classList.toggle("is-active", isActive);
      indicator.classList.toggle("is-complete", isComplete);

      if (isActive) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
  };

  const showBriefStep = (
    requestedIndex,
    { announce = true, moveFocus = true, saveDraft = true } = {}
  ) => {
    if (steps.length === 0) {
      return;
    }

    currentStepIndex = Math.min(Math.max(requestedIndex, 0), steps.length - 1);

    projectBrief.classList.remove("is-complete");

    steps.forEach((step, index) => {
      setBriefElementActive(step, index === currentStepIndex);
    });

    if (summary) {
      setBriefElementActive(summary, false);
    }

    if (controls) {
      controls.hidden = false;
    }

    if (previousButton) {
      previousButton.disabled = currentStepIndex === 0;
    }

    if (nextButton) {
      nextButton.innerHTML =
        currentStepIndex === steps.length - 1
          ? 'Показать итог <span aria-hidden="true">→</span>'
          : 'Продолжить <span aria-hidden="true">→</span>';
    }

    updateBriefProgress(currentStepIndex);

    if (announce && status) {
      const stepName = steps[currentStepIndex].dataset.briefStepName || "Шаг брифа";
      status.textContent = `Открыт шаг ${currentStepIndex + 1} из ${steps.length}: ${stepName}.`;
    }

    if (saveDraft) {
      saveBriefDraft();
    }

    if (moveFocus) {
      const title = steps[currentStepIndex].querySelector("[data-brief-step-title]");

      window.requestAnimationFrame(() => {
        title?.focus({
          preventScroll: true
        });
      });
    }
  };

  const validateCurrentBriefStep = () => {
    const currentStep = steps[currentStepIndex];

    if (!currentStep) {
      return false;
    }

    clearStepError(currentStep);

    if (getSelectedInputs(currentStep).length > 0) {
      return true;
    }

    setStepError(currentStep);
    return false;
  };

  const createBriefSummaryText = createBriefFormSummaryText;

  const renderBriefSummary = () => {
    const data = getBriefData();

    if (summaryFields.siteType) {
      summaryFields.siteType.textContent = data.siteType;
    }

    if (summaryFields.goal) {
      summaryFields.goal.textContent = data.goal;
    }

    if (summaryFields.features) {
      summaryFields.features.textContent = data.features.join(", ");
    }

    if (summaryFields.timeline) {
      summaryFields.timeline.textContent = data.timeline;
    }

    if (summaryFields.budget) {
      summaryFields.budget.textContent = data.budget;
    }

    projectBrief.dataset.briefSummary = createBriefSummaryText(data);
  };

  const showBriefSummary = ({ announce = true, moveFocus = true, saveDraft = true } = {}) => {
    renderBriefSummary();

    steps.forEach((step) => {
      setBriefElementActive(step, false);
    });

    if (summary) {
      setBriefElementActive(summary, true);
    }

    if (controls) {
      controls.hidden = true;
    }

    projectBrief.classList.add("is-complete");
    updateBriefProgress(steps.length - 1, {
      completed: true
    });

    if (announce && status) {
      status.textContent =
        "Бриф заполнен. Проверьте сводку, измените ответы или добавьте её в заявку.";
    }

    if (saveDraft) {
      saveBriefDraft();
    }

    if (moveFocus) {
      window.requestAnimationFrame(() => {
        summaryTitle?.focus({
          preventScroll: true
        });
      });
    }
  };

  openProjectBriefEditor = () => {
    showBriefStep(0, {
      announce: true,
      moveFocus: false
    });

    const firstTitle = steps[0]?.querySelector("[data-brief-step-title]");

    if (briefFormStatus) {
      briefFormStatus.textContent =
        "Открыт бриф для редактирования. Контекст в заявке будет обновлён после повторного добавления.";
    }

    scrollToTrustTarget(projectBrief, firstTitle, "#brief");
  };

  const applyBriefToMessage = () => {
    const data = getBriefData();
    const wasApplied = applyBriefToForm(data);

    if (!wasApplied) {
      if (status) {
        status.textContent = "Не удалось добавить бриф. Проверьте, что заполнены все пять шагов.";
      }

      return;
    }

    if (status) {
      status.textContent =
        "Бриф добавлен в заявку. Отдельные поля Formspree и текстовая сводка обновлены.";
    }
  };

  const isAllowedBriefValue = (value, allowedValues) =>
    value === "" || (typeof value === "string" && allowedValues.has(value));

  const normalizeBriefDraft = (draft) => {
    if (
      !draft ||
      typeof draft !== "object" ||
      draft.version !== briefStorageVersion ||
      typeof draft.updatedAt !== "string" ||
      !Number.isInteger(draft.currentStepIndex) ||
      typeof draft.isComplete !== "boolean" ||
      !draft.answers ||
      typeof draft.answers !== "object"
    ) {
      return null;
    }

    const updatedAt = new Date(draft.updatedAt);
    const answers = draft.answers;
    const draftKeys = Object.keys(draft).sort();
    const answerKeys = Object.keys(answers).sort();
    const expectedDraftKeys = ["answers", "currentStepIndex", "isComplete", "updatedAt", "version"];
    const expectedAnswerKeys = ["budget", "features", "goal", "siteType", "timeline"];

    if (
      JSON.stringify(draftKeys) !== JSON.stringify(expectedDraftKeys) ||
      JSON.stringify(answerKeys) !== JSON.stringify(expectedAnswerKeys) ||
      Number.isNaN(updatedAt.getTime()) ||
      updatedAt.getTime() > Date.now() + 5 * 60 * 1000 ||
      draft.currentStepIndex < 0 ||
      draft.currentStepIndex >= steps.length ||
      typeof answers.siteType !== "string" ||
      typeof answers.goal !== "string" ||
      !Array.isArray(answers.features) ||
      typeof answers.timeline !== "string" ||
      typeof answers.budget !== "string"
    ) {
      return null;
    }

    const features = [...new Set(answers.features)];

    if (
      !features.every(
        (feature) => typeof feature === "string" && allowedBriefValues.features.has(feature)
      ) ||
      !isAllowedBriefValue(answers.siteType, allowedBriefValues.siteType) ||
      !isAllowedBriefValue(answers.goal, allowedBriefValues.goal) ||
      !isAllowedBriefValue(answers.timeline, allowedBriefValues.timeline) ||
      !isAllowedBriefValue(answers.budget, allowedBriefValues.budget)
    ) {
      return null;
    }

    const normalizedAnswers = {
      siteType: answers.siteType,
      goal: answers.goal,
      features,
      timeline: answers.timeline,
      budget: answers.budget
    };

    return {
      version: briefStorageVersion,
      updatedAt: updatedAt.toISOString(),
      currentStepIndex: draft.currentStepIndex,
      isComplete: draft.isComplete && hasCompleteBrief(normalizedAnswers),
      answers: normalizedAnswers
    };
  };

  const clearBriefInputs = () => {
    briefInputs.forEach((input) => {
      input.checked = false;
    });
  };

  const restoreBriefInputs = (answers) => {
    briefInputs.forEach((input) => {
      if (input.name === "brief_site_type") {
        input.checked = input.value === answers.siteType;
        return;
      }

      if (input.name === "brief_goal") {
        input.checked = input.value === answers.goal;
        return;
      }

      if (input.name === "brief_features") {
        input.checked = answers.features.includes(input.value);
        return;
      }

      if (input.name === "brief_timeline") {
        input.checked = input.value === answers.timeline;
        return;
      }

      if (input.name === "brief_budget") {
        input.checked = input.value === answers.budget;
      }
    });
  };

  const restoreBriefDraft = () => {
    if (!briefStorage) {
      return false;
    }

    let rawDraft = "";

    try {
      rawDraft = briefStorage.getItem(briefStorageKey) || "";
    } catch {
      disableBriefDraftStorage();
      return false;
    }

    if (!rawDraft) {
      updateBriefDraftUi("Черновик сохраняется автоматически", {
        state: "idle"
      });
      return false;
    }

    let parsedDraft;

    try {
      parsedDraft = JSON.parse(rawDraft);
    } catch {
      removeBriefDraftFromStorage();
      clearBriefInputs();

      updateBriefDraftUi("Черновик не удалось восстановить. Начат новый бриф.", {
        state: "error"
      });
      return false;
    }

    const draft = normalizeBriefDraft(parsedDraft);

    if (!draft) {
      removeBriefDraftFromStorage();
      clearBriefInputs();

      updateBriefDraftUi("Черновик не удалось восстановить. Начат новый бриф.", {
        state: "error"
      });
      return false;
    }

    const draftAge = Date.now() - new Date(draft.updatedAt).getTime();

    if (draftAge > briefDraftLifetime) {
      removeBriefDraftFromStorage();
      clearBriefInputs();

      updateBriefDraftUi("Черновик сохраняется автоматически", {
        state: "idle"
      });
      return false;
    }

    isRestoringBriefDraft = true;
    restoreBriefInputs(draft.answers);

    if (draft.isComplete) {
      showBriefSummary({
        announce: false,
        moveFocus: false,
        saveDraft: false
      });
    } else {
      const firstIncompleteStepIndex = getFirstIncompleteStepIndex();
      const restoredStepIndex =
        firstIncompleteStepIndex !== -1 && draft.currentStepIndex > firstIncompleteStepIndex
          ? firstIncompleteStepIndex
          : draft.currentStepIndex;

      showBriefStep(restoredStepIndex, {
        announce: false,
        moveFocus: false,
        saveDraft: false
      });
    }

    isRestoringBriefDraft = false;

    setDeleteDraftButtonAvailability({
      available: true
    });

    updateBriefDraftUi("Черновик восстановлен", {
      state: "restored",
      updatedAt: draft.updatedAt
    });

    return true;
  };

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showBriefStep(currentStepIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!validateCurrentBriefStep()) {
        return;
      }

      if (currentStepIndex === steps.length - 1) {
        showBriefSummary();
        return;
      }

      showBriefStep(currentStepIndex + 1);
    });
  }

  if (editButton) {
    editButton.addEventListener("click", () => {
      showBriefStep(0);
    });
  }

  if (applyButton) {
    applyButton.addEventListener("click", (event) => {
      event.preventDefault();
      applyBriefToMessage();
    });
  }

  if (deleteDraftButton) {
    deleteDraftButton.addEventListener("click", () => {
      if (deleteDraftButton.getAttribute("aria-disabled") === "true") {
        return;
      }

      removeBriefDraft({
        keepDeleteButtonFocusable: true
      });
    });
  }

  if (controls) {
    controls.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (currentStepIndex > 0) {
          showBriefStep(currentStepIndex - 1);
        }

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextButton?.click();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        showBriefStep(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();

        const incompleteStepIndex = getFirstIncompleteStepIndex();

        if (incompleteStepIndex === -1) {
          showBriefStep(steps.length - 1);
          return;
        }

        showBriefStep(incompleteStepIndex);

        if (status) {
          status.textContent = `Сначала заполните шаг ${incompleteStepIndex + 1} из ${steps.length}.`;
        }
      }
    });
  }

  projectBrief.addEventListener("change", (event) => {
    const changedStep = event.target.closest("[data-brief-step]");

    if (changedStep) {
      clearStepError(changedStep);

      if (status) {
        status.textContent = "";
      }

      saveBriefDraft();
    }
  });

  projectBrief.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (projectBrief.classList.contains("is-complete")) {
      event.preventDefault();
      showBriefStep(steps.length - 1);
      return;
    }

    if (currentStepIndex > 0) {
      event.preventDefault();
      showBriefStep(currentStepIndex - 1);
    }
  });

  projectBrief.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      projectBrief.dataset.briefSummary = "";

      Object.values(summaryFields).forEach((field) => {
        if (field) {
          field.textContent = "";
        }
      });

      steps.forEach(clearStepError);

      showBriefStep(0, {
        announce: false,
        moveFocus: false,
        saveDraft: false
      });

      if (briefStorage) {
        removeBriefDraft({
          message: "Черновик удалён вместе с ответами брифа.",
          state: "deleted"
        });
      }

      if (status) {
        status.textContent = "Бриф очищен. Открыт первый шаг.";
      }

      const firstTitle = steps[0]?.querySelector("[data-brief-step-title]");

      firstTitle?.focus({
        preventScroll: true
      });
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== briefStorageKey) {
      return;
    }

    setDeleteDraftButtonAvailability({
      available: event.newValue !== null
    });

    updateBriefDraftUi(
      "Черновик изменён в другой вкладке. Обновите страницу, чтобы восстановить новую версию.",
      {
        state: "external"
      }
    );
  });

  projectBrief.classList.add("is-enhanced");

  if (summary) {
    summary.hidden = true;
    summary.setAttribute("aria-hidden", "true");

    if ("inert" in summary) {
      summary.inert = true;
    }
  }

  briefStorage = getBriefStorage();

  if (!briefStorage) {
    disableBriefDraftStorage();
  } else {
    updateBriefDraftUi("Черновик сохраняется автоматически", {
      state: "idle"
    });
  }

  const briefDraftRestored = restoreBriefDraft();

  if (!briefDraftRestored) {
    showBriefStep(0, {
      announce: false,
      moveFocus: false,
      saveDraft: false
    });
  }

  isBriefDraftReady = true;
}
let getCalculatorConfiguration = () => null;
let updateCalculator = () => null;
let selectCalculatorPlan = () => null;

if (calculator) {
  const planInputs = Array.from(calculator.querySelectorAll("[data-calculator-plan]"));
  const extraInputs = Array.from(calculator.querySelectorAll("[data-calculator-extra]"));
  const totalOutput = calculator.querySelector("[data-calculator-total]");
  const summaryList = calculator.querySelector("[data-calculator-summary]");
  const calculatorStatus = calculator.querySelector("[data-calculator-status]");

  const createSummaryItem = (name, price) => {
    const item = document.createElement("li");
    const nameElement = document.createElement("span");
    const priceElement = document.createElement("strong");

    nameElement.textContent = name;
    priceElement.textContent = formatCurrency(price);

    item.append(nameElement, priceElement);

    return item;
  };

  const getSelectedPlan = () => planInputs.find((input) => input.checked) || planInputs[0];

  const getSelectedExtras = () => extraInputs.filter((input) => input.checked);

  getCalculatorConfiguration = () => {
    const selectedPlan = getSelectedPlan();

    if (!selectedPlan) {
      return null;
    }

    const extras = getSelectedExtras().map((input) => ({
      name: input.dataset.extraName || "Дополнительная функция",
      price: Number(input.value)
    }));
    const basePrice = Number(selectedPlan.value);
    const extrasPrice = extras.reduce((total, extra) => total + extra.price, 0);

    return {
      planName: selectedPlan.dataset.planName || "Выбранный тариф",
      basePrice,
      extras,
      totalPrice: basePrice + extrasPrice
    };
  };

  updateCalculator = ({ announce = true, reset = false, syncForm = true } = {}) => {
    const configuration = getCalculatorConfiguration();

    if (!configuration || !totalOutput || !summaryList) {
      return configuration;
    }

    totalOutput.value = String(configuration.totalPrice);
    totalOutput.textContent = formatCurrency(configuration.totalPrice);

    const summaryItems = [
      createSummaryItem(`Тариф «${configuration.planName}»`, configuration.basePrice),
      ...configuration.extras.map((extra) => createSummaryItem(extra.name, extra.price))
    ];

    summaryList.replaceChildren(...summaryItems);

    if (syncForm && activeFormConfiguration) {
      applyConfigurationToForm(configuration, {
        announce: false
      });
    }

    if (!announce || !calculatorStatus) {
      return configuration;
    }

    const extrasCount = configuration.extras.length;
    const extrasText =
      extrasCount === 0
        ? "Дополнительные функции не выбраны."
        : `Выбрано дополнительных функций: ${extrasCount}.`;

    calculatorStatus.textContent = reset
      ? `Расчёт сброшен. Выбран тариф «${configuration.planName}». Итоговая стоимость ${formatCurrency(
          configuration.totalPrice
        )}.`
      : `Выбран тариф «${configuration.planName}». ${extrasText} Итоговая стоимость ${formatCurrency(
          configuration.totalPrice
        )}.`;

    return configuration;
  };

  selectCalculatorPlan = (planName, { clearExtras = false, announce = true } = {}) => {
    const matchingPlan = planInputs.find((input) => input.dataset.planName === planName);

    if (!matchingPlan) {
      return null;
    }

    matchingPlan.checked = true;

    if (clearExtras) {
      extraInputs.forEach((input) => {
        input.checked = false;
      });
    }

    return updateCalculator({
      announce,
      syncForm: false
    });
  };

  calculator.addEventListener("change", (event) => {
    if (event.target.matches("[data-calculator-plan], [data-calculator-extra]")) {
      updateCalculator();
    }
  });

  calculator.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      updateCalculator({
        announce: true,
        reset: true
      });
    });
  });

  updateCalculator({
    announce: false,
    syncForm: false
  });
}

pricingSelectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const planName = button.dataset.plan;
    const configuration = selectCalculatorPlan(planName, {
      clearExtras: true,
      announce: true
    });

    if (configuration) {
      applyConfigurationToForm(configuration);
    }
  });
});

if (calculatorApplyButton) {
  calculatorApplyButton.addEventListener("click", () => {
    const configuration = updateCalculator({
      announce: false,
      syncForm: false
    });

    if (configuration) {
      applyConfigurationToForm(configuration);
    }
  });
}

if (clearConfigurationButton) {
  clearConfigurationButton.addEventListener("click", () => {
    clearFormConfiguration();

    window.requestAnimationFrame(() => {
      clearConfigurationButton.blur();
    });
  });
}

if (clearReferenceButton) {
  clearReferenceButton.addEventListener("click", () => {
    clearFormReference();

    window.requestAnimationFrame(() => {
      contactsTitle?.focus({
        preventScroll: true
      });
    });
  });
}

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
      clearFormConfiguration({
        announce: false
      });
      clearFormReference({
        announce: false
      });
      clearFormBrief({
        announce: false,
        removeMessage: false
      });
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
