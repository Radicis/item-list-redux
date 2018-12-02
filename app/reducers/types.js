import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type selectedItemStateType = {
  +item: object
};

export type itemsStateType = {
  +items: array
};

export type Action = {
  +type: string
};

export type GetState = () => selectedItemStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
