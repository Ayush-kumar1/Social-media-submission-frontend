import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import userReducer from "./reducer/userReducer";


const reducer = combineReducers({
    // this contain all the reducers
    User: userReducer,
})

const initialState = {}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
)

export default store;