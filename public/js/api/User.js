class User {
  static URL = 'http://localhost:8000/user';

  /**
   *Current user in local storage
   * @param {Object} user
   */
  static setCurrent(user) {
      localStorage.setItem('user',  JSON.stringify(user));
  }

  /**
   * Current user from local storage
   * @returns {Object|undefined}
   */
  static current() {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : undefined;
  }

  /**
   * Removes the current user from local storage
   */
  static unsetCurrent() {
      localStorage.removeItem('user');
  }

  /**
   * Fetches the current user data from the server
   * @param {Function} callback
   */
  static fetch(callback) {
      createRequest({
          url:  this.URL + '/current', 
          method:  'GET', 
          callback:  (err,  response) => {
              if (response && response.success) {
                  this.setCurrent(response.user);
              } else {
                  this.unsetCurrent();
              }
              callback(err,  response);
          }
      });
  }

  /**
   * Register
   * @param {Object} data
   * @param {Function} callback
   */
  static register(data,  callback) {
      createRequest({
          url:  this.URL + '/register', 
          method:  'POST', 
          data:  data, 
          callback:  (err,  response) => {
              if (response && response.success) {
                  this.setCurrent(response.user);
              }
              callback(err,  response);
          }
      });
  }

  /**
   * Logs in a user
   * @param {Object} data
   * @param {Function} callback
   */
  static login(data,  callback) {
      createRequest({
          url:  this.URL + '/login', 
          method:  'POST', 
          data:  data, 
          callback:  (err,  response) => {
              if (response && response.success) {
                  this.setCurrent(response.user);
              }
              callback(err,  response);
          }
      });
  }

  /**
   * Logout the current user
   * @param {Function} callback
   */
  static logout(callback) {
      createRequest({
          url:  this.URL + '/logout', 
          method:  'POST', 
          callback:  (err,  response) => {
              if (response && response.success) {
                  this.unsetCurrent();
              }
              callback(err,  response);
          }
      });
  }
}

// Register a new user
User.register({ name: 'Vlad',  email: 'test@test.ru',  password: 'abracadabra' },  (err,  response) => {
  if (err) {
      console.error('Registration error: Поле E-Mail адрес должно быть действительным электронным адресом.',  err);
      console.error('Registration error: Количество символов в поле Пароль должно быть не менее 3.',  err);
  } else {
      console.log('Registration successful: ',  response);
  }
});

// Login
User.login({ email: 'test@test.ru',  password: 'abracadabra' },  (err,  response) => {
  if (err) {
      console.error('Login error: Пользователь c email ... и паролем ... не найден',  err);
  } else {
      console.log('Login successful: ',  response);
  }
});

// Fetch current user
User.fetch((err,  response) => {
  if (err) {
      console.error('Fetch error: Необходима авторизация',  err);
  } else {
      console.log('Current user: ',  response);
  }
});

// Logout
User.logout((err,  response) => {
  if (err) {
      console.error('Logout error: ',  err);
  } else {
      console.log('Logout successful: ',  response);
  }
});

// Get current user
const currentUser = User.current();
console.log('Current user from local storage: ',  currentUser);