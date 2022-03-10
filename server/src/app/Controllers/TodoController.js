const { dbModels } = require('../Models')
const {validationAddTodo, validationEditTodo, validationTodoCompleted} = require('../Validations/TodoValidation')
const db = dbModels()

class TodoController {

    show (req, res) {
        res.json('show')
    }
    deleteTodo = async (req, res) => {
        const todoDelete = {
            id: req.body.todoId,
        }
        
        //check todo exists
        const existsTodo = await db.Todo.findOne({where: {id: todoDelete.id}})
        if(!existsTodo) return res.json({message: "todo is not exists", status: 400})

        //check user can edit todo

        try{
            await db.Todo.destroy({
                where: {
                id: todoDelete.id
                }
            });
            return res.json({message: "delete todo success", status: 200})
        }catch(err){
            res.json({error: err, status: 400})
        }
    }
    completeTodo = async (req, res) => {
        const todoComplete = {
            id: req.body.todoId,
            completed: req.body.completed,
        }
        
        //validate todo
        const {error} = await validationTodoCompleted({completed: todoComplete.completed})
        if(error) return res.json({error: error.details[0].message, status: 400})

        //check todo exists
        const existsTodo = await db.Todo.findOne({where: {id: todoComplete.id}})
        if(!existsTodo) return res.json({message: "todo is not exists", status: 400})

        //check user can edit todo

        try{
            await db.Todo.update(
                { 
                    completed: todoComplete.completed 
                }, {
                    where: {
                    id: todoComplete.id
                    }
                }
            );
            return res.json({message: "update todo success", status: 200})
        }catch(err){
            res.json({error: err, status: 400})
        }
    }
    editTodo = async (req, res) => {
        const editTodo = {
            id: req.body.todoId,
            title: req.body.title,
        }
        
        //validate todo
        const {error} = await validationEditTodo({title: editTodo.title})
        if(error) return res.json({error: error.details[0].message, status: 400})

        //check todo exists
        const existsTodo = await db.Todo.findOne({where: {id: editTodo.id}})
        if(!existsTodo) return res.json({message: "todo is not exists", status: 400})

        //check user can edit todo

        try{
            await db.Todo.update(
                { 
                    title: editTodo.title 
                }, {
                    where: {
                    id: editTodo.id
                    }
                }
            );
            return res.json({message: "update todo success", status: 200})
        }catch(err){
            res.json({error: err, status: 400})
        }
    }

    addNewTodo = async (req, res) => {

        const newTodo = {
            title: req.body.title,
            completed: req.body.completed,
            priority: req.body.priority,
        }

        //validate todo
        const {error} = await validationAddTodo(newTodo)
        if(error) return res.json({error: error.details[0].message, status: 400})

        //validate userid
        
        const user = await db.User.findOne({where: {id: req.body.userId}});
        if(!user) return res.json({message: "invalid user", status: 400 })

        newTodo.UserId = user.id
     
        try{
            const todo = await db.Todo.create(newTodo)
            todo.save()
            return res.json({status: 200, message: "create todo success"})
        }   
        catch(err){
            return res.json({error: err, status: 400})
        }

    }


}

module.exports = new TodoController