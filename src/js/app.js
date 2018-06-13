import { $on, $qs, $qsa } from './helper.js';

const template = (templateid, data) => {
  return document.getElementById(templateid).innerHTML.replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : '');
}

const showItems = (val, templateId) => {
  return val.reduce((acc, curr) => acc += template(templateId, curr), '');
}

const renderTemplate = (selector, data, template) => {
  return selector.innerHTML += showItems(data, template);
}


const init = () => {
  getMovieData();
  catModule.controlCat();
}


const getCategoriesData = (function() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    let jsonData = JSON.parse(this.responseText);
    const { categories } = jsonData;
    getFilter(categories);
    switchFilter(categories);
  });
  oReq.open("GET", "src/js/data.json")
  oReq.send();
})();


const getFilter = (data) => {
  const filters = $qs('.left-nav__categories-list__filter');
  const filterLists = $qs('.left-nav__categories-list__filtered-list');
  return renderTemplate(filters, data, 'left-nav__categories-list__template') && renderTemplate(filterLists, data[0].detail, 'left-nav__categories-list__filter-list__template');
}

const switchFilter = (data) => {
  const filterBtns = $qs('.left-nav__categories-list__filter');

  filterBtns.addEventListener('click', e => {
    const filterLists = $qs('.left-nav__categories-list__filtered-list');
    filterLists.innerHTML =
      `
    <template id="left-nav__categories-list__filter-list__template">
      <li class="left-nav__categories-list__filtered__item">
        <a class="filtered__item__link" href="#">{{name}}</a>
      </li>
    </template>
    `

    const filterByCategories = (obj) => {
      return e.target.innerText === obj.key && obj.key
    }

    data.filter(filterByCategories).forEach(el => {
      return renderTemplate(filterLists, el.detail, 'left-nav__categories-list__filter-list__template');
    })
  })
}



let catModule = (function() {
  const _expandCat = function() {
    const [catNav, catLink, catBox] = [$qs('.left-nav__categories'), $qs('.left-nav__categories-link'), $qs('.left-nav__categories-list')];
    return $on(catNav, 'pointerover', e => { e.target === catLink && catBox.classList.add('active'); })
  }

  const _collapseCat = function() {
    const [catNav, catBox] = [$qs('.left-nav__categories'), $qs('.left-nav__categories-list')];
    return $on(catNav, 'pointerleave', e => { if (e.target === catBox || catNav) catBox.classList.remove('active'); })
  }

  return {
    controlCat: function() {
      let expand = _expandCat();
      let collapse = _collapseCat();
      return expand && collapse;
    }
  }
})();






const API = {
  state: 'https://api.themoviedb.org/3/discover/movie',
  api: '?api_key=64391ca210dbae0d44b0a622177ef8d3',
  korean: '&language=ko'
}



const getMovieData = () => {
  const { state, api, korean } = API;
  const movieDB = state + api + korean;
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    let JSONmovieData = JSON.parse(this.responseText).results;
    let movieList = JSONmovieData;
    let movieSlideList = JSONmovieData.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    renderContents(movieList, movieSlideList);
    swipeMainContents();
  });
  oReq.open("GET", movieDB)
  oReq.send();
}



const renderContents = (movieData, slideData) => {
  const movieContents = $qs('.main__cinemas__list__body__slider__contents');
  const sliderContent = $qs('.main__slider__content');
  renderTemplate(movieContents, movieData, 'main__cinemas__list__body__slider__contents__template');
  renderTemplate(sliderContent, slideData, 'content__template');
}



document.addEventListener("DOMContentLoaded", () => {
  init();
})



/* ************************************************************************************************************** */
/*                                               아래 코드는 진행중인 영역입니다.                                         */
/* ************************************************************************************************************** */



const swipeMainContents = () => {
  let count = 0;
  const mainSlides = $qsa(".content__container");
  const prev = $qs('.nav__prev__arrow-icon');
  const next = $qs('.nav__next__arrow-icon');
  mainSlides[0].style.opacity = '1';
  const dots = $qs('.nav__dots');
  const dotBtn = dots.querySelectorAll('.nav__dots__item')
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
      mainSlides[count + 2].style.opacity = '1';
      count = mainSlides.length;
      count--;
      dotBtn[count - 2].style.background = 'none';
      dotBtn[count].style.background = '#fff'
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


const bindSlideBtn = (handler) => {
  return document.addEventListener('click', handler);
}


const slideBtn = (event) => {
  if (event.target.className === 'nav__dots__item') {
    console.log("Yeah~!");
  }
}


bindSlideBtn(slideBtn.bind(this));