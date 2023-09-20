'use strict';

const navItems = document.querySelectorAll('.nav__item');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    for (let i=0; i < navItems.length; i++) {
        if (navItems[i].classList.contains('nav__item_active')) {
            navItems[i].classList.remove('nav__item_active')
        }
    }
    item.classList.add('nav__item_active');
  });
});

