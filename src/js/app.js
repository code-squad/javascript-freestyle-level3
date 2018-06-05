const template = (templateid, data) => {
  return document.getElementById(templateid).innerHTML
    .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : "");
}




const showItems = (val, templateId) => {
  return val.reduce((acc, curr) => acc += template(templateId, curr), '');
}





const categoriesTemplate = (function () {
  const _makeFilters = () => {
    let filters = document.querySelector('.header__gnb__left-nav__categories-list__filter');
    return filters.innerHTML += showItems(mainCategories, 'header__gnb__left-nav__categories-list__template');
  }

  const _makeFilterLists = () => {
    let filterLists = document.querySelector('.header__gnb__left-nav__categories-list__filtered-list');
    return filterLists.innerHTML += showItems(categoriesLists[0], 'header__gnb__left-nav__categories-list__filter-list__template');
  }
  return {
    getFilter() {
      return _makeFilters() && _makeFilterLists();
    }
  }
})();
categoriesTemplate.getFilter();






const categoriesLink = document.querySelector('.header__gnb__left-nav__categories-link');
const categoriesBox = document.querySelector('.header__gnb__left-nav__categories-list');
const categoriesNav = document.querySelector('.header__gnb__left-nav__categories');

categoriesLink.addEventListener('pointerover', e => {
  categoriesBox.classList.add('active')
})

categoriesBox.addEventListener('pointerleave', e => {
  categoriesBox.classList.remove('active')
})

categoriesNav.addEventListener('pointerleave', e => {
  categoriesBox.classList.remove('active')
})



const switchFilter = () => {
  const categoriesFilterBtns = document.querySelectorAll('.header__gnb__left-nav__categories-list__filter__item');
  categoriesFilterBtns.forEach((elem, idx) => {
    elem.addEventListener('click', e => {
      let filterLists = document.querySelector('.header__gnb__left-nav__categories-list__filtered-list');
      filterLists.innerHTML =
        `
        <template id="header__gnb__left-nav__categories-list__filter-list__template">
          <li class="header__gnb__left-nav__categories-list__filtered__item">
            <a class="filtered__item__link" href="#">{{name}}</a>
          </li>
        </template>
        `
      return filterLists.innerHTML += showItems(categoriesLists[idx], 'header__gnb__left-nav__categories-list__filter-list__template');
    })
  })
}

switchFilter();



const getMovieData = () => {
  let state = 'https://api.themoviedb.org/3/discover/movie';
  let api = '?api_key=64391ca210dbae0d44b0a622177ef8d3';
  let korean = '&language=ko'
  let movieDB = state + api + korean;
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    let movieList = JSON.parse(this.responseText).results;
    let movieSlideList = JSON.parse(this.responseText).results.sort(() => Math.random() - 0.5).slice(0, 3);
    renderContents(movieList, movieSlideList);
    swipeMainContents();

  });
  oReq.open("GET", movieDB)
  oReq.send();
}


getMovieData();





const renderContents = (movieData, slideData) => {
  const movieContents = document.querySelector('.main__cinemas__list__body__slider__contents');
  const sliderContent = document.querySelector('.main__slider__content');
  movieContents.innerHTML += showItems(movieData, 'main__cinemas__list__body__slider__contents__template');
  sliderContent.innerHTML += showItems(slideData, 'main__slider__content__template');
}


