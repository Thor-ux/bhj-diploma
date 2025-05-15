class AsyncForm {
  /**
   * @param {HTMLFormElement} element
   */
  constructor(element) {
      if (!element || !(element instanceof HTMLFormElement)) {
          throw new Error('Invalid form element provided');
      }
      this.element = element;
      this.registerEvents();
  }

  /**
   * Registers the form
   */
  registerEvents() {
      this.element.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submit();
      });
  }

  /**
   *
   * @returns {Object} 
   */
  getData() {
      const formData = new FormData(this.element);
      const id = {};
      for (let [key, value] of formData.entries()) {
          data[key] = value;
      }
      return data;
  }

  /**
   * 
   * @param {Object} data 
   */
  onSubmit(data) {
      
  }

  /**
   * Submit
   */
  submit() {
      const id = this.getData();
      this.onSubmit(id);
  }
}