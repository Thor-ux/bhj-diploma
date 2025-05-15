class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }
  
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    if (!select) {
      console.error('Could not find accounts select element');
      return;
    }

    Account.list(User.current()).then(accounts => {
      select.innerHTML = '';
      accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        select.appendChild(option);
      });
    }).catch(error => {
      console.error('Failed to fetch accounts:', error);
    });
  }

  onSubmit(data) {
    Transaction.create(data).then(response => {
      if (response.success) {
        this.element.reset();
        App.getModal(this.element.getAttribute('id')).close();
        App.update();
      } else {
        console.error('Transaction creation failed:', response.error);
      }
    }).catch(error => {
      console.error('Error creating transaction:', error);
    });
  }
}