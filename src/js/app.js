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






const swipeMainContents = () => {
  let count = 0;
  const mainSlides = document.querySelectorAll(".main__slider__content__container");
  const prev = document.querySelector('.main__slider__nav__prev__arrow-icon');
  const next = document.querySelector('.main__slider__nav__next__arrow-icon');
  mainSlides[0].style.opacity = '1';

  const dots = document.querySelector('.main__slider__nav__dots');
  const dotBtn = dots.querySelectorAll('.main__slider__nav__dots__item')
  dotBtn[0].style.background = '#fff';


  prev.addEventListener('click', () => {
    if (count < mainSlides.length && count > 0) {
      count--;
      mainSlides[count + 1].style.opacity = '0';
      mainSlides[count].style.opacity = '1';
      dotBtn[count + 1].style.background = 'none'
      dotBtn[count].style.background = '#fff'
    } else if (count === 0) {
      mainSlides[count].style.opacity = '0';
      mainSlides[mainSlides.length - 1].style.opacity = '1';
      count = mainSlides.length;
      console.log(mainSlides);
      count--;
      dotBtn[count - 2].style.background = 'none'
      dotBtn[mainSlides.length - 1].style.background = '#fff'
    }
  })

  next.addEventListener('click', () => {
    if (count < mainSlides.length - 1) {

      count++;
      mainSlides[count - 1].style.opacity = '0';
      mainSlides[count].style.opacity = '1';
      dotBtn[count - 1].style.background = '0';
      dotBtn[count].style.background = '#fff';

    } else if (count >= mainSlides.length - 1) {
      count = 0;
      mainSlides[count + 2].style.opacity = '0';
      mainSlides[count].style.opacity = '1';
      dotBtn[count + 2].style.background = '0';
      dotBtn[count].style.background = '#fff';

    }
  })
}