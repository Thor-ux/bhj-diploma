class Modal {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error ('Передан пустой или недопустимый элемент в конструктор Modal');
    }
    this.element = element;
    this.registerEvents();
  }

  open() {
    this.element.classList.add('in');
    this.element.style.display = 'block';
  }
  close() {
    this.element.classList.remove('in');
    this.element.style.display = 'none';
  }
  onClose() {
    this.close();
  }
  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.onClose());
    });
  }
}