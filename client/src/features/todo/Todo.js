import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchTodos, 
    selectAllTodo,
    addNewTodo,
    statusRequest,
    selectUserId,
    getCountTodo
} from './todoSlice'

import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import Spin from './components/Spin'
import Pagination from './components/Pagination'
const Todo = () => {

    const todos = useSelector(selectAllTodo)
    const status = useSelector(statusRequest)
    //get userID
    const userId =  useSelector(selectUserId)
    const numberTotalTodo = useSelector(getCountTodo)
    
    const [priority, setPriority] = useState('medium')
    const [todoInput, setTodoInput] = useState('')
    const [addNewStatus, setAddNewStatus] = useState('idle')
    const [loadingAddNew, setLoadingAddNew] = useState(false)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [pageBound, setPagebout] = useState(1)
    const [upperPageBound, setUpperPageBound] = useState(1)
    const [lowerPageBound, setLowerPageBound] = useState(0)
   
    const dispatch = useDispatch();
    
    
    // const todoSort = todos.sort((a,b) => {
    //     return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    // }).reverse();
    // console.log(todoSort)
    useEffect( async () => {
           
            try {
                //first Time fetching
                if(status === 'idle'){
                    setLoading(true)
                    await dispatch(fetchTodos({limit: limit, page: currentPage})).unwrap()
                }
                //fetching when click on pagination
                if(paginationLoading === false){
                    setPaginationLoading(true)
                    await dispatch(fetchTodos({limit: limit, page: currentPage})).unwrap()
                }
            }catch(err){

            }finally{
                setLoading(false)
                setPaginationLoading(false)
            }
        
        
    },[dispatch, currentPage])

    const canSave = todoInput !== '' && addNewStatus === 'idle';

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
                }else{
                    return
                }
                console.log(response)
            }catch(error){
                console.log(error)
            }finally{
                setAddNewStatus('idle')
                setLoadingAddNew(false)
            }
        }
        
    }

    //paginations
    // const totalPage = Math.ceil(total/limit)
    const totalPage = () => {
        return Math.ceil(numberTotalTodo/limit)
    }
    const handleSetCurrentPage = (action) => {
        const pageTotal = totalPage()
        console.log(action)
        if(action === 'prev' && currentPage > 1){
            setCurrentPage(currentPage => currentPage - 1)
        }else if(action === 'next' && currentPage < pageTotal){
         
            setCurrentPage(currentPage => currentPage + 1)
          
        }
        
    }   
    const getArrayFromPageTotalCount = () => {
        const pageTotal = totalPage();
        //return an array from a number
        return Array.from(Array(pageTotal).keys())
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
                    {loading ? <Spin /> : todos.map((todo, index) => (
                            <TodoItem todo={todo} key={index} userId={userId} />
                        ))
                    }
                </div>
                <Pagination 
                    currentPage={currentPage}
                    onSetCurrentpage={handleSetCurrentPage}
                    totalPage={totalPage}
                    getArrayFromPageTotalCount={getArrayFromPageTotalCount}
                    onChangePage={(page) => setCurrentPage(page)}
                    paginationLoading={paginationLoading}
                    pageBound={pageBound}
                    upperPageBound={upperPageBound}
                    lowerPageBound={lowerPageBound}
                />
                <div className="todo__Footer">
                    <TodoFilter />
                </div>
            </div>
            
        </div>
    )
}

export default Todo