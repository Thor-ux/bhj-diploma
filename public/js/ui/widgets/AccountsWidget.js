class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Element is not passed to AccountsWidget');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }
  registerEvents() {
    //
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').open();
    });

    this.element.addEventListener('click', (e) => {
      const accountElement = e.target.closest('.account');
      if (accountElement) {
        const accountId = parseInt(accountElement.dataset.id);
        this.onSelectAccount(accountId);
      }
    });
  }
  update() {
    if (!User.current()) {
      return;
    }

    Account.list(User.current(), (err, accounts) => {
      if (err) {
        console.error('Ошибка при получении списка счетов:', err);
        return;
      }
      this.clear();
      accounts.forEach(account => this.renderItem(account));
    });
  }
  clear() {
    const accountElements = this.element.querySelectorAll('.account');
    accountElements.forEach(el => el.remove());
  }

  onSelectAccount(accountId) {
    //
    const previousActive = this.element.querySelector('.account.active');
    if (previousActive) {
      previousActive.classList.remove('active');
    }

    const newActive = this.element.querySelector(`.account[data-id="${accountId}"]`);
    if (newActive) {
      newActive.classList.add('active');
    }
    App.showPage('transactions', { account_id: accountId });
  }

  getAccountHTML(account) {
    return `
      <li class="account" data-id="${account.id}">
        <a href="#">
          <span>${account.name}</span> /
          <span>${account.sum.toFixed(2)} ₽</span>
        </a>
      </li>
    `;
  }

  renderItem(account) {
    const accountHTML = this.getAccountHTML(account);
    this.element.insertAdjacentHTML('beforeend', accountHTML);
  }
}
