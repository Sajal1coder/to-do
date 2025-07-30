import React from 'react';
import './Taskcard.css';

const TaskCard = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="task-checkbox"
        />
        <span className="task-text">{text}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="delete-button"
      >
        ×
      </button>
    </div>
  );
};

export default TaskCard;