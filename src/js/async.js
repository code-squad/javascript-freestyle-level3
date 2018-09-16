export const loadData = (url, handler) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', function() {
    let json = JSON.parse(this.responseText);
    handler(json);
  })
  xhr.send();
}