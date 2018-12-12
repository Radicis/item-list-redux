// @flow
import { SET_OPTIONS, TOGGLE_MENU } from '../actions/options';
import type { Action } from './types';

const initialState = {
  lightTheme: false,
  menuCollapsed: false
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        lightTheme: action.lightTheme
      };
    case TOGGLE_MENU: {
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed
      }
    }
    default:
      return state;
  }
}
