import _ from 'lodash';
import Product from './Product';

class Storage {
  static getProducts() {
    let products = [];
    if (localStorage.getItem('products') !== null) {
      products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
  }

  static addProduct(product) {
    const products = this.getProducts();

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static removeProduct(element) {
    const products = this.getProducts();

    const name = element.childNodes[1].innerText;
    const category = element.parentElement.id;
    const number = element.childNodes[3].innerText;
    const type = number.includes('.') ? 'weight' : 'amount';

    const productToRemove =
      type === 'amount'
        ? new Product(category, name, number, null)
        : new Product(category, name, null, number);

    products.forEach((product, index) => {
      if (_.isEqual({ ...productToRemove }, product)) {
        products.splice(index, 1);
      }
    });

    localStorage.setItem('products', JSON.stringify(products));
  }
}

export default Storage;
