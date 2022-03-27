import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchTodos, 
    selectAllTodo,
    addNewTodo,
    statusRequest,
    selectUserId,
    getCountTodo,
    // getFilter
} from './todoSlice'
import {getFilter} from './filterSlice'
import {todoStore} from './todoReducer'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import Spin from './components/Spin'
import Pagination from './components/Pagination'
import useFilterTodo from './components/useFilterTodos'

const Todo = () => {

    let todos = useSelector(selectAllTodo)
    const filter = useSelector(getFilter)
    console.log(todos)

    todos = useFilterTodo(todos, filter.status)
    const fetchStatus = useSelector(statusRequest)
    
    //get userID
    const userId =  useSelector(selectUserId)
    const numberTotalTodo = useSelector(getCountTodo)
    
    const [priority, setPriority] = useState('medium')
    const [todoInput, setTodoInput] = useState('')
    const [addNewStatus, setAddNewStatus] = useState('idle')
    const [loadingAddNew, setLoadingAddNew] = useState(false)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [siblingCount, setSiblingCount] = useState(1)

   
    const dispatch = useDispatch();
    
    
    useEffect( async () => {
        try {
            //first Time fetching
            if(fetchStatus === 'idle'){
                setLoading(true)
                await dispatch(fetchTodos({
                    limit: limit, 
                    page: currentPage,
                    status: filter.status,
                    priority: filter.priority
                })).unwrap()
            }
            
        }catch(err){

        }finally{
            setLoading(false)
            
        }
    },[])

    const canSave = todoInput !== '' && addNewStatus === 'idle';

    const handleChangePage = async (pageNum) => {

       
        try{

            setPaginationLoading(true)
            await dispatch(fetchTodos(
                {
                    limit: limit, 
                    page: pageNum,
                    status: filter.status,
                    priority: filter.priority
                })
            ).unwrap()
            setCurrentPage(pageNum)
        }catch(error){
            console.log(error)
        }finally{
            setPaginationLoading(false)
           
        }
       
    }
    const handleAddTodo = async () => {

        if(canSave){
            try{
                setAddNewStatus('pending');
                setLoadingAddNew(true);
                const response = await dispatch( 
                    addNewTodo({
                        title: todoInput,
                        completed: false,
                        priority: priority,
                        userId: userId
                    }
                )).unwrap()
                if(response.status === 200){
                    setTodoInput('')
                    setPriority('medium')
                    setCurrentPage(1)
                }else{
                    return
                }
          
            }catch(error){
                console.log(error)
            }finally{
                setAddNewStatus('idle')
                setLoadingAddNew(false)
            }
        }
        
    }

    return (
        <div className="container">
            <div className="todo__app">
                <div className="todo__header">
                    <h1 className="text-center">Todo App</h1>
                </div>
                <div className="todo_form">
                    <div className="form__group">
                        <select 
                            className="select__control" 
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="important">Important</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <input 
                            className="form__control" 
                            type="text" 
                            placeholder="What do you wanna do?"
                            value={todoInput}
                            onChange={e => setTodoInput(e.target.value)}
                            disabled={loadingAddNew ? 'disabled': ''}
                        />
                        
                        <button 
                            className="btn btn-addTodo btn-contained btn-primary"
                            onClick={handleAddTodo}
                            disabled={loadingAddNew ? 'disabled' : ''}
                        >
                            {loadingAddNew ? <Spin /> : 'Add todo'}</button>
                    </div>
                </div>
                <div className="todo__List">
                    {loading ? <Spin /> : todos &&  <>
                            {todos.map( (todo, index) => (
                                <TodoItem todo={todo} key={index} userId={userId} />
                            ))
                            }
                            <Pagination 
                                paginationLoading={paginationLoading}
                                pageSize={limit}
                                totalCount={numberTotalTodo}
                                currentPage={currentPage}
                                onChangePage={(pageNum) => handleChangePage(pageNum)}
                                siblingCount={siblingCount}
                            />
                        </>
                    }
                </div>
                
                <div className="todo__Footer">
                    <TodoFilter limit={limit} onsetCurrentPage={(val) => setCurrentPage(val)}/>
                </div>
            </div>
            
        </div>
    )
}

export default Todo