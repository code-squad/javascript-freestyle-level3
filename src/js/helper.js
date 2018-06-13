export const $on = (target, type, callback) => {
  target.addEventListener(type, callback)
}

export function $qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function $qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}
