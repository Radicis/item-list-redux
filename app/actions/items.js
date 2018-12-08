// @flow
import Store from 'electron-store';
import UUID from 'uuid/v1';
import _ from 'lodash';
import type { Dispatch, GetState } from '../reducers/types';

export const SELECT_ITEM = 'SELECT_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';

const ItemStore = new Store();

/**
 * Gets the items from the json store and sets the state
 * @returns {Function}
 */
export function getItemsFromStore (itemId) {
  return (dispatch: Dispatch) =>  {
    const storeItems = ItemStore.get('items') || [];
    dispatch(setItems(storeItems));
    if(itemId) {
      dispatch(selectItem(itemId));
    }
  }
}

/**
 * Delets all items from the store and sets the state
 * @returns {Function}
 */
export function purgeStore () {
  return (dispatch: Dispatch) =>  {
    ItemStore.delete('items');
    dispatch(getItemsFromStore());
  }
}

/**
 * Removes an item from the store and state by id
 * @param itemId - string id
 * @returns {Function}
 */
export function removeItem (itemId) {
  console.log(itemId);
  return (dispatch: Dispatch, getState: GetState) =>  {
    // find the item by id
    const storeItems = ItemStore.get('items') || [];
    const item = _.find(storeItems, (i) => i.id === itemId);
    _.pull(storeItems, item);
    ItemStore.set('items', storeItems);
    // Check if item was selected and deselect if it was
    const selectedItem = getState().items.item;
    if (selectedItem && itemId === selectedItem.id) {
      dispatch(selectItem());
    }
    dispatch(getItemsFromStore());
  }
}

/**
 * Updates an item in the store by ID
 * @param itemId - string
 * @param updatedItem - object
 * @returns {Function}
 */
export function updateItem (itemId, updatedItem) {
  return (dispatch: Dispatch) =>  {
    const storeItems = ItemStore.get('items') || [];

    // Update the item in the store
    _.map(storeItems, (i) => i.id === itemId ? _.assign(i, updatedItem) : i);

    // Update the store with the new array
    ItemStore.set('items', storeItems);

    // Update the item in the state
    dispatch(updateStateItem(itemId, updatedItem));
  }
}

/**
 * Updates an item in the state
 * @param itemId
 * @param item
 * @returns {{type: string, itemId: *, item: *}}
 */
export function updateStateItem (itemId, item) {
  return {
    type: UPDATE_ITEM,
    itemId,
    item
  }
}

/**
 * Sets the state items []
 * @param items
 * @returns {{type: string, items: *}}
 */
export function setItems (items) {
  return {
    type: SET_ITEMS,
    items
  };
}

/**
 * Sets the selected item in the state or deselected will null
 * @param item
 * @returns {{type: string, item: (*|null)}}
 */
export function selectItem (item) {
  return {
    type: SELECT_ITEM,
    item: item || null // to deselect
  };
}

/**
 * Creates a new item in the store
 * @param itemName
 * @returns {Function}
 */
export function createNewItem (itemName) {
  return (dispatch: Dispatch) =>  {
    const newItem = Object.assign({}, {title: itemName});
    newItem.id = UUID();
    newItem.content = 'Here be things';
    const storeItems = ItemStore.get('items') || [];
    storeItems.push(newItem);
    ItemStore.set('items', storeItems);
    dispatch(getItemsFromStore());
  }
}
