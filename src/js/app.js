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


const initDataLoading = () => {
  sendData();
  catModule.controlCat();
}


const getFilter = (data) => {
  const [filters, filterLists] = [$qs('.left-nav__categories-list__filter'), $qs('.left-nav__categories-list__filtered-list')]; 
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




const catModule = (() => {
  return {
    controlCat() {
      const [catNav, catLink, catBox] = [$qs('.left-nav__categories'), $qs('.left-nav__categories-link'), $qs('.left-nav__categories-list')];
      let expand = _expandCat(catNav, catLink, catBox);
      let collapse = _collapseCat(catNav, catBox);
      return expand && collapse;
    }
  }
})();


const _expandCat = (nav, link, box) => {
  return $on(nav, 'pointerover', e => { e.target === link && box.classList.add('active'); })
}

const _collapseCat = (nav, box) => {
  return $on(nav, 'pointerleave', e => { if (e.target === box || nav) box.classList.remove('active'); })
}






const loadData = (url, handler) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', function() {
    let json = JSON.parse(this.responseText);
    handler(json);
  })
  xhr.send();
}


const getCatData = (data) => {
  getFilter(data.categories);
  switchFilter(data.categories);
}


const getMovieData = (data) => {
  const [movieList, movieSlideList] = [data.results, data.results.slice().sort(() => Math.random() - 0.5).slice(0, 3)];
  renderContents(movieList, movieSlideList);
  setSlide();
};


const API = {
  state: 'https://api.themoviedb.org/3/discover/movie',
  api: '?api_key=64391ca210dbae0d44b0a622177ef8d3',
  korean: '&language=ko'
}

const sendData = () => {
  const { state, api, korean } = API;
  const movieDB = state + api + korean;
  loadData('src/js/data.json', getCatData);
  loadData(movieDB, getMovieData);
}



const renderContents = (movieData, slideData) => {
  const [movieContents, sliderContent] = [$qs('.main__cinemas__list__body__slider__contents'), $qs('.main__slider__content')];
  renderTemplate(movieContents, movieData, 'main__cinemas__list__body__slider__contents__template');
  renderTemplate(sliderContent, slideData, 'content__template');
}



document.addEventListener("DOMContentLoaded", () => {
  initDataLoading();
})



/* ************************************************************************************************************** */
/*                                               아래 코드는 진행중인 영역입니다.                                         */
/* ************************************************************************************************************** */



const setSlide = () => {
  const slides = $qsa(".content__container");
  const dots = $qsa(".nav__dots__item");
  const prev = $qs(".nav__prev__arrow-icon");
  const next = $qs('.nav__next__arrow-icon');
  let totalIdx = slides.length;
  let crrIdx = 0;


  (function initSlide() {
    slides[0].style.opacity = 1;
    dots[0].style.backgroundColor = '#FFF';
  })();


  const clickDot = () => {
    dots.forEach((el, i) => {
      el.addEventListener('click', () => {
        resetSlide();
        crrIdx = i;
        slides[i].style.opacity = 1;
        dots[i].style.backgroundColor = '#FFF';
      })
    })
  }

  clickDot();



  const resetSlide = () => {
    slides.forEach(elem => {
      elem.style.opacity = 0;
    });
    dots.forEach(elem => {
      elem.style.backgroundColor = '';
    });
  }


  const handleOpacity = (showIdx) => {
    resetSlide();
    slides[showIdx].style.opacity = 1;
    dots[showIdx].style.backgroundColor = '#FFF';
  }


  const handleSlide = (crr) => {
    crr = crr % totalIdx;
    handleOpacity(crr);
  }


  const handlePrevBtn = () => {
    crrIdx--;
    if (crrIdx < 0) crrIdx = totalIdx - 1;
    handleSlide(crrIdx);
  }


  const handleNextBtn = () => {
    crrIdx++;
    handleSlide(crrIdx);
  }


  $on(prev, 'click', handlePrevBtn);
  $on(next, 'click', handleNextBtn);
}