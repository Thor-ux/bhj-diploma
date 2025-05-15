class Entity {
  /**
    URL for the entity's API
   * @type {string}
   */
  static url = 'http://localhost:8000/';

  /**
   * List of entities
   * @param {Object} [data={}]
   * @param {Function} callback
   */
  static list(data = {}, callback) {
      createRequest({
          url: this.url,
          method: 'GET',
          data: data,
          callback: (err, response) => {
              if (err) {
                  callback(err, null);
              } else {
                  callback(null, response);
              }
          }
      });
  }

  /**
   * Removes an entity
   * @param {string|number} id
   * @param {Function} callback 
   **/
  static remove(id, callback) {
      createRequest({
          url: `${this.url}/${id}`,
          method: 'DELETE',
          callback: (err, response) => {
              if (err) {
                  callback(err, null);
              } else {
                  callback(null, response);
              }
          }
      });
  }

  /**
   * New entity on the server
   * @param {Object} data
   * @param {Function} callback
   */
  static create(data, callback) {
      createRequest({
          url: this.url,
          method: 'POST',
          data: data,
          callback: (err, response) => {
              if (err) {
                  callback(err, null);
              } else {
                  callback(null, response);
              }
          }
      });
  }
}