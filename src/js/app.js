let category = document.querySelector('.header__gnb__left-nav__categories-link');

console.log(category);


category.addEventListener('click', e => {
  console.log(e.target);
})