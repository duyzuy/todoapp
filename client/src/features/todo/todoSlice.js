import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authHeader} from '../../hooks/RequireAuth'
import {fetchApi} from '../../api/fetchApi'
import {filterTodos} from './filterSlice'
const initialState = {
    todos: [],
    status: 'idle',
    total: ''
}

//fetchTodo
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos', 
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

//addTodo
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (todo) => {
        try {

            const response = await fetchApi.post(
                `http://localhost:8000/api/todo/addTodo`,
                todo,
                {   
                    headers: authHeader(
                        {
                            'Content-Type': 'application/json'
                        }
                    ),
                    
                }
            )
            return response.data
        }catch(error){
            return Promise.reject(error)
        }
    }
)

//deleteTodo 
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todo) => {
           
            try{
                const response = await fetchApi.delete(
                    'http://localhost:8000/api/todo/deleteTodo',
                    todo, 
                    {
                        headers: authHeader()
                    }
                )
                return response.data
            }catch(error){
                return Promise.reject(error)
            }
    }
)


export const toggleCompleteTodo = createAsyncThunk(
    'todo/completeTodo',
    async ({checked, todoId}) => {
       
        try{
            const response = await fetchApi.post(
                'http://localhost:8000/api/todo/completeTodo',
                {
                    todoId: todoId,
                    completed: checked
                },
                {   
                    headers: authHeader(
                        {
                            'Content-Type': 'application/json'
                        }
                    ),
                    
                }
            )
            .then(res => res.data)
            .then(data => {
                
                return {
                    todoId: todoId,
                    checked: checked,
                    mess: data.message,
                    status: data.status
                }
            })

         return response
        }catch(error){
            return Promise.reject(error)
        }
    }
)

export const doneEditTodo = createAsyncThunk(
    'todo/doneEditTodo',
    async ({todoId, title}) => {

        try{
            const response = await fetchApi.post(
                'http://localhost:8000/api/todo/editTodo',
                {
                    todoId: todoId,
                    title: title
                },
                {
                    headers: authHeader(
                        {
                            "Content-Type": 'application/json'
                        }
                    )
                }
            )
            .then(res => res.data)
            .then(data => {
                return {
                    message: data.message,
                    status: data.status,
                    todoId,
                    title
                }
            })

      
            return response
        }catch{

        }
    }
)
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
    extraReducers:{
        [fetchTodos.pending]: (state, action) => {
            state.status = 'pending'           
        },
        [fetchTodos.fulfilled]: (state, action) => {
           
            return {
                ...state,
                todos: action.payload.todos.todos,
                total: action.payload.todos.total,
                status: 'successded'
            }
        },
        [addNewTodo.fulfilled]: (state, action) => {
         
         
            state.todos.splice(4,1)
            state.todos.unshift(action.payload.todo)
    

        },
        [deleteTodo.fulfilled]: (state, action) => {
            const indexTodo = state.todos.findIndex(todo => todo.id === action.payload.todo.id)
            state.todos.splice(indexTodo, 1)
        },
        [toggleCompleteTodo.fulfilled]: (state, action) => {
       
            return {
                ...state, 
                todos: [...state.todos.map(todo => todo.id === action.payload.todoId ? {...todo, completed: action.payload.checked} : todo)],
            }
        },
        [doneEditTodo.fulfilled]: (state, action) => {
       
            return {
                ...state, 
                todos: [...state.todos.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.title} : todo)],
            }
        },
        [filterTodos.fulfilled]: (state, action) => {
        
            return {
                ...state, 
                todos: action.payload.todos.todos,
                total: action.payload.todos.total
            }
        }
    }

})
export const selectAllTodo = state => state.todos.todoSlice.todos
export const statusRequest = state => state.todos.todoSlice.status
export const selectUserId = state => {return state.auth.user ? state.auth.user.id : ''}
export const getCountTodo = state => state.todos.todoSlice.total
export default todosSlice.reducer