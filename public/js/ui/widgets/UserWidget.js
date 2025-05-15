class UserWidget {
  /**
   * Create UserWidget
   * @param {HTMLElement} element
   */
  constructor(element) {
      if (!element) {
          throw new Error('Element is not provided');
      }
      this.element = element;
  }

  /**
  update
   */
  update() {
      const currentUser = User.current();
      const userNameElement = this.element.querySelector('.user-name');
      
      if (currentUser) {
          if (userNameElement) {
              userNameElement.textContent = currentUser.name;
          }
          this.element.classList.remove('hide');
      } else {
          if (userNameElement) {
              userNameElement.textContent = '';
          }
          this.element.classList.add('hide');
      }
  }
}

// Creation usage
const userWidgetElement = document.querySelector('.user-widget');
const userWidget = new UserWidget(userWidgetElement);

userWidget.update();
