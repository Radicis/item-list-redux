// @flow
import { SET_OPTIONS } from '../actions/options';
import type { Action } from './types';

const initialState = {
  lightTheme: false
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        lightTheme: action.lightTheme
      };
    default:
      return state;
  }
}
