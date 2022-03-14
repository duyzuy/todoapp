import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo } from '../todoSlice'

const TodoItem = ({todo, userId}) => {

    const [statusDelete, setStatusDelete] = useState('idle')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

  
    
    const handleDeleteTodo = async ({todoId, userId}) => {
        if(statusDelete === 'idle' && loading === false){
            try{
                setStatusDelete('pending')
                const response = await dispatch(deleteTodo({todoId, userId })).unwrap()
                if(response.status === 200){
                    console.log('delete success')
                }
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
                setStatusDelete('idle')
            }
        }
    }
  return (
    <div className="todo__item">
        <div className="checkbox__group">
            <input 
                type="checkbox" 
                id={`todocheck-${todo.id}`} 
                className="checkbox__control"
            />
            <label htmlFor={`todocheck-${todo.id}`}></label>
        </div>    
        <div className="todo__name">
            {todo.title}    
        </div>
        <span 
            className="todo__button btn__delete text-sm"
            onClick={() => handleDeleteTodo({todoId: todo.id, userId: userId})}
        >
            Delete
        </span>
  
        <span 
            className={`todo__priority ${todo.priority}`}
        >
            {todo.priority}
        </span>
      
    </div>
  )
}

export default TodoItem