// import _ from 'lodash';

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

  static removeProduct(elementToRemove) {
    const products = this.getProducts();
    console.log(elementToRemove);
    // products.forEach((product, index) => {
    //   if (_.isEqual(productToRemove, product)) {
    //     products.splice(index, 1);
    //   }
    // });
    localStorage.setItem('products', JSON.stringify(products));
  }
}

export default Storage;
