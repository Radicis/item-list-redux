// @flow
import Store from 'electron-store';
import type { Dispatch } from '../reducers/types';

import { selectItem } from './items';

export const SET_OPTIONS = 'SET_OPTIONS';
export const TOGGLE_MENU = 'TOGGLE_MENU';

const JSONStore = new Store();

/**
 * Gets the items from the json store and sets the state
 * @returns {Function}
 */
export function getOptionsFromStore() {
  return (dispatch: Dispatch) => {
    const storeOptions = JSONStore.get('lightTheme') || false;
    dispatch(setOptions(storeOptions));
  };
}
/**
 * Sets the state options {}
 * @param lightTheme
 * @returns {{type: boolean, items: *}}
 */
export function setOptions(lightTheme) {
  return {
    type: SET_OPTIONS,
    lightTheme
  };
}

export function updateOptions(lightTheme) {
  return (dispatch: Dispatch) => {
    // Update the store with the new array
    JSONStore.set('lightTheme', lightTheme);

    // Update the item in the state
    dispatch(setOptions(lightTheme));
  };
}

export function showExport() {
  return (dispatch: Dispatch) => {
    const storeItems = JSONStore.get('items');
    dispatch(selectItem({
      title: 'EXPORT',
      content: JSON.stringify(storeItems),
      type: 'json'
    }));
  }
}

export function toggleMenuCollapse() {
  return {
    type: TOGGLE_MENU
  };
}
