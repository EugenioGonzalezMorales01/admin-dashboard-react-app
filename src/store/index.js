import { applyMiddleware, createStore } from "redux";
//Thunk nos permite manejar promesas con redux
import thunk from "redux-thunk";
import rootReducer from "../reducers";
const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
