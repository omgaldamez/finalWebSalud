const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

menuButton.addEventListener('mouseenter', () => {
  menu.classList.toggle('show');
});

menu.addEventListener('mouseleave', () => {
  menu.classList.remove('show');
});
