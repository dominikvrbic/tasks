import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFillterDto } from './dto/get-tasks.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFillter(filterDto: GetTaskFillterDto): Task[] {
    const { status, search } = filterDto;
    const tasks = this.tasks;
    return tasks.filter(task => {
      if (
        task.status === status ||
        task.description.includes(search) ||
        task.title.includes(search)
      ) {
        return task;
      }
    });
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }
  deleteTaskByID(id: string): Task[] {
    return (this.tasks = this.tasks.filter(task => task.id !== id));
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.tasks.find(task => task.id === id);
    task.status = status;
    return task;
  }
}
