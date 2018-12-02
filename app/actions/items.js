// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SELECT_ITEM = 'SELECT_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM';

let foo = [
  { title: ' I am an item'}
]

export function setItems () {
  return {
    type: SET_ITEMS,
    items: foo
  };
}

export function selectItem (item) {
  return {
    type: SELECT_ITEM,
    item
  };
}

export function createNewItem (item) {
  return (dispatch: Dispatch) =>  {
    // add to db
    // then update items
    foo.push({
      title: 'I am another'
    })
    dispatch(setItems());
  }
}