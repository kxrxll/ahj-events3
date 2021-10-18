export function randomIndex(index) {
  const randomIndexVal = Math.floor(Math.random() * 16);
  if (randomIndexVal === index) {
    randomIndex(index);
  }
  return randomIndexVal;
}

export function insertImage(importEl, insertEl, index) {
  const cellEls = importEl.querySelectorAll('div');
  for (const item of cellEls) {
    if (parseInt((item.dataset.index), 10) === index) {
      item.appendChild(insertEl);
    }
  }
}
