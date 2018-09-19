/**
 * @param  {element} target
 */

const empty = (target) => {
  while (target.hasChildNodes()) {
    target.removeChild(target.firstChild);
  };
}


export default empty