class UI {
  static addProduct(product) {
    let list = null;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex  justify-content-between';

    switch (product.category) {
      case 'Fruits':
        list = document.getElementById('fruits');
        break;
      case 'Vegetables':
        list = document.getElementById('vegetables');
        break;
      case 'Dairy product':
        list = document.getElementById('diary-products');
        break;
      case 'Bread':
        list = document.getElementById('bread');
        break;
      case 'Domestic Article':
        list = document.getElementById('domestic-articles');
        break;
      default:
        alert('Invalid product category');
    }

    li.innerHTML = `
    <p class="name mb-0">${product.name} </p>
    <div class="action-wrapper d-flex align-items-center">
      <p class="amount mx-3 mb-0"><strong>${product.amount}</strong></p>
      <button type="button" class="btn btn-floating btn-sm mx-1">
        <i class="fas fa-pen"></i>
      </button>
      <button type="button" class="btn btn-danger btn-floating btn-sm mx-1">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    `;

    list.appendChild(li);
  }
}

export default UI;
