import { combineReducers } from "redux"
import homeReducer from "./homeReducer"
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
  homeReducer: homeReducer,
  searchReducer: searchReducer
})

export default rootReducer;