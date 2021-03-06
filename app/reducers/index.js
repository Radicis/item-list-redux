// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import itemsReducer from './items';
import optionsReducer from './options';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    items: itemsReducer,
    options: optionsReducer
  });
}
