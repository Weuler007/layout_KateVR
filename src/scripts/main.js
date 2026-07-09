'use strict';

const page = document.querySelector('.page');
const menuButton = document.querySelector('.header__menu-button');
const menuLinks = document.querySelectorAll('.nav__link');

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

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.reset();
  });
});
