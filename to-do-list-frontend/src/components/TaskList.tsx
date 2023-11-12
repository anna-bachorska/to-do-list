import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { TaskType } from '../../models/models';

function TaskList() {
  const [items, setItems] = useState<TaskType[]>([]);

  const createTask = async (item: TaskType) => {
    if (!item.content) {
      return;
    }
  
    const data: TaskType = {
      content: item.content,
      done: false,
    };
  
    try {
      const response = await fetch('http://localhost:3001/tasks', {
       // mode: "no-cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData: { id: number } = await response.json();
        data.id = responseData.id;
        setItems((prevItems) => [...prevItems, data]);
        console.log('The task has been added.');
      } else {
        console.error('Error when adding a task.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error while deleting the task.');
      }

      const removeArr = [...items].filter((item) => item.id !== id);
      setItems(removeArr);
    } catch (error) {
      console.error(error);
    }
  };
  
  const completeTask = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error while updating the task.');
      }
  
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
        return item;
      });
  
      setItems(updatedItems);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <TaskForm onFormSubmit={createTask} />
      <Task
        items={items}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    </div>
  );
}

export default TaskList;
