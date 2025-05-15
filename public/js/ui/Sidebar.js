/**
 * Класс Sidebar отвечает за работу боковой колонки: 
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки: 
   * переключает два класса для body:  sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    const body = document.body;

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        body.classList.toggle('sidebar-open');
        body.classList.toggle('sidebar-collapse');
      });
    }
  }

  /**
   * При нажатии на кнопку входа,  показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item_login');
    const registerButton = document.querySelector('.menu-item_register');
    const logoutButton = document.querySelector('.menu-item_logout');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        const loginModal = App.getModal('login');
        loginModal.open();
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        const registerModal = App.getModal('register');
        registerModal.open();
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          } else {
            console.error('Logout failed', err);
          }
        });
      });
    }
  }
}

class Sidebar {
  static initAuthLinks() {
      const registerBtn = document.querySelector('.menu-item_register');
      const loginBtn = document.querySelector('.menu-item_login');
      const logoutBtn = document.querySelector('.menu-item_logout');

      if (registerBtn) {
          registerBtn.addEventListener('click', () => {
              const registerModal = App.getModal('register');
              registerModal.open();
          });
      }

      if (loginBtn) {
          loginBtn.addEventListener('click', () => {
              const loginModal = App.getModal('login');
              loginModal.open();
          });
      }

      if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
              User.logout((err, response) => {
                  if (response && response.success) {
                      App.setState('init');
                  } else {
                      console.error('Logout failed', err);
                  }
              });
          });
      }
  }

  static initToggleButton() {
      const toggleButton = document.querySelector('.sidebar-toggle');
      const body = document.body;

      if (toggleButton) {
          toggleButton.addEventListener('click', () => {
              body.classList.toggle('sidebar-open');
              body.classList.toggle('sidebar-collapse');
          });
      }
  }
}