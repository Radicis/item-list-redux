// @flow
import _ from 'lodash';
import { SELECT_ITEM, SET_ITEMS, UPDATE_ITEM } from '../actions/items';
import type { Action } from './types';

const initialState = {
  items: [],
  item: null
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
    case UPDATE_ITEM:
      return {
        ...state,
        items: _.map(state.items, (i) => i.id === action.itemId ? _.assign(i, action.item) : i)
      };
    default:
      return state;
  }
}
