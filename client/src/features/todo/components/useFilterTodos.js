import React from "react";

const useFilterTodo = (todos, status) => {

    if(status === 'completed'){

        return todos.filter(todo => todo.completed === true)
    }else if(status === 'uncompleted'){
        return todos.filter(todo => todo.completed === false)
    }else{
        return todos;
    }
  
}

export default useFilterTodo