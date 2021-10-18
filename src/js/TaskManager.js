export default class TaskManager {
  constructor(el) {
    this.el = el;
    this.input = el.querySelector('input');
    this.pinned = el.querySelector('.pinnedblock');
    this.all = el.querySelector('.tasksblock');
    this.tasks = [];
  }

  addEvents() {
    this.input.addEventListener('keyup', this.onEnter.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));
  }

  onInput() {
    const allCardsArr = Array.from(this.all.querySelectorAll('.card'));
    for (const item of allCardsArr) {
      const search = this.input.value.toLowerCase();
      const taskName = item.querySelector('p').textContent.toLowerCase();
      if (taskName.startsWith(search)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    }
  }

  onEnter(evt) {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      if (this.tasks.find((item) => item === this.input.value)) {
        const original = this.input.value;
        this.input.value = 'That task exist!';
        this.input.disabled = true;
        setTimeout((() => {
          this.input.value = original;
          this.input.disabled = false;
        }), 3000);
      } else {
        this.tasks.push(this.input.value);
        const newTask = document.createElement('div');
        newTask.className = 'card';
        const newTaskText = document.createElement('p');
        newTaskText.className = 'text';
        newTaskText.textContent = this.input.value;
        const newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.className = 'checkbox';
        this.all.appendChild(newTask);
        newTask.appendChild(newTaskText);
        newTask.appendChild(newCheckbox);
        newCheckbox.addEventListener('change', this.onCheck.bind(this));
        this.input.value = '';
        this.onInput();
      }
    }
  }

  onCheck(evt) {
    this.pinned.querySelector('.warning').parentElement.classList.add('hide');
    if (evt.target.checked) {
      const evtCard = evt.target.parentElement.cloneNode(true);
      evtCard.removeChild(evtCard.querySelector('.checkbox'));
      this.pinned.appendChild(evtCard);
    } else {
      const removeLabel = evt.target.parentElement.querySelector('p').textContent;
      const pinnedTasksLabels = this.pinned.querySelectorAll('p');
      for (const item of pinnedTasksLabels) {
        if (item.textContent === removeLabel) {
          this.pinned.removeChild(item.parentElement);
        }
      }
      if (this.pinned.querySelectorAll('p').length === 2) {
        this.pinned.querySelector('.warning').parentElement.classList.remove('hide');
      }
    }
  }
}
