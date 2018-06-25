import { loadData } from '../async.js';
import { $on, $qs, $qsa, $empty } from '../helper.js';
import { renderCategoryListsTemplate, renderCategoriesTemplate } from '../template/filterTmpl.js';


export class CategoriesView {
  constructor() {
    this.categoriesNavigation = $qs('.left-nav__categories');
    this.categoriesLink = $qs('.left-nav__categories-link');
    this.categoriesBox = $qs('.left-nav__categories-list');
    this.filterLists = $qs('.left-nav__categories-list__filtered-list');
    this.filter = $qs('.left-nav__categories-list__filter');
  }


  expandCategories(selector, link, box) {
    return $on(selector, 'mouseover', event => event.target === link && box.classList.add('active'));
  }


  collapseCategories(selector, box) {
    return $on(selector, 'mouseleave', event => { if (event.target === box || selector) box.classList.remove('active'); })
  }


  initLoad() {
    loadData('src/js/db.json', this.renderCategories.bind(this));
  }


  renderCategories(json) {
    this.filter.insertAdjacentHTML('beforeend', renderCategoriesTemplate(json.categories));
    this.filterLists.insertAdjacentHTML('beforeend', renderCategoryListsTemplate(json.categories[0].detail));
    this.switchCategoriesLists(json.categories);
  }


  switchCategoriesLists(category) {
    $on(this.filter, 'click', event => {
      $empty(this.filterLists);
      const filterByCategories = (object) => event.target.innerText === object.key && object.key;
      this.filterLists.insertAdjacentHTML('beforeend', renderCategoryListsTemplate(category.filter(filterByCategories)[0].detail))
    });
  }
}




export class CategoriesController {
  constructor(categoriesView) {
    this.categoriesView = categoriesView;
    this.collapseExpandCategories();
    this.categoriesView.initLoad();
  }


  collapseExpandCategories() {
    const { expandCategories, collapseCategories, categoriesNavigation, categoriesLink, categoriesBox } = this.categoriesView;
    expandCategories(categoriesNavigation, categoriesLink, categoriesBox);
    collapseCategories(categoriesNavigation, categoriesBox);
  };
}