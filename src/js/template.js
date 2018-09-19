export const categoriesTemplate = (data) => {
  return `
    <button class="left-nav__categories-list__filter__item">
      <span class="left-nav__categories-list__filter__text">${data.key}</span>
    </button>`
}


export const categoriesListTemplate = (data) => {
  return `
    <li class="left-nav__categories-list__filtered__item">
       <a class="filtered__item__link" href="#">${data}</a>
    </li>`
}
