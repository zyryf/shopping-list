class Product {
  constructor(category, name, amount, weight) {
    this.category = category;
    this.name = name;
    this.amount = amount ? parseInt(amount, 10) : null;
    this.weight = weight ? (Math.round(weight * 100) / 100).toFixed(2) : null;
  }
}

export default Product;
