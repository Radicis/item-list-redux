// @flow
import _ from 'lodash';
import { SET_OPTIONS } from '../actions/options';
import type { Action } from './types';

const initialState = {
  palette: {
    type: 'dark',
    primary: {
      light: '#ffffff',
      main: '#e8eaf6',
      dark: '#b6b8c3',
      contrastText: '#000000'
    }
  }
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        palette: _.assign({}, state.palette, action.palette)
      };
    default:
      return state;
  }
}
