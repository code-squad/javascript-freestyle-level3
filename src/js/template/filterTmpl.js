export const renderCategoriesTemplate = (param) => {
  let data = param.map(element => element);
  return data.reduce((acc, crr) => acc += `
    <button class="left-nav__categories-list__filter__item">
      <span class="left-nav__categories-list__filter__text">${crr.key}</span>
    </button>`, '');
}

export const renderCategoryListsTemplate = (selector) => {
  return selector.reduce((acc, crr) => acc += `
    <li class="left-nav__categories-list__filtered__item">
       <a class="filtered__item__link" href="#">${crr.name}</a>
    </li>`, '');
}
