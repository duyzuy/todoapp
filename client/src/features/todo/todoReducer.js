import { createStore, combineReducers } from "redux";
import todoSlice from './todoSlice'
import filterSlice from './filterSlice'


const todoReducer =  combineReducers({
    todoSlice: todoSlice,
    filterSlice: filterSlice
})

export const todoStore = createStore(todoReducer)

export default todoReducer




