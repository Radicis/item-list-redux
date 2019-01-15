// @flow
import { SET_OPTIONS, TOGGLE_MENU, TOGGLE_CONTENT } from '../actions/options';
import type { Action } from './types';

const initialState = {
  lightTheme: false,
  menuCollapsed: false,
  contentCollapsed: true
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
      };
    }
    case TOGGLE_CONTENT: {
      return {
        ...state,
        contentCollapsed: !state.contentCollapsed
      };
    }
    default:
      return state;
  }
}
