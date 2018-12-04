// @flow
import Store from 'electron-store';
import UUID from 'uuid/v1';
import _ from 'lodash';
import type { Dispatch } from '../reducers/types';

export const SELECT_ITEM = 'SELECT_ITEM';
export const SET_ITEMS = 'SET_ITEMS';

const ItemStore = new Store();

export function getItemsFromStore () {
  return (dispatch: Dispatch) =>  {
    const storeItems = ItemStore.get('items') || [];
    dispatch(setItems(storeItems));
  }
}

export function purgeStore () {
  return (dispatch: Dispatch) =>  {
    ItemStore.delete('items');
    dispatch(getItemsFromStore());
  }
}

export function removeItem (itemId) {
  return (dispatch: Dispatch) =>  {
    // find the item by id
    const storeItems = ItemStore.get('items') || [];
    const item = _.find(storeItems, (i) => i.id === itemId);
    _.pull(storeItems, item);
    ItemStore.set('items', storeItems);
    dispatch(getItemsFromStore());
  }
}

export function updateItemContent (itemId, itemContent) {
  return (dispatch: Dispatch) =>  {
    const storeItems = ItemStore.get('items') || [];
    const updateItemIndex = _.findIndex(storeItems, (i) => i.id === itemId);
    const updateItem = _.find(storeItems, (i) => i.id === itemId);
    updateItem.content = itemContent;
    storeItems.splice(updateItemIndex, 1, updateItem);
    ItemStore.set('items', storeItems);
    dispatch(getItemsFromStore());
    dispatch(selectItem(updateItem));
  }
}

export function setItems (items) {
  return {
    type: SET_ITEMS,
    items
  };
}

export function selectItem (item) {
  return {
    type: SELECT_ITEM,
    item
  };
}

export function createNewItem (itemName) {
  return (dispatch: Dispatch) =>  {
    const newItem = Object.assign({}, {title: itemName});
    newItem.id = UUID();
    newItem.content = 'FOR doc in things';
    const storeItems = ItemStore.get('items') || [];
    storeItems.push(newItem);
    ItemStore.set('items', storeItems);
    dispatch(getItemsFromStore());
  }
}
