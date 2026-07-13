'use strict';

const page = document.querySelector('.page');
const menuButton = document.querySelector('.header__menu-button');
const menuLinks = document.querySelectorAll('.nav__link');
const playButtons = document.querySelectorAll('.play');

// O estado no body controla menu mobile, scroll travado e animacao do botao.
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

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
