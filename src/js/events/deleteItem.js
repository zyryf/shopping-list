import UI from '../classes/UI';

const lists = document.querySelectorAll('.list-group');

lists.forEach((list) => {
  list.addEventListener('click', (element) => {
    UI.deleteProduct(element, list);
    UI.showEditModal(element);
  });
});
export default lists;
