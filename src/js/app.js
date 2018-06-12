const $on = (selector, type, callback) => {
  selector.addEventListener(type, callback)
}

const template = (templateid, data) => {
  return document.getElementById(templateid).innerHTML
    .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : '');
}


const showItems = (val, templateId) => {
  return val.reduce((acc, curr) => acc += template(templateId, curr), '');
}


const renderTemplate = (selector, data, template) => {
  return selector.innerHTML += showItems(data, template);
}


const init = () => {
  collapseCategories();
  getMovieData();
}


const categoriesTemplate = (function () {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    let jsonData = JSON.parse(this.responseText);
    getFilter(jsonData.categories);
    switchFilter(jsonData.categories);
  });


  const getFilter = (data) => {
    const filters = document.querySelector('.left-nav__categories-list__filter');
    const filterLists = document.querySelector('.left-nav__categories-list__filtered-list');
    return renderTemplate(filters, data, 'left-nav__categories-list__template') && renderTemplate(filterLists, data[0].detail, 'left-nav__categories-list__filter-list__template');
  }

  const switchFilter = (data) => {
    const categoriesFilterBtns = document.querySelector('.left-nav__categories-list__filter');
    categoriesFilterBtns.addEventListener('click', e => {
      const filterLists = document.querySelector('.left-nav__categories-list__filtered-list');
      filterLists.innerHTML =
        `
        <template id="left-nav__categories-list__filter-list__template">
          <li class="left-nav__categories-list__filtered__item">
            <a class="filtered__item__link" href="#">{{name}}</a>
          </li>
        </template>
        `
      data.forEach((el, i) => {
        if (e.target.innerText === el.key) {
          return renderTemplate(filterLists, data[i].detail, 'left-nav__categories-list__filter-list__template')
        }
      })
    })
  }
  oReq.open("GET", "src/js/data.json")
  oReq.send();
})();



const collapseCategories = () => {
  const categoriesNav = document.querySelector('.left-nav__categories');
  const categoriesLink = document.querySelector('.left-nav__categories-link');
  const categoriesBox = document.querySelector('.left-nav__categories-list');

  $on(categoriesNav, 'pointerover', e => {
    e.target === categoriesLink && categoriesBox.classList.add('active')
  })

  $on(categoriesNav, 'pointerleave', e => {
    e.target === categoriesBox || categoriesNav && categoriesBox.classList.remove('active')
  })
}



const API = {
  state: 'https://api.themoviedb.org/3/discover/movie',
  api: '?api_key=64391ca210dbae0d44b0a622177ef8d3',
  korean: '&language=ko',
}

const getMovieData = () => {
  const { state, api, korean } = API;
  const movieDB = state + api + korean;
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
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
  const movieContents = document.querySelector('.main__cinemas__list__body__slider__contents');
  const sliderContent = document.querySelector('.main__slider__content');
  renderTemplate(movieContents, movieData, 'main__cinemas__list__body__slider__contents__template');
  renderTemplate(sliderContent, slideData, 'content__template');
}



document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");
  init();
})



/* ************************************************************************************************************** */
/*                                               아래 코드는 진행중인 영역입니다.                                         */
/* ************************************************************************************************************** */



const swipeMainContents = () => {
  let count = 0;
  const mainSlides = document.querySelectorAll(".content__container");
  const prev = document.querySelector('.nav__prev__arrow-icon');
  const next = document.querySelector('.nav__next__arrow-icon');
  mainSlides[0].style.opacity = '1';
  const dots = document.querySelector('.nav__dots');
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