import { Injectable } from '@nestjs/common';
import { Task } from '../../models/task.model';

@Injectable()
export class TasksService {
  
  private tasks: Task[] = [];
  private lastId: number = 0; 

  createTask(task: Task): Task {
    const newTask: Task = {
      id: this.generateId(), 
      content: task.content,
      done: task.done,
    };
  
    this.tasks.push(newTask); 
  
    return newTask;
  }

  

  
  deleteTask(id: number): boolean {
     const index = this.tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return false; 
    }

    this.tasks.splice(index, 1); 

    return true; 
  
  }
  
  updateTask(id: number): boolean {
    const taskToUpdate = this.tasks.find(task => task.id === id);
   // console.log(`${id} koniec ${taskToUpdate} koniec ${JSON.stringify(this.tasks)}`)
    if (!taskToUpdate) {
  //    console.error(`Nie znaleziono zadania o ID ${id}`);
      return false;
    }

    taskToUpdate.done = !taskToUpdate.done;

    return true; 
  }

  private generateId(): number {
    
    this.lastId++;
    return this.lastId;
  }

}