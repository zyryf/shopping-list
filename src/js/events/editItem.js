import UI from '../classes/UI';
import Product from '../classes/Product';

const editItem = document.getElementById('edit-item-btn');

editItem.addEventListener('click', () => {
  const newCategory = document.getElementById('new-category').value;
  const newName = document.getElementById('new-input-name').value;
  const isAmount = document.getElementById('new-radio-amount').checked;

  // number holding a amount/weight
  const newNumber = document.getElementById('new-number').value;

  const newProduct = isAmount
    ? new Product(newCategory, newName, newNumber, null)
    : new Product(newCategory, newName, null, newNumber);

  if (UI.isFormValid(newName, newNumber, 'edit')) {
    UI.editProduct(newProduct);
  }
});

export default editItem;
