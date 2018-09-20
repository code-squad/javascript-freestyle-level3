export default class {

  constructor(urlList, categoriesView) {
    this.urlList = urlList;
    this.categoriesView = categoriesView;
  }

  setView() {
    this.fetchCategories('./src/js/database.json');

    this.categoriesView
      .bind('switch')
      .on('click', e => {
        if (e.target.tagName !== 'SPAN') return;
        this.parentEls = [...e.target.parentElement.parentElement.children];
        this.index = this.parentEls.indexOf(e.target.parentElement);
        this.categoriesView.render('items', this.db.categories, this.index);
      })

    this.categoriesView.bind('hover');
    this.categoriesView.bind('detach');
  }

  async fetchCategories(obj) {
    this.db = await fetch(obj).then(response => response.json()).then(json => this.db = json);
    this.categoriesView
      .render('categories', this.db.categories)
      .render('items', this.db.categories, 0);
  }
}