const { dbModels } = require('../Models')
const {validationAddTodo, validationEditTodo, validationTodoCompleted} = require('../Validations/TodoValidation')
const db = dbModels()
const jwt = require('jsonwebtoken')
class TodoController {

    show (req, res) {
        res.json('show')
    }
    deleteTodo = async (req, res) => {
        const todoDelete = {
            id: req.body.todoId,
            userId: req.body.userId
        }
      
        //check todo exists
        const existsTodo = await db.Todo.findOne({where: {id: todoDelete.id}})
        if(!existsTodo) return res.json({message: "todo is not exists", status: 400})

        //check user can edit todo

        try{
            await db.Todo.destroy({
                where: {
                id: todoDelete.id,
                userId: todoDelete.userId
                }
            });

            setTimeout( () => {
                return res.json({todo: existsTodo, message: "delete todo success", status: 200})
            }, 2000)
            
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
        const {error} = validationTodoCompleted({completed: todoComplete.completed})
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
            setTimeout( () => {
                return res.json({message: "update todo success", status: 200})
            }, 2000)
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
        const {error} = validationEditTodo({title: editTodo.title})
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
        const {error} = validationAddTodo(newTodo);
        if(error) return res.json({error: error.details[0].message, status: 400})

        //validate userid
        
        const user = await db.User.findOne({where: {id: req.body.userId}});
        if(!user) return res.json({message: "invalid user", status: 400 })

        newTodo.UserId = user.id
     
        try{
            const todo = await db.Todo.create(newTodo)
            todo.save()
            setTimeout( () => {
                return res.json({todo: todo, status: 200, message: "create todo success"})
            }, 1000)
            
        }   
        catch(err){
            return res.json({error: err, status: 400})
        }

    }

    todoList = async (req, res) => {
    
        const token = req.header('auth-token');
        let limit, page;
        
        req.query.limit ? limit = Number(req.query.limit) : limit = 10
        req.query.page ? page = Number(req.query.page) : page = 1    
          
        const offset = Math.floor(page - 1) * limit

       
        try{

            const verified = jwt.verify(token, process.env.SECRET_TOKEN)
            const userId = verified.id 
            const todos = await db.Todo.findAll({
                limit: limit,
                offset: offset, 
                where: {
                    UserId: userId,
                },
                order:[
                    [
                        'createdAt', 'DESC'
                    ]
                ]
            })
            const count = await db.Todo.count({  where: {
                UserId: userId,
            },});
            setTimeout( () => {
                return res.json({status: 200, message: "get todo success", todos: todos, total: count})
            }, 1000)

      
        }catch(err){
            return res.json({error: err, status: 400})
           
        }
      
       
    }


}

module.exports = new TodoController