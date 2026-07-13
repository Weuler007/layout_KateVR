'use strict';

const page = document.querySelector('.page');
const menuButton = document.querySelector('.header__menu-button');
const menuLinks = document.querySelectorAll('.nav__link');
const playButtons = document.querySelectorAll('.play');
const modalOpeners = document.querySelectorAll('[data-modal-open]');
const modals = document.querySelectorAll('[data-modal]');
const orderStages = document.querySelectorAll('[data-order-stage]');
const orderSteps = document.querySelectorAll('.order__step');
const orderForms = document.querySelectorAll('[data-order-form]');

// O estado no body separa menu mobile e modal para evitar abrir os dois juntos.
const setMenuState = isOpen => {
  page.classList.toggle('page--menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
};

menuButton.addEventListener('click', () => {
  setMenuState(!page.classList.contains('page--menu-open'));
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => setMenuState(false));
});

playButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.open(button.dataset.videoUrl, '_blank', 'noopener,noreferrer');
  });
});

const openModal = modalName => {
  const modal = document.querySelector(`[data-modal="${modalName}"]`);

  if (!modal) {
    return;
  }

  modal.classList.add('modal--open');
  modal.setAttribute('aria-hidden', 'false');
  page.classList.add('page--modal-open');
};

const closeModals = () => {
  modals.forEach(modal => {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
  });
  page.classList.remove('page--modal-open');
};

modalOpeners.forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.modalOpen));
});

modals.forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.hasAttribute('data-modal-close')) {
      closeModals();
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModals();
  }
});

const setOrderStage = stageName => {
  const stepByStage = {
    details: 0,
    complete: 2,
  };

  orderStages.forEach(stage => {
    stage.classList.toggle(
      'order__stage--active',
      stage.dataset.orderStage === stageName,
    );
  });

  orderSteps.forEach((step, index) => {
    step.classList.toggle('order__step--active', index === stepByStage[stageName]);
  });
};

orderForms.forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    form.reset();
    setOrderStage('complete');
    document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.contact__form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
