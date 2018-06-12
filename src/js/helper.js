export const $on = (selector, type, callback) => {
  selector.addEventListener(type, callback)
}