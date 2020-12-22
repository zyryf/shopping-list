import * as mdb from 'mdb-ui-kit';

import addItem from './events/addItem';
import lists from './events/deleteItem';
import editItem from './events/editItem';
import initialLoad from './events/initalLoad';

export default {
  initialLoad,
  editItem,
  lists,
  addItem,
  mdb,
};
