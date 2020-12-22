import Storage from '../classes/Storage';
import UI from '../classes/UI';

const initialLoad = document.addEventListener('DOMContentLoaded', () => {
  const products = Storage.getProducts();

  products.forEach((product) => {
    UI.addProduct(product, null);
  });
});

export default initialLoad;
