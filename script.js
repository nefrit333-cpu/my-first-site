const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");

function updateThemeButton(isLightTheme) {
  if (isLightTheme) {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Включить тёмную тему");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Включить светлую тему");
    themeToggle.setAttribute("aria-pressed", "false");
  }
}

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  updateThemeButton(true);
} else {
  updateThemeButton(false);
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");

  const isLightTheme = document.body.classList.contains("light-theme");

  if (isLightTheme) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  updateThemeButton(isLightTheme);
});

const header = document.querySelector(".header");

function toggleFloatingHeader() {
  const heroCard = document.querySelector(".hero-card");

  if (!header || !heroCard) {
    return;
  }

  const isMobile = window.innerWidth <= 768;
  const triggerPoint = heroCard.offsetTop - 20;

  if (isMobile && window.scrollY >= triggerPoint) {
    header.classList.add("header-floating");
  } else {
    header.classList.remove("header-floating");
  }
}

window.addEventListener("scroll", toggleFloatingHeader);
window.addEventListener("resize", toggleFloatingHeader);

toggleFloatingHeader();

const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const navLinks = document.querySelectorAll(".nav a");

siteNav.setAttribute("aria-label", "Основная навигация");
menuButton.setAttribute("aria-controls", "siteNav");

function closeMobileMenu() {
  siteNav.classList.remove("nav-open");
  menuButton.classList.remove("menu-button-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
}

function openMobileMenu() {
  siteNav.classList.add("nav-open");
  menuButton.classList.add("menu-button-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Закрыть меню");
}

menuButton.addEventListener("click", function () {
  const isMenuOpen = siteNav.classList.contains("nav-open");

  if (isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    closeMobileMenu();
  });
});

const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  let activeSectionId = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 160;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      activeSectionId = section.id;
    }
  });

  const isPageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

  if (isPageBottom) {
    activeSectionId = "contacts";
  }

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");

    if (href === "#" + activeSectionId) {
      link.classList.add("nav-link-active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("nav-link-active");
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("resize", updateActiveNavLink);

updateActiveNavLink();

const scrollTopButton = document.querySelector("#scrollTopButton");

function toggleScrollTopButton() {
  if (window.scrollY > 500) {
    scrollTopButton.classList.add("scroll-top-visible");
  } else {
    scrollTopButton.classList.remove("scroll-top-visible");
  }
}

window.addEventListener("scroll", toggleScrollTopButton);

scrollTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

toggleScrollTopButton();

const projectButtons = document.querySelectorAll(".project-link");
const projectModal = document.querySelector("#projectModal");
const modalOverlay = document.querySelector("#modalOverlay");
const modalClose = document.querySelector("#modalClose");
const modalContent = projectModal.querySelector(".modal-content");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalContactButton = projectModal.querySelector(".button");

let lastFocusedElement = null;

projectModal.setAttribute("role", "dialog");
projectModal.setAttribute("aria-modal", "true");
projectModal.setAttribute("aria-labelledby", "modalTitle");
projectModal.setAttribute("aria-describedby", "modalText");
projectModal.setAttribute("aria-hidden", "true");
modalContent.setAttribute("tabindex", "-1");

function getModalFocusableElements() {
  return modalContent.querySelectorAll(
    "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"
  );
}

function openModal(button) {
  const title = button.dataset.title;
  const description = button.dataset.description;

  lastFocusedElement = button;

  modalTitle.textContent = title;
  modalText.textContent = description;

  projectModal.classList.add("modal-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-is-open");

  setTimeout(function () {
    modalClose.focus();
  }, 0);
}

function closeModal(options = {}) {
  const shouldRestoreFocus = options.restoreFocus !== false;
  const isModalOpen = projectModal.classList.contains("modal-open");

  if (!isModalOpen) {
    return;
  }

  projectModal.classList.remove("modal-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-is-open");

  if (shouldRestoreFocus && lastFocusedElement) {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
}

function trapModalFocus(event) {
  const focusableElements = Array.from(getModalFocusableElements());

  if (focusableElements.length === 0) {
    return;
  }

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusableElement) {
    event.preventDefault();
    lastFocusableElement.focus();
  }

  if (!event.shiftKey && document.activeElement === lastFocusableElement) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
}

projectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    openModal(button);
  });
});

