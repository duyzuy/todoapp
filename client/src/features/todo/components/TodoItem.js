import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleCompleteTodo, doneEditTodo } from '../todoSlice'

const TodoItem = ({todo, userId}) => {

   
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editInput, setEditInput] = useState('')

    const dispatch = useDispatch()

    const handleDeleteTodo = async ({todoId, userId}) => {
        
            try{
                if(!loading){
                    setLoading(true)
                    const response = await dispatch(deleteTodo({todoId, userId })).unwrap()
                    if(response.status === 200){
                        console.log('delete success')
                    }
                }
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        
    }

    const handleCompleteTodo = async ({checked, todoId}) => {

        try{
            if(!loading){
                setLoading(true)
                const response = await dispatch(toggleCompleteTodo({
                    checked, todoId
                })).unwrap()
            }
            
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const handleEditTodo = ({title}) => {

        setEditing(true)
        setEditInput(title)
    }

    const handleDoneEditTodo = async (e, {todoId, title}) => {
       
        if(e.key === 'Enter'){
            try{
                const response = await dispatch(doneEditTodo({
                    todoId,
                    title
                })).unwrap()
                console.log(response)
               
            }catch(error){

            }finally{
                setEditing(false)
                setEditInput('')
            }
            
        }

    }
    return (
        <div className={`todo__item${loading ? ' loading' : ''}`}>
            <div className="checkbox__group">
                <input 
                    type="checkbox" 
                    id={`todocheck-${todo.id}`} 
                    className="checkbox__control"
                    checked={todo.completed}
                    onChange={(e) => handleCompleteTodo({checked: e.target.checked, todoId: todo.id})}
                />
                <label htmlFor={`todocheck-${todo.id}`}></label>
            </div>    
            <div 
                className="todo__name"
                onDoubleClick={(e) => handleEditTodo({title: todo.title})}
            >
                {
                    !editing ? todo.title
                    : 
                    <input 
                    value={editInput}
                    className="todo__edit__form"
                    onChange={(e) => setEditInput(e.target.value)}
                    onKeyDown={(e) => handleDoneEditTodo(e, {todoId: todo.id, title: e.target.value})}
                    autoFocus
                    onBlur={() => setEditing(false)}
                />
                }
                
              
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