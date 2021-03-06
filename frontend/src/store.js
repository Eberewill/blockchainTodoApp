import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { blockChaiReducer } from "./redux/reducer";

const reducer = combineReducers({
  loadBlockchian: blockChaiReducer,
});

const initialState = [];

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
