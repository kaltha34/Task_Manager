import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskDocument> {
    return this.taskModel.create({ ...createTaskDto, user: new Types.ObjectId(userId) });
  }

  async findAll(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel.findOne({ _id: id, user: userId }).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, userId: string, updateData: Partial<Task>): Promise<TaskDocument> {
    const task = await this.taskModel.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true }).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(id: string, userId: string) {
    const result = await this.taskModel.findOneAndDelete({ _id: id, user: userId }).exec();
    if (!result) throw new NotFoundException('Task not found');
    return result;
  }
}
