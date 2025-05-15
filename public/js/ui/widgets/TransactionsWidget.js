class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error("Element parameter is required");
    }
    this.element = element;
    this.registerEvents();
  }
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.create-income-button')) {
        App.getModal('newIncome').open();
      } else if (e.target.closest('.create-expense-button')) {
        App.getModal('newExpense').open();
      }
    });
  }
}