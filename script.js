const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");

  const isLightTheme = document.body.classList.contains("light-theme");

  if (isLightTheme) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});

const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const navLinks = document.querySelectorAll(".nav a");

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
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalContactButton = projectModal.querySelector(".button");

projectButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const title = button.dataset.title;
    const description = button.dataset.description;

    modalTitle.textContent = title;
    modalText.textContent = description;

    projectModal.classList.add("modal-open");
    document.body.classList.add("modal-is-open");
  });
});

function closeModal() {
  projectModal.classList.remove("modal-open");
  document.body.classList.remove("modal-is-open");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

modalContactButton.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    closeMobileMenu();
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
  submitButton.style.opacity = "0.7";
  submitButton.style.cursor = "not-allowed";
}

function stopLoading() {
  submitButton.disabled = false;
  submitButton.textContent = "Отправить заявку";
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
    return;
  }

  if (name.length < 2) {
    showError("Имя должно быть не короче 2 символов.");
    return;
  }

  if (isOnlyNumbers(name)) {
    showError("Имя не должно состоять только из цифр.");
    return;
  }

  if (email === "") {
    showError("Введите ваш email.");
    return;
  }

  if (!isEmailValid(email)) {
    showError("Введите корректный email.");
    return;
  }

  if (message === "") {
    showError("Введите сообщение.");
    return;
  }

  if (message.length < 10) {
    showError("Сообщение должно быть не короче 10 символов.");
    return;
  }

  startLoading();

  setTimeout(function () {
    showSuccess(`${name}, спасибо! Заявка успешно отправлена.`);

    contactForm.reset();

    stopLoading();
  }, 1000);
});