import React from 'react'

const TodoFilter = () => {
  return (
    <div className="todo__filters">
        <div className="todo__filter__prio">
            <h3>Filter by Priority</h3>
            <div className="checkbox__group important">
                <input 
                    id="filterImportant"
                    type="checkbox"
                    className="checkbox__control"
                />
                <label htmlFor='filterImportant'>Important</label>
            </div>
            <div className="checkbox__group medium">
                <input 
                    id="filterMedium" 
                    type="checkbox" 
                    className="checkbox__control"
                />
                <label htmlFor='filterMedium'>Medium</label>
            </div>
            <div className="checkbox__group low">
                <input 
                    id="filterLow"
                    type="checkbox"
                    className="checkbox__control"
                />
                <label htmlFor='filterLow'>Low</label>
            </div>
        </div>
        <div className="todo__filter_complete">
            <h3>Filter</h3>
            <div className="checkbox__group">
                <input 
                    id="filterAll"
                    type="checkbox" 
                    className="checkbox__control"
                />
                <label htmlFor='filterAll'>All</label>
            </div>
            <div className="checkbox__group">
                <input 
                    id="filterCompleted"
                    type="checkbox" 
                    className="checkbox__control"
                />
                <label htmlFor='filterCompleted'>Completed</label>
            </div>
            <div className="checkbox__group">
                <input 
                    id="filterUncom"
                    type="checkbox" 
                    className="checkbox__control"
                />
                <label htmlFor='filterUncom'>Uncompleted</label>
            </div>
        </div>
    </div>
  )
}

export default TodoFilter