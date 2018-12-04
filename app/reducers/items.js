// @flow
import {SELECT_ITEM, SET_ITEMS} from '../actions/items';
import type {Action} from './types';

const initialState = {
  items: [],
  item: {},
  newItem: {
    title: 'New'
  }
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case SELECT_ITEM:
      return {
        ...state,
        item: action.item
      };
    default:
      return state;
  }
}
