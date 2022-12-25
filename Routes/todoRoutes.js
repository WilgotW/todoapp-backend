const router = require("express").Router();
const Todo = require("../Model/Todo");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

router.post("/getAll", verify , async (req, res) => {
    const decoded = jwt.decode(req.body.token);

    const todos = await Todo.find({userId: decoded._id});
    return res.json(todos)
});

router.post("/add", verify, async (req, res) => {    
    const decoded = jwt.decode(req.body.token);

    const todo = new Todo({
        description: req.body.description,
        userId: decoded._id,
        checked: false
    });
    try{
        const savedTodo = await todo.save();
        res.send(savedTodo);
    }catch(err){
        res.status(400).send(err);
    }
});


router.delete("/remove/:id", verify, async (req, res) => {
    const todoToRemove = await Todo.findOne({_id: req.params.id});
    if(!todoToRemove) return res.status(404).send("Todo doesnt exist in database");
    todoToRemove.delete();
    res.send("deleted todo");
}); 

router.put("/check/:id", verify, async (req, res) => {
    try{
        const todoToChange = await Todo.findOne({_id: req.params.id});
        const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id}, {checked: req.body.checked});
        res.send(`updated todo`);
    }catch(err){
        res.status(400).send(err);
    }
});
router.put("/update/:id", verify, async (req, res) => {
    try{
        const todoToChange = await Todo.findOne({_id: req.params.id});
        const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id}, {description: req.body.description});
        res.send(`updated todo  ${req.params.id} to: ${req.body.description}`);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;