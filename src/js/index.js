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
  sendAjaxData();
  excuteModule.controlCategories();
}


const getCategoriesLists = (data) => {
  const [filters, filterLists] = [$qs('.left-nav__categories-list__filter'), $qs('.left-nav__categories-list__filtered-list')];
  return renderTemplate(filters, data, 'left-nav__categories-list__template') && renderTemplate(filterLists, data[0].detail, 'left-nav__categories-list__filter-list__template');
}


const switchCategoriesLists = (data) => {
  const filterButtons = $qs('.left-nav__categories-list__filter');
  filterButtons.addEventListener('click', event => {
    const filterLists = $qs('.left-nav__categories-list__filtered-list');
    filterLists.innerHTML =
      `
    <template id="left-nav__categories-list__filter-list__template">
      <li class="left-nav__categories-list__filtered__item">
        <a class="filtered__item__link" href="#">{{name}}</a>
      </li>
    </template>
    `

    const filterByCategories = (object) => {
      return event.target.innerText === object.key && object.key
    }

    data.filter(filterByCategories).forEach(element => {
      return renderTemplate(filterLists, element.detail, 'left-nav__categories-list__filter-list__template');
    })
  })
}


const excuteModule = (() => {
  return {
    controlCategories() {
      const [categoriesNavigation, categoriesLink, categoriesBox] = [$qs('.left-nav__categories'), $qs('.left-nav__categories-link'), $qs('.left-nav__categories-list')];
      let expand = _expandCategories(categoriesNavigation, categoriesLink, categoriesBox);
      let collapse = _collapseCategories(categoriesNavigation, categoriesBox);
      return expand && collapse;
    }
  }
})();


const _expandCategories = (navigation, link, box) => {
  return $on(navigation, 'mouseover', event => { event.target === link && box.classList.add('active'); })
}


const _collapseCategories = (navigation, box) => {
  return $on(navigation, 'mouseleave', event => { if (event.target === box || navigation) box.classList.remove('active'); })
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


const getCategoriesData = (data) => {
  getCategoriesLists(data.categories);
  switchCategoriesLists(data.categories);
}


const getMovieData = (data) => {
  const [movieList, movieSlideList] = [data.results, data.results.slice().sort(() => Math.random() - 0.5).slice(0, 3)];

  let ids = movieSlideList.map(el => {
    return 'https://api.themoviedb.org/3/movie/' + el.id + '/videos?api_key=64391ca210dbae0d44b0a622177ef8d3'
  })


  ids.forEach(el => {
    loadData(el, getVideos);
  })





  renderDataTemplate(movieList);
  renderSlideTemplate(movieSlideList)
  setSlide();
};
let keys = [];


const getVideos = (data) => {
  let cont = $qsa('.content__play__container');
  keys.push(data.results[0].key);
  let output = '';

  if (keys.length === 3) {
    for (var i = 0; i < keys.length; i++) {
      output =`
      <a href="https://www.youtube.com/watch?v=${keys[i]}" class="content__play">
        <i class="content__play__icon material-icons">play_circle_outline</i>
      </a>
      `
      cont[i].innerHTML = output;
    }
  }
}




const sendAjaxData = () => {
  const API = {
    state: 'https://api.themoviedb.org/3/discover/movie',
    api: '?api_key=64391ca210dbae0d44b0a622177ef8d3',
    korean: '&language=ko'
  }

  const { state, api, korean } = API;
  const movieDB = state + api + korean;

  loadData('src/js/data.json', getCategoriesData);
  loadData(movieDB, getMovieData);
}



const renderSlideTemplate = (data) => {
  const sliderContent = $qs('.main__slider__content');
  renderTemplate(sliderContent, data, 'content__template');
}

const renderDataTemplate = (data) => {
  const movieContents = $qs('.main__cinemas__list__body__slider__contents');
  renderTemplate(movieContents, data, 'main__cinemas__list__body__slider__contents__template');
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
  let currentIdx = 0;

  slides[0].style.opacity = 1;
  dots[0].style.backgroundColor = '#FFF';


  const resetSlide = () => {
    slides.forEach(elem => elem.style.opacity = 0);
  }


  const handleOpacity = (showIdx) => {
    resetSlide();
    slides[showIdx].style.opacity = 1;
  }


  const resetNavigationDots = () => {
    dots.forEach(elem => elem.style.backgroundColor = '');
  }


  const indicateNavigationDot = (showIdx) => {
    resetNavigationDots();
    dots[showIdx].style.backgroundColor = '#FFF';
  }


  const handleSlide = (crr) => {
    crr = crr % totalIdx;
    handleOpacity(crr);
    indicateNavigationDot(crr);
  }


  const handlePrevButton = () => {
    currentIdx--;
    if (currentIdx < 0) currentIdx = totalIdx - 1;
    handleSlide(currentIdx);
  }


  const handleNextButton = () => {
    currentIdx++;
    handleSlide(currentIdx);
  }


  const handleDots = (() => {
    dots.forEach((el, i) => {
      el.addEventListener('click', () => {
        currentIdx = i;
        resetSlide();
        handleSlide(currentIdx);
      })
    });
  })();


  $on(prev, 'click', handlePrevButton);
  $on(next, 'click', handleNextButton);
}