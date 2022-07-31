import {
  createStore,
  combineReducers,
  Action,
  applyMiddleware,
  Store,
} from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';

// redux
import commonReducer from 'redux/common/common.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration // need to investigate this
    };
    if (state.user.token) nextState.user = state.user; // temporary fix for user state

    return nextState;
  }

  return rootReducer(state, action);
};

const makeStore = () => {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
};

export const wrapper = createWrapper<Store<AppState>>(makeStore, {
  debug: false,
});

export type AsyncAction<T = void> = ThunkAction<
  T,
  AppState,
  null,
  Action<string>
>;

export type DispatchAction = <T, S = T>(action: T) => S;
