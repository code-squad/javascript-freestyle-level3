const template = (templateid, data) => {
  return document.getElementById(templateid).innerHTML
    .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : "");
}



const showItems = (val, templateId) => {
  return val.reduce((acc, curr) => acc += template(templateId, curr), '')
}



const mainCategoriesTmpl = (function () {
  let categoriesFilters = document.querySelector('.header__gnb__left-nav__categories-list__filter');
  const _makeFilters = () => {
    return categoriesFilters.innerHTML += showItems(mainCategories, 'header__gnb__left-nav__categories-list__template')
  }
  return {
    getFilters() {
      return _makeFilters();
    }
  }
})();



const subCategoriesTmpl = (function () {
  let categoriesFilterList = document.querySelector('.header__gnb__left-nav__categories-list__filtered-list');
  const _makeFilterItems = () => {
    return categoriesFilterList.innerHTML += showItems(categories.characteristic, 'header__gnb__left-nav__categories-list__filter-list__template')
  }
  return {
    getFilterItems() {
      return _makeFilterItems();
    }
  }
})();



mainCategoriesTmpl.getFilters();
subCategoriesTmpl.getFilterItems();