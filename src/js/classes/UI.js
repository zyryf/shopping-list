class UI {
  static addProduct(product) {
    const list = document.getElementById(`${product.category}`);
    const li = document.createElement('li');

    li.className = `list-group-item d-flex  justify-content-between ${product.category}-element`;

    const type = product.amount ? 'amount' : 'weight';
    const typeValue = product.amount || product.weight;

    li.innerHTML = `
    <p class="name mb-0">${product.name} </p>
    <div class="action-wrapper d-flex align-items-center">
      <p class="${type} mx-3 mb-0"><strong>${typeValue}</strong></p>
      <button type="button" class="btn btn-floating btn-sm mx-1">
        <i class="fas fa-pen"></i>
      </button>
      <button type="button" class="btn btn-danger btn-floating btn-sm mx-1">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    `;
    list.appendChild(li);
    this.showOrHideList(product.category);
    this.clearForm();
    this.setTotalNumberOfItems();
    this.hideAlert();
  }

  static setTotalNumberOfItems() {
    const products = document.querySelectorAll('.list-group-item');
    const info = document.querySelector('.info');

    if (products.length !== 0) {
      const badge = document.querySelector('.badge');
      info.style = 'display:block';
      badge.innerHTML = `${products.length}`;
    } else info.style = 'display:none';
  }

  static clearForm() {
    document.getElementById('input-name').value = '';
    document.getElementById('number').value = '';
  }

  static deleteProduct(el, list) {
    if (el.target.classList.contains('fa-trash-alt')) {
      el.target.parentElement.parentElement.parentElement.remove();

      this.showOrHideList(list.id);
      this.setTotalNumberOfItems();
    }
  }

  static showOrHideList(category) {
    const list = document.querySelector(`.${category}`);
    const li = document.querySelector(`.${category}-element`);

    list.style = li ? 'display:block' : 'display:none';
  }

  static isFormValid(name, number) {
    if (name === '' || number === '') {
      this.displayAlert();
      return false;
    }
    return true;
  }

  static displayAlert() {
    const alert = document.getElementById('invalid-form');
    alert.style = 'display:block';
  }

  static hideAlert() {
    const alert = document.getElementById('invalid-form');
    alert.style = 'display:none';
  }
}

export default UI;
