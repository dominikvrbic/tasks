import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFillterDto } from './dto/get-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTaskFillterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFillter(filterDto);
    }
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): Task[] {
    return this.taskService.deleteTaskByID(id);
  }
  @Patch()
  updateTaskStatus(@Body() updateTaskDto: UpdateTaskDto): Task {
    const { id, status } = updateTaskDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
