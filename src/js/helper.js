export const $on = (target, type, callback) => {
  target.addEventListener(type, callback)
}

export function $qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $qsa(selector, scope = document) {
  return scope.querySelectorAll(selector);
}


export function $empty(domTarget) {
  while (domTarget.hasChildNodes()) {
    domTarget.removeChild(domTarget.firstChild)
  };
}