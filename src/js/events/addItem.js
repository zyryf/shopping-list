import UI from '../classes/UI';
import Product from '../classes/Product';

const addItem = document.getElementById('add-item');

addItem.addEventListener('click', (evt) => {
  evt.preventDefault();

  // get product info from form
  const category = document.getElementById('category').value;
  const name = document.getElementById('input-name').value;
  const isAmount = document.getElementById('radio-amount').checked;

  // number holding a amount/weight
  const number = document.getElementById('number').value;

  // check if amount or weight
  const product = isAmount
    ? new Product(category, name, number, null)
    : new Product(category, name, null, number);

  if (UI.isFormValid(name, number, 'main')) {
    UI.addProduct(product, 'main');
  }
});

export default addItem;
