class LoginForm extends AsyncForm {
  constructor(element) {
      super(element);
  }

  /**
   * 
   * @param {Object} data
   */
  onSubmit(data) {
      User.login(data, (err, response) => {
          if (err) {
              console.error('Ошибка при входе', err);
              return;
          }

          if (response && response.success) {
              // 
              this.element.reset();

              //
              App.setState('user-logged');

              
              const modal = this.element.closest('.modal');
              if (modal) {
                  const modalInstance = App.getModal('login');
                  if (modalInstance) {
                      modalInstance.close();
                  }
              }
          } else {
              console.error('Ошибка при входе', response.error);
          }
      });
  }
}

const loginForm = document.querySelector('#login-form');
if (loginForm) {
    new LoginForm(loginForm);
}