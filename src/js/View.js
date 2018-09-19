export default class {
  constructor(el) {
    if (!el) throw el;
    this.name = el.slice(1);
    this.el = document.querySelector(el);
  }


  qs(selector) {
    return this.el.querySelector(selector);
  }


  qsa(selector) {
    return this.el.querySelectorAll(selector);
  }


  on(type, handler) {
    this.el.addEventListener(type, handler);
    return this;
  }

  
  delegate(selector, type, handler) {
    const dispatchEvent = e => {
      const potentialEl = this.qsa(selector);
      let len = potentialEl.length;

      while (len--) {
        if (potentialEl[len] === e.target) {
          handler();
          break;
        };
      }
    }
    this.on(type, dispatchEvent);
  }


  hide() {
    this.el.style.display = 'none';
    return this;
  }


  show() {
    this.el.style.display = 'block';
    return this;
  }

  empty(target) {
    let subEl = this.el.querySelector(target);
    while (subEl.hasChildNodes()) {
      subEl.removeChild(subEl.firstChild);
    };
  }

}