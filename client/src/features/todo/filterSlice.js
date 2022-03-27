import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {authHeader} from '../../hooks/RequireAuth'
import {fetchApi} from '../../api/fetchApi'

const initialState = {
    filter:{
        status: 'all',
        priority: ['important', 'medium', 'low']
    },
}

export const filterTodos = createAsyncThunk(
    'todoFilter/filterTodos', 
    async ({limit = 10, page = 1, status = 'all', priority = ''}) => {
       
        try {
            const response = await fetchApi.get(
                `http://localhost:8000/api/todo/todoList?limit=${limit}&page=${page}&status=${status}&priority=${priority}`,
                {
                    headers: authHeader()
                }
            )
            .then(rp => rp.data)
            .then(data => {
                return {
                    todos: data,
                    filter: {
                        status: status,
                        priority: priority
                    }
                }
            })
                
            return response
           
        }catch(error){
            return Promise.reject(error)
        }
    }
)

const filterSlice = createSlice({
    name: 'todoFilter',
    initialState,
    reducers: {

    },
    extraReducers: {
        [filterTodos.fulfilled]: (state, action) => {

            return {
                ...state, 
                filter: action.payload.filter,
            }
        }
    }
})

export const getFilter = state => {
   
    return state.todos.filterSlice.filter
}
export default filterSlice.reducer