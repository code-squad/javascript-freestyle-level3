import { categoriesTemplate, categoriesListTemplate } from './template.js'
import View from './View.js';

export default class extends View {
  constructor(el) {
    super(el);
  }

  bind(cmd, ...params) {
    const commands = {
      switch: () => {
        this.delegate('.left-nav__categories-list__filter__text', 'click', () => {
          this.empty('.left-nav__categories-list__filtered-list');
        })
      },

      hover: () => {
        this.on('mouseover', () => this.showCategoriesList(this.qs('.left-nav__categories-list')));
      },

      detach: () => {
        this.on('mouseleave', () => this.hideCategoriesList(this.qs('.left-nav__categories-list')));
      },


    }
    commands[cmd]();
    return this;
  }



  render(cmd, ...params) {
    const commands = {
      show: () => {
        this.showCategoriesList(...params);
      },

      hide: () => {
        this.hideCategoriesList(...params);
      },

      categories: () => {
        this.renderCategoriesList(...params);
      },

      items: () => {
        this.renderCategoriesListItem(...params);
      }
    }
    commands[cmd]();
    return this;
  }


  showCategoriesList(el) {
    el.style.display = 'block';
  }


  hideCategoriesList(el) {
    el.style.display = 'none';
  }


  renderCategoriesList(data) {
    this.categoriesFilters = this.qs('.left-nav__categories-list__filter');
    data.forEach(el => {
      this.categoriesFilters.insertAdjacentHTML('beforeend', categoriesTemplate(el));
    });
  }


  renderCategoriesListItem(data, idx) {
    this.categoriesFiltersList = this.qs('.left-nav__categories-list__filtered-list');
    data[idx].detail.forEach(el => {
      this.categoriesFiltersList.insertAdjacentHTML('beforeend', categoriesListTemplate(el));
    });
  }

}