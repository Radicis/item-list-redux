import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type itemsStateType = {
  +items: array,
  +item: object
};

export type Action = {
  +type: string
};

export type GetState = () => itemsStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
