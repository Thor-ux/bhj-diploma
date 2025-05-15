class RegisterForm extends AsyncForm {
  onSubmit(data) {
      User.register(data, (err, response) => {
          if (err) {
              console.error('Registration error:', err);
              return;
          }

          if (response && response.success) {
              // 
              this.element.reset();

              //
              App.setState('user-logged');

              // 
              const modal = this.element.closest('.modal');
              if (modal && modal.id === 'modal-register') {
                  const modalInstance = App.getModal('register');
                  if (modalInstance) {
                      modalInstance.close();
                  }
              }
          } else {
              console.error('Registration failed:', response ? response.error : 'Unknown error');
          }
      });
  }
}