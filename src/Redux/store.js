import rootReducer from "./Reducer/index";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

// export default { store, persistor };
