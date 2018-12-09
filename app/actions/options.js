// @flow
import Store from 'electron-store';
import _ from 'lodash';
import type { Dispatch, GetState } from '../reducers/types';

export const SET_OPTIONS = 'SET_OPTIONS';

const OptionsStore = new Store();

/**
 * Gets the items from the json store and sets the state
 * @returns {Function}
 */
export function getOptionsFromStore() {
  return (dispatch: Dispatch) => {
    console.log('Getting options');
    const storeOptions = OptionsStore.get('palette') || {};
    console.log(storeOptions);
    dispatch(setOptions(storeOptions));
  };
}
/**
 * Sets the state options {}
 * @param items
 * @returns {{type: string, items: *}}
 */
export function setOptions(palette) {
  return {
    type: SET_OPTIONS,
    palette
  };
}

export function updateOptions(palette) {
  return (dispatch: Dispatch) => {
    const storeOptions = OptionsStore.get('palette') || {};

    let updatedOptions = _.assign({}, storeOptions, palette);

    // Update the store with the new array
    OptionsStore.set('palette', updatedOptions);

    // Update the item in the state
    dispatch(setOptions(updatedOptions));
  };
}