import UI from '../classes/UI';
import Product from '../classes/Product';

const addItem = document.getElementById('add-item');

addItem.addEventListener('click', (evt) => {
  evt.preventDefault();
  UI.addProduct({ category: 'Fruits', name: 'test', amount: '34' });

  console.log('add item!');
});

export default {
  addItem,
};