modalClose.addEventListener("click", function () {
  closeModal();
});

modalOverlay.addEventListener("click", function () {
  closeModal();
});

modalContactButton.addEventListener("click", function () {
  closeModal({
    restoreFocus: false
  });
});

document.addEventListener("keydown", function (event) {
  const isModalOpen = projectModal.classList.contains("modal-open");

  if (event.key === "Escape") {
    closeModal();
    closeMobileMenu();
  }

  if (isModalOpen && event.key === "Tab") {
    trapModalFocus(event);
  }
});

const faqItems = document.querySelectorAll(".faq-item");

function closeFaqItem(item) {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  item.classList.remove("faq-open");
  question.setAttribute("aria-expanded", "false");
  answer.setAttribute("aria-hidden", "true");
  answer.style.maxHeight = null;
}

function openFaqItem(item) {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  item.classList.add("faq-open");
  question.setAttribute("aria-expanded", "true");
  answer.setAttribute("aria-hidden", "false");
  answer.style.maxHeight = answer.scrollHeight + "px";
}

faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {
    const isOpen = item.classList.contains("faq-open");

    faqItems.forEach(function (currentItem) {
      closeFaqItem(currentItem);
    });

    if (!isOpen) {
      openFaqItem(item);
    }
  });
});

window.addEventListener("resize", function () {
  faqItems.forEach(function (item) {
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("faq-open")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formMessage = document.querySelector("#formMessage");
const submitButton = contactForm.querySelector("button[type='submit']");

formMessage.setAttribute("role", "status");
formMessage.setAttribute("aria-live", "polite");

function isEmailValid(email) {
  return email.includes("@") && email.includes(".");
}

function isOnlyNumbers(value) {
  return /^\d+$/.test(value);
}

function showError(text) {
  formMessage.textContent = text;
  formMessage.style.color = "#dc2626";
}

function showSuccess(text) {
  formMessage.textContent = text;
  formMessage.style.color = "var(--color-accent)";
}

function clearFormMessage() {
  formMessage.textContent = "";
}

function startLoading() {
  submitButton.disabled = true;
  submitButton.textContent = "Отправляем...";
  submitButton.setAttribute("aria-busy", "true");
  submitButton.style.opacity = "0.7";
  submitButton.style.cursor = "not-allowed";
}

function stopLoading() {
  submitButton.disabled = false;
  submitButton.textContent = "Отправить заявку";
  submitButton.setAttribute("aria-busy", "false");
  submitButton.style.opacity = "1";
  submitButton.style.cursor = "pointer";
}

nameInput.addEventListener("input", clearFormMessage);
emailInput.addEventListener("input", clearFormMessage);
messageInput.addEventListener("input", clearFormMessage);

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name === "") {
    showError("Введите ваше имя.");
    nameInput.focus();
    return;
  }

  if (name.length < 2) {
    showError("Имя должно быть не короче 2 символов.");
    nameInput.focus();
    return;
  }

  if (isOnlyNumbers(name)) {
    showError("Имя не должно состоять только из цифр.");
    nameInput.focus();
    return;
  }

  if (email === "") {
    showError("Введите ваш email.");
    emailInput.focus();
    return;
  }

  if (!isEmailValid(email)) {
    showError("Введите корректный email.");
    emailInput.focus();
    return;
  }

  if (message === "") {
    showError("Введите сообщение.");
    messageInput.focus();
    return;
  }

  if (message.length < 10) {
    showError("Сообщение должно быть не короче 10 символов.");
    messageInput.focus();
    return;
  }

  startLoading();

  setTimeout(function () {
    showSuccess(`${name}, спасибо! Заявка успешно отправлена.`);

    contactForm.reset();

    stopLoading();
  }, 1000);
});
