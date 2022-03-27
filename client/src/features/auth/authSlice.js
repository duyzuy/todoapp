import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: 'null',
    status: 'idle',
    message: '',
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    error: ''
}

const authToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData) => {
        try{
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            
            return response.json()
          

        }catch(err){
            console.log(err)
        }
    }
)

//register
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData) => {
        try{
         
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            return response.json()
        }catch(err){
            console.log(err)
        }
    }
)

//fetchuser
export const accessToken = createAsyncThunk(
    'auth/accessToken',
    async () => {

        
        try {
            const response = await fetch('http://localhost:8000/api/auth/access-token', 
            {   
                method: "GET",
                mode: 'cors',
                headers: {
                    'auth-token': authToken
                }
            })
            // console.log('response from sv')
            return response.json()           
        }catch(err) {
            return Promise.reject(err)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action) {
            localStorage.removeItem('token');
            state = {...state, token: null, isAuthenticated: false}
            
        }
    },
    extraReducers(builder){
        builder.addCase(loginUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'successded'
            if(action.payload.status === 400){
                state.error = action.payload.error
            }else{
                localStorage.setItem('token', action.payload.token)
                state.token = action.payload.token
                state.isAuthenticated = true;
                state.user = action.payload.user
            }
        
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            
            if(action.payload.status === 400){
                state.error = action.payload.error
            }else{
                state.message = action.payload.message
            }
        })
        .addCase(accessToken.pending, (state, action) => {
            state.status = 'pending';
            

        })
        .addCase(accessToken.fulfilled, (state, action) => {
            
            if(action.payload.status === 400){
                state.error = action.payload.message
                state.isAuthenticated = false
            }else{
                state.user = action.payload.user
            }
            state.status = 'successded'
        })

    }
})


export const isAuthented = (state) => state.auth.isAuthenticated
export const userInformation = (state) => state.auth.user
export const {logout} = authSlice.actions
export default authSlice.reducer

