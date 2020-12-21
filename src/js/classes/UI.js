import { Modal } from 'mdb-ui-kit';

class UI {
  static addProduct(product, formType) {
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
      <button type="button" class="btn btn-danger btn-floating btn-sm mx-1" >
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    `;
    list.appendChild(li);
    this.showOrHideList(product.category);

    if (formType === 'main') {
      this.hideAlert('.invalid-form');
      this.clearForm(formType);
    } else {
      this.hideAlert('.invalid-modal-form');
      this.clearForm(formType);
    }
    this.setTotalNumberOfItems();
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

  static clearForm(formType) {
    if (formType === 'main') {
      document.getElementById('input-name').value = '';
      document.getElementById('number').value = '';
    } else {
      document.getElementById('new-input-name').value = '';
      document.getElementById('new-number').value = '';
    }
  }

  static deleteProduct(el, list) {
    if (el.target.classList.contains('fa-trash-alt')) {
      el.target.parentElement.parentElement.parentElement.remove();

      this.showOrHideList(list.id);
      this.setTotalNumberOfItems();
    }
  }

  static showEditModal(el) {
    if (el.target.classList.contains('fa-pen')) {
      const elementToEdit = el.target.parentElement.parentElement.parentElement;
      this.elementToRemove = elementToEdit;
      const editModal = new Modal(document.getElementById('edit-product-modal'));
      editModal.show();
    }
  }

  static editProduct(newProduct) {
    // delete old element
    this.elementToRemove.remove();
    // add new element
    this.addProduct(newProduct, 'edit');
    const editModal = new Modal(document.getElementById('edit-product-modal'));
    editModal.hide();
  }

  static showOrHideList(category) {
    const list = document.querySelector(`.${category}`);
    const li = document.querySelector(`.${category}-element`);

    list.style = li ? 'display:block' : 'display:none';
  }

  static isFormValid(name, number, formType) {
    if (name === '' || number === '') {
      if (formType === 'main') this.displayAlert('.invalid-form');
      else this.displayAlert('.invalid-modal-form');
      return false;
    }
    return true;
  }

  static displayAlert(selector) {
    const alert = document.querySelector(`${selector}`);
    alert.style = 'display:block';
  }

  static hideAlert(selector) {
    const alert = document.querySelector(`${selector}`);
    alert.style = 'display:none';
  }

  static elementToRemove = null;
}

export default UI;
