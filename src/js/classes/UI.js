import { Modal } from 'mdb-ui-kit';
import Storage from './Storage';

class UI {
  static addProduct(product, formType) {
    const list = document.getElementById(`${product.category}`);
    const li = document.createElement('li');

    li.className = `list-group-item d-flex  justify-content-between ${product.category}-element`;

    const type = product.amount === null ? 'weight' : 'amount';
    const typeValue = product.weight || product.amount;

    li.innerHTML = `
    <p class="name mb-0">${product.name} </p>
    <div class="action-wrapper d-flex align-items-center">
      <p class="${type} mx-3 mb-0"><strong>${typeValue}</strong></p>
      <button type="button" class="btn btn-floating btn-sm mx-1">
        <i class="fas fa-pen"></i>
      </button>
      <button type="button" class="btn btn-danger btn-floating btn-sm mx-1" >
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    `;
    list.appendChild(li);
    if (formType !== null) Storage.addProduct(product);
    this.toggleList(product.category);

    if (formType === 'main') {
      this.hideAlert('.invalid-form');
    } else if (formType === 'edit') {
      this.hideAlert('.invalid-modal-form');
    }
    if (formType !== null) this.clearForm();
    this.setTotalNumberOfItems();
    this.setTotalAmount();
    this.setTotalWeight();
    this.toggleExportButton();
  }

  static setTotalNumberOfItems() {
    const products = document.querySelectorAll('.list-group-item');
    const info = document.querySelector('.info-total');

    if (products.length !== 0) {
      const badge = document.querySelector('.badge-total');
      info.style = 'display:flex';
      badge.innerHTML = `${products.length}`;
    } else info.style = 'display:none';
  }

  static setTotalAmount() {
    const products = document.querySelectorAll('.amount');
    const amountInfo = document.querySelector('.info-total-amount');
    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += parseInt(product.innerText, 10);
    });
    if (totalAmount !== 0) {
      const badge = document.querySelector('.badge-total-amount');
      amountInfo.style = 'display:flex';
      badge.innerHTML = totalAmount;
    } else amountInfo.style = 'display:none';
  }

  static setTotalWeight() {
    const products = document.querySelectorAll('.weight');
    const weightInfo = document.querySelector('.info-total-weight');
    let totalWeight = 0;
    products.forEach((product) => {
      totalWeight += parseFloat(product.innerText);
    });
    if (totalWeight !== 0) {
      const badge = document.querySelector('.badge-total-weight');
      weightInfo.style = 'display:flex';
      badge.innerHTML = totalWeight;
    } else weightInfo.style = 'display:none';
  }

  static clearForm() {
    document.getElementById('input-name').value = '';
    document.getElementById('number').value = '';
  }

  static deleteProduct(el, list) {
    if (el.target.classList.contains('fa-trash-alt')) {
      const elementToRemove = el.target.parentElement.parentElement.parentElement;

      Storage.removeProduct(elementToRemove);
      elementToRemove.remove();

      this.toggleList(list.id);
      this.toggleExportButton();
      this.setTotalNumberOfItems();
      this.setTotalAmount();
      this.setTotalWeight();
    }
  }

  static showEditModal(el) {
    if (el.target.classList.contains('fa-pen')) {
      const elementToEdit = el.target.parentElement.parentElement.parentElement;
      this.elementToEdit = elementToEdit;
      const editModal = new Modal(document.getElementById('edit-product-modal'));
      this.editModal = editModal;
      this.initializeModalInputs();
      editModal.show();
    }
  }

  static initializeModalInputs() {
    const currentName = this.elementToEdit.childNodes[1].innerText;
    const currentNumber = this.elementToEdit.childNodes[3].innerText;
    const category = this.elementToEdit.parentElement.id;
    const type = currentNumber.includes('.') ? 'weight' : 'amount';

    if (type === 'weight') {
      document.getElementById('new-radio-weight').checked = true;
    } else if (type === 'amount') {
      document.getElementById('new-radio-amount').checked = true;
    }
    document.getElementById('new-input-name').value = currentName;
    document.getElementById('new-number').value = currentNumber;
    document.getElementById('new-category').options.forEach((option) => {
      if (option.value === category) option.selected = true;
    });
  }

  static editProduct(newProduct) {
    // delete old element
    const category = this.elementToEdit.parentElement.id;
    Storage.removeProduct(this.elementToEdit);
    this.elementToEdit.remove();
    // Storage.removeProduct(this.elementToEdit);
    this.toggleList(category);
    this.toggleExportButton();

    // add new element
    this.addProduct(newProduct, 'edit');
    this.setTotalAmount();
    this.setTotalWeight();

    this.editModal.hide();
  }

  static toggleList(category) {
    const list = document.querySelector(`.${category}`);
    const li = document.querySelector(`.${category}-element`);
    list.style = li ? 'display:block' : 'display:none';
  }

  static isFormValid(name, number, formType) {
    if (name === '' || number === '' || number <= 0) {
      if (formType === 'main') this.displayAlert('.invalid-form');
      else this.displayAlert('.invalid-modal-form');
      return false;
    }
    return true;
  }

  static toggleExportButton() {
    const products = Storage.getProducts();
    const exportElement = document.getElementById('export-list');
    if (products.length !== 0) {
      exportElement.style = 'display:block';
    } else exportElement.style = 'display:none';
  }

  static displayAlert(selector) {
    const alert = document.querySelector(`${selector}`);
    alert.style = 'display:block';
  }

  static hideAlert(selector) {
    const alert = document.querySelector(`${selector}`);
    alert.style = 'display:none';
  }

  static elementToEdit = null;

  static editModal = null;
}

export default UI;
