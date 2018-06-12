const template = (templateid, data) => {
  return document.getElementById(templateid).innerHTML
    .replace(/{{(\w*)}}/g, (match, key) => data.hasOwnProperty(key) ? data[key] : '');
}

const showItems = (val, templateId) => {
  return val.reduce((acc, curr) => acc += template(templateId, curr), '');
}



const categoriesTemplate = (function () {

  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    let jsonData = JSON.parse(this.responseText);
    getFilter(jsonData.main);
    switchFilter(jsonData.main);
  });


  const getFilter = (data) => {
    const filters = document.querySelector('.header__gnb__left-nav__categories-list__filter');
    const filterLists = document.querySelector('.header__gnb__left-nav__categories-list__filtered-list');
    return makeFilter(filters, data, 'header__gnb__left-nav__categories-list__template') && makeFilter(filterLists, data[0].detail, 'header__gnb__left-nav__categories-list__filter-list__template');
  }

  const makeFilter = (selector, data, template) => {
    return selector.innerHTML += showItems(data, template);
  }

  const switchFilter = (data) => {
    const categoriesFilterBtns = document.querySelector('.header__gnb__left-nav__categories-list__filter');
    categoriesFilterBtns.addEventListener('click', e => {
      const filterLists = document.querySelector('.header__gnb__left-nav__categories-list__filtered-list');
      filterLists.innerHTML =
        `
        <template id="header__gnb__left-nav__categories-list__filter-list__template">
          <li class="header__gnb__left-nav__categories-list__filtered__item">
            <a class="filtered__item__link" href="#">{{name}}</a>
          </li>
        </template>
        `

      data.forEach((elem, idx) => {
        if (e.target.innerText === elem.key) {
          return makeFilter(filterLists, data[idx].detail, 'header__gnb__left-nav__categories-list__filter-list__template')
        }
      })
    })
  }
  oReq.open("GET", "src/js/data.json")
  oReq.send();
})();




const categoriesNav = document.querySelector('.header__gnb__left-nav__categories');
const categoriesLink = document.querySelector('.header__gnb__left-nav__categories-link');
const categoriesBox = document.querySelector('.header__gnb__left-nav__categories-list');



categoriesLink.addEventListener('pointerover', e => {
  categoriesBox.classList.add('active')
})


categoriesBox.addEventListener('pointerleave', e => {
  categoriesBox.classList.remove('active')
})


categoriesNav.addEventListener('pointerleave', e => {
  categoriesBox.classList.remove('active')
})










const getMovieData = () => {
  let state = 'https://api.themoviedb.org/3/discover/movie';
  let api = '?api_key=64391ca210dbae0d44b0a622177ef8d3';
  let korean = '&language=ko'
  let movieDB = state + api + korean;
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    let movieSlideList = JSON.parse(this.responseText).results.sort(() => Math.random() - 0.5).slice(0, 3);
    let movieList = JSON.parse(this.responseText).results;

    renderContents(movieList, movieSlideList);
    swipeMainContents();

  });
  oReq.open("GET", movieDB)
  oReq.send();
}


getMovieData();






/* ************************************************************************************************************** */
/*                                               아래 코드는 진행중인 영역입니다.                                         */
/* ************************************************************************************************************** */





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
  if (event.target.className === 'main__slider__nav__dots__item') {
    console.log("Yeah~!");
  }

}


bindSlideBtn(slideBtn.bind(this));