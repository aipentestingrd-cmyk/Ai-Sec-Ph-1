(() => {
  'use strict';

  const FORM_SELECTOR = [
    '[data-newsletter-form]',
    '[data-city-form]',
    '[data-speaker-form]',
    '[data-topic-form]',
    '[data-sponsor-form]',
    '[data-contact-form]',
    '[data-hackathon-form]',
  ].join(', ');

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const forms = document.querySelectorAll(FORM_SELECTOR);
  if (!forms.length) return;

  function setFieldError(field, message) {
    const group = field.closest('.form-group') || field.parentElement;
    let errorEl = group.querySelector('.form-error');

    if (message) {
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.setAttribute('role', 'alert');
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      if (field.id) {
        errorEl.id = errorEl.id || `${field.id}-error`;
        field.setAttribute('aria-describedby', errorEl.id);
      }
    } else {
      if (errorEl) errorEl.remove();
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }

  function validateField(field) {
    const value = field.value.trim();
    let message = '';

    if (field.hasAttribute('required') && !value) {
      message = 'This field is required.';
    } else if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
      message = 'Enter a valid email address.';
    }

    setFieldError(field, message);
    return !message;
  }

  function showSuccess(form) {
    const message = document.createElement('p');
    message.className = 'form-success';
    message.setAttribute('role', 'status');
    message.textContent = "Thanks! We'll be in touch.";
    form.replaceWith(message);
  }

  function clearFormState(form) {
    form.querySelectorAll('.is-invalid').forEach((field) => {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    });
    form.querySelectorAll('.form-error').forEach((el) => el.remove());
  }

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fieldsToValidate = new Set([
        ...form.querySelectorAll('[required]'),
        ...form.querySelectorAll('input[type="email"]'),
      ]);

      let isValid = true;
      fieldsToValidate.forEach((field) => {
        if (!validateField(field)) isValid = false;
      });

      if (isValid) {
        showSuccess(form);
        return;
      }

      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    });

    form.addEventListener('reset', () => clearFormState(form));
  });
})();