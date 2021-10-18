export default class TaskManager {
  constructor(el) {
    this.el = el;
    this.nameInput = el.querySelector('.imagename');
    this.urlInput = el.querySelector('.imagelink');
    this.button = el.querySelector('.imagebutton');
    this.gallery = el.querySelector('.gallery');
    this.warning = el.querySelector('.warning');
  }

  addEvents() {
    this.button.addEventListener('click', this.onButtonPress.bind(this));
  }

  onButtonPress() {
    const name = this.nameInput.value;
    const url = this.urlInput.value;
    const newImage = document.createElement('img');
    newImage.alt = name;
    newImage.src = url;
    newImage.classList.add('image');
    const newCross = document.createElement('div');
    newCross.textContent = 'X';
    newCross.classList.add('cross');
    newImage.onerror = () => {
      this.warning.classList.remove('hide');
      this.nameInput.value = '';
      this.urlInput.value = '';
    };
    newImage.onload = () => {
      this.warning.classList.add('hide');
      newCross.addEventListener('click', this.onDelete.bind(this));
      this.gallery.append(newImage);
      this.gallery.append(newCross);
      this.nameInput.value = '';
      this.urlInput.value = '';
    };
  }

  onDelete(evt) {
    if (evt.target.textContent === 'X') {
      this.gallery.removeChild(evt.target.previousElementSibling);
      this.gallery.removeChild(evt.target);
    }
  }
}
