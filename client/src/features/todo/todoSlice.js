import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {AuthHeader} from '../../hooks/RequireAuth'

const initialState = {
    todos: [],
    todoEdit: '',
    filter:[],
    status: 'idle',
    total: ''
}



//fetchTodo
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos', 
    async ({limit = 10, page = 1}) => {

        try {
            const response = await fetch(
                `http://localhost:8000/api/todo/todoList?limit=${limit}&page=${page}`, 
                {
                    method: 'GET', 
                    mode: 'cors',
                    headers: {
                        'auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
                    }
                }
            )
            return response.json()
        }catch(error){
            console.log(error)
        }
    }
)

//addTodo
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (todo) => {
        try {
            const response = await fetch('http://localhost:8000/api/todo/addTodo',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
                    },
                    body: JSON.stringify(todo)
                }
            )
            return response.json()
        }catch(error){
            console.log(error)
        }
    }
)

//deleteTodo 
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todo) => {
           
            try{
                const response = await fetch('http://localhost:8000/api/todo/deleteTodo',
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
                    },
                    body: JSON.stringify(todo)
                })
                return response.json()

            }catch(error){
                console.log('client:', error)
            }
    }
)
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'pending'           
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload.todos
            state.total = action.payload.total
            state.status = 'successded'
            console.log(action.payload.message) 
            
         
        })
        .addCase(addNewTodo.fulfilled, (state, action) => {
         
            state.todos.unshift(action.payload.todo)
          
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
           
            const indexTodo = state.todos.findIndex(todo => todo.id === action.payload.todo.id)
            state.todos.splice(indexTodo, 1)
            //state.todos.filter(todo => todo.id != action.payload.todo.id )
            
        })
    }

})
export const selectAllTodo = state => state.todos.todos
export const statusRequest = state => state.todos.status
export const selectUserId = state => {return state.auth.user ? state.auth.user.id : ''}
export const getCountTodo = state => state.todos.total
export default todosSlice.reducer