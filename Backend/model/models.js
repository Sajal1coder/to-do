const mongoose=require("mongoose");

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true

    }},{
    timestamps:true
});
const User = mongoose.model("User", user);
const todo=new mongoose.Schema({
    text: {
    type: String,
    required: [true, 'Please provide a task text'],
    trim:true,
    maxLength:[500, 'Task cannot be more than 500 characters']
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
}, {
  timestamps: true
});

const Todo = mongoose.model("Todo", todo);
module.exports = {User,Todo};
