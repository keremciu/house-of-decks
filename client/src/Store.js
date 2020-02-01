import React from "react";
import { default as GameReducer } from "Game/reducer";

export const StoreContext = React.createContext();

function getInitialState(reducerDict) {
  return Object.keys(reducerDict).reduce((acc, curr) => {
    const slice = reducerDict[curr](undefined, { type: undefined });
    return { ...acc, [curr]: slice };
  }, {});
}

export function combineReducers(reducerDict) {
  const _initialState = getInitialState(reducerDict);
  return function(state = _initialState, action) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...acc, [curr]: slice };
    }, state);
  };
}

const rootReducer = combineReducers({
  game: GameReducer
});

function usePersistedReducer([state, dispatch], key = "app_state") {
  React.useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
    key,
    state
  ]);
  return [state, dispatch];
}

export function StoreProvider(props) {
  const persistedState = localStorage.getItem("app_state");
  const initialState = persistedState
    ? JSON.parse(persistedState)
    : rootReducer(undefined, { type: undefined });
  const [state, dispatch] = usePersistedReducer(
    React.useReducer(rootReducer, initialState)
  );
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
