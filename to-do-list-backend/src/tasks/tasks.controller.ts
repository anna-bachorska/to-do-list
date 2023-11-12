import { Controller, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../../models/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post() 
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  @Delete(':id') 
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id') 
  updateTask(@Param('id') id: number) {
    return this.tasksService.updateTask(id);
  }
}