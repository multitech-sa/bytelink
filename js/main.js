(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  const setMenuState = (open) => {
    if (!menuToggle) return;
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    header?.classList.toggle("nav-open", open);
  };

  const closeNav = () => {
    nav?.classList.remove("is-open");
    setMenuState(false);
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      setMenuState(isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  const cepInput = document.getElementById("cep");
  const formatCep = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  };

  if (cepInput) {
    cepInput.addEventListener("input", () => {
      cepInput.value = formatCep(cepInput.value);
    });
  }

  const updateYear = () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  };

  updateYear();

  const showFeedback = (selector, message) => {
    const feedback = document.querySelector(selector);
    if (feedback) {
      feedback.textContent = message;
    }
  };

  const cepForm = document.querySelector(".cep-form");
  cepForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cepInput) return;

    const cepValue = cepInput.value.replace(/\D/g, "");
    const valid = cepValue.length === 8;
    showFeedback(
      '[data-feedback="cep"]',
      valid
        ? "Cobertura em análise! Nossa equipe entrará em contato."
        : "Digite um CEP válido com 8 números."
    );
  });

  const contactForm = document.querySelector(".contact-form");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = document.querySelector('[data-feedback="contact"]');
    if (!feedback) return;

    if (!contactForm.checkValidity()) {
      feedback.textContent = "Preencha os campos obrigatórios para enviar.";
      return;
    }

    feedback.textContent = "Mensagem enviada com sucesso! Retornaremos em breve.";
    contactForm.reset();
  });
})();
