import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BoardReducer as Board } from 'src/reducers/board_reducer';

const reducers = {
  Board,
};

export type AnyAction = Parameters<typeof reducers[keyof typeof reducers]>[1];
export type Reducers = { [P in keyof typeof reducers]: Exclude<Parameters<typeof reducers[P]>[0], undefined> };
const rootReducer = combineReducers(reducers);
export const store = createStore(rootReducer, applyMiddleware(thunk));

export function dispatch<T extends AnyAction>(action: T): T;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
export function dispatch<T>(action: (asyncDispatch: typeof dispatch) => T): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dispatch(action: any) {
  return store.dispatch(action);
}
