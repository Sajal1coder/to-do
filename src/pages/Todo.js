import {useState,useEffect} from 'react';
import Navbar from './Navbar';
import TaskCard from './Taskcard';
import './Todo.css';

const API_URL="http://localhost:5000/api/todo";
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const token=localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated. Please log in.');
        setLoading(false);
        return;
    }
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const token=localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated. Please log in.');
        setLoading(false);
        return;}
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTask }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to add task');
        return;
      }

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleTask = async (id) => {
    try {
      const token=localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated. Please log in.');
        setLoading(false);
        return;}
      const taskToUpdate = tasks.find(task => task._id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !taskToUpdate.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteTask = async (id) => {
    try {
      const token=localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated. Please log in.');
        setLoading(false);
        return;}
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <>
      <Navbar />
      
      {/* Search Section */}
      <div className="search-section">
      <form onSubmit={addTask} className="input-container">
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task" 
            className="task-input"
          />
          <button type="submit" className="add-button">+</button>
        </form>
        {error && <div className="error-message" style={{color:'red',fontSize:'1rem'}} >{error}</div>}
      </div>

      {/* Tasks Section */}
      <div className="todo-container">
        <div className="tasks-container">
          <h2>Your Tasks</h2>
          {tasks.length===0 ?(
            <p className="no-tasks" >No tasks yet. Add one above!</p>
          ):(
            <div className="tasks-list">
            {tasks.map(task => (
              <TaskCard 
                key={task._id}
                id={task._id}
                text={task.text}
                completed={task.completed}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Todo;