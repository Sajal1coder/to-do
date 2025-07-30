const { Todo,User } = require("../model/models");

// Get all todos for a user
const getTodo = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            console.error('User not authenticated');
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        const userId = req.user._id;
        console.log('Fetching todos for user:', userId);
        
        const todos = await Todo.find({ user: userId }).sort('-createdAt');
        
        // Return empty array if no todos found
        if (!todos || todos.length === 0) {
            console.log('No todos found for user:', userId);
            return res.status(200).json([]);
        }
        
        console.log('Successfully fetched', todos.length, 'todos for user:', userId);
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error getting todos:', error);
        res.status(500).json({ 
            message: 'Server error while fetching todos',
            error: error.message 
        });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: 'Please provide a todo text' });
        }

        const userId = req.user._id;
        const todo = await Todo.create({
            text,
            user: userId,
            completed: false
        });

        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        const userId = req.user._id;

        const todo = await Todo.findOne({ _id: id, user: userId });
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        if (text !== undefined) todo.text = text;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const todo = await Todo.findOne({ _id: id, user: userId });
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        await Todo.deleteOne({ _id: id });
        res.status(200).json({ id });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
