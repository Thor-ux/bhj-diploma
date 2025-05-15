/**
 * @param {Object} options
 * @param {string} options.url
 * @param {Object} [options.data]
 * @param {string} [options.method='GET']
 * @param {Function} options.callback
 */
function createRequest(options) {
  // Options with defaults
  const { url, data, method = 'GET', callback } = options;

  // Create new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Open connection
  xhr.open(method, url, true);

  // Request headers
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Handle the response
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Success
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch (e) {
        // If response is not JSON, return
        response = xhr.responseText;
      }
      callback(null, response);
    } else {
      // Error
      callback(new Error(`Request failed with status ${xhr.status}`), null);
    }
  };

  // Handle
  xhr.onerror = function() {
    callback(new Error('Network error occurred'), null);
  };

  // Send
  if (data && (method === 'POST' || method === 'PUT')) {
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
}

createRequest({
  url: 'http://localhost:8000/',
  data: {
    email: 'ivan@poselok.ru',
    password: 'odinodin'
  },
  method: 'POST',
  callback: (err, response) => {
    if (err) {
      console.error('Ошибка, если есть', err);
    } else {
      console.log('Данные, если нет ошибки', response);
    }
  }
});