import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import { getFilter, filterTodos  } from '../todoSlice'
import { filterTodos, getFilter } from '../filterSlice'

const TodoFilter = ({limit, onsetCurrentPage}) => {

    const dispatch = useDispatch();


    const filter = useSelector(getFilter)
    let {status, priority} = filter
 
    const [priorityCheck, setPriorityCheck] = useState([...priority])
    const [statusCheck, setStatusCheck] = useState(status)
    const [loading, setLoading] = useState(false)
    const [filterStatus, setFilterStatus] = useState(false)
    const isexists = (val) => {
        if(priorityCheck.includes(val)) return true
        return false
    }

    useEffect( async () => {
      
      
        try{
            const response = await dispatch(filterTodos({
                status: statusCheck,
                priority: priorityCheck,
                limit: limit,
                page: 1
            })).unwrap()
            
        }catch(error){
            console.log(error)
        }finally{
            setFilterStatus(false)
        }
       


    },[priorityCheck, statusCheck])

    const handleSetStatus = (value) => {
        setStatusCheck(value)
        onsetCurrentPage(1)
        setFilterStatus(true)
    }
    return (
        <div className="todo__filters">
            <div className="todo__filter__prio">
                <h3>Filter by Priority</h3>
                <div className="checkbox__group important">
                    <input 
                        id="filterImportant"
                        type="checkbox"
                        className="checkbox__control"
                        name="important"
                        checked={isexists('important') ? 'checked' : ''}
                        onChange={(e) => setPriorityCheck(prev => prev.includes(e.target.name) ? prev.filter(prev => prev !== e.target.name) : [...prev, e.target.name])}
                    />
                    <label htmlFor='filterImportant'>Important</label>
                </div>
                <div className="checkbox__group medium">
                    <input 
                        id="filterMedium" 
                        type="checkbox" 
                        className="checkbox__control"
                        name="medium"
                        checked={isexists('medium') ? 'checked' : ''}
                        onChange={(e) => setPriorityCheck(prev => prev.includes(e.target.name) ? prev.filter(prev => prev !== e.target.name) : [...prev, e.target.name])}
                    />
                    <label htmlFor='filterMedium'>Medium</label>
                </div>
                <div className="checkbox__group low">
                    <input 
                        id="filterLow"
                        type="checkbox"
                        name="low"
                        className="checkbox__control"
                        checked={isexists('low') ? 'checked' : ''}
                        onChange={(e) => setPriorityCheck(prev => prev.includes(e.target.name) ? prev.filter(prev => prev !== e.target.name) : [...prev, e.target.name])}
                    />
                    <label htmlFor='filterLow'>Low</label>
                </div>
            </div>
            <div className="todo__filter_complete">
                <h3>Filter</h3>
                <div className="radio__group">
                    <input 
                        id="filterAll"
                        type="radio" 
                        className="radio__control"
                        name="status"
                        value="all"
                        checked={statusCheck === 'all' ? 'checked' : ''}
                        onChange={(e) => handleSetStatus(e.target.value)}
                    />
                    <label htmlFor='filterAll'>All</label>
                </div>
                <div className="radio__group">
                    <input 
                        id="filterCompleted"
                        type="radio" 
                        className="radio__control"
                        name="status"
                        value="completed"
                        checked={statusCheck === 'completed' ? 'checked' : ''}
                        onChange={(e) => handleSetStatus(e.target.value)}
                    />
                    <label htmlFor='filterCompleted'>Completed</label>
                </div>
                <div className="radio__group">
                    <input 
                        id="filterUncom"
                        type="radio" 
                        className="radio__control"
                        name="status"
                        value="uncompleted"
                        checked={statusCheck === 'uncompleted' ? 'checked' : ''}
                        onChange={(e) => handleSetStatus(e.target.value)}
                    />
                    <label htmlFor='filterUncom'>Uncompleted</label>
                </div>
            </div>
        </div>
    )
}

export default TodoFilter