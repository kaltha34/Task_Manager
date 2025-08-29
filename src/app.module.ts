import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthModule, TasksModule, UsersModule, CommonModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
