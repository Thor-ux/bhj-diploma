class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error("Element parameter is required");
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }
  
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.remove-account')) {
        this.removeAccount();
      } else if (e.target.closest('.transaction__remove')) {
        const transactionId = e.target.closest('.transaction__remove').dataset.id;
        this.removeTransaction(transactionId);
      }
    });
  }
  removeAccount() {
    if (!this.lastOptions) return;

    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove(this.lastOptions.account_id).then(() => {
        App.updateWidgets();
        App.updateForms();
      });
    }
  }

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id).then(() => {
        this.update();
        App.updateWidgets();
      });
    }
  }

  render(options) {
    if (!options) return;

    this.lastOptions = options;
    
    Account.get(options.account_id).then(account => {
      this.renderTitle(account.name);
      
      Transaction.list(options.account_id).then(transactions => {
        this.renderTransactions(transactions);
      });
    });
  }

  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    if (titleElement) {
      titleElement.textContent = name;
    }
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('ru-RU', options).replace(' г.', 'г. в');
  }

  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type.toLowerCase()} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>
    `;
  }

  renderTransactions(transactions) {
    const contentElement = this.element.querySelector('.content');
    if (contentElement) {
      contentElement.innerHTML = transactions.map(transaction => this.getTransactionHTML(transaction)).join('');
    }
  }
}