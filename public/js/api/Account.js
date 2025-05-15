class Account extends Entity {
  static url = 'http://localhost:8000/account'
  static get(id = 'account', callback){
    Account.list({}, (err, account) => {
      if (err) {
          console.error('Error fetching accounts:', err);
      } else {
          console.log('Accounts:', account);
      }
  });

  }
}