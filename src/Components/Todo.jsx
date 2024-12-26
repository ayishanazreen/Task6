import React, { useState } from 'react'
import './Todo.css';
import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';

const Todo = () => {
  const [task, setTask] =useState([]);
  const [newTask, setNewtask]=useState("");
  const [editingTask, setEditingTask]=useState(null);
  

  const handleAddClick =()=> {
     if(newTask.trim()){
      const updatedTasks=[...task, {text: newTask.trim(), complete: false}];
      setTask(updatedTasks);
      localStorage.setItem('task', JSON.stringify(updatedTasks));
      setNewtask("");
     }
  };
  const handleChange=(event)=>{
    setNewtask(event.target.value);
  };

  const handleDeleteTask = (toDeleteTask)=>{
    const updatedTask=task.filter((item)=>item!=toDeleteTask);
    setTask(updatedTask);
    localStorage.setItem('task', JSON.stringify(updatedTask));
    
  }

// edit mode 

  const handleEditTask= (toEditTask) => {
   setEditingTask(toEditTask);
  }

  const handleSaveEdit =(updatedTask)=> {
  const updatedTasks= task.map((item) =>
    item === editingTask ? {...item, text:updatedTask }: item
  );
  setTask(updatedTasks);
  localStorage.setItem('task', JSON.stringify(updatedTasks));
  setEditingTask(null);
  }

  const handleCancelEdit =()=>{
    setEditingTask(null);
  }

  const handleComplete =(item)=>{
    const updatedTasks =task.map((taskItem) =>{
      return taskItem ===item ? {...taskItem, complete: !taskItem.complete} : taskItem;
      })
      setTask(updatedTasks);
      localStorage.setItem('task', JSON.stringify(updatedTasks));
    }

  return (
    <div className='todo-container'>
     <h1>Todo List</h1>
     <TodoInput task={task} newTask={newTask} handleAddClick={handleAddClick} handleChange={handleChange}/>
     <TodoList task={task} 
     handleDeleteTask={handleDeleteTask} 
     editingTask={editingTask}
     handleEditTask={handleEditTask} 
     handleComplete={handleComplete}
     handleSaveEdit={handleSaveEdit} 
     handleCancelEdit ={handleCancelEdit}/>
    </div>
  )
}
export default Todo
