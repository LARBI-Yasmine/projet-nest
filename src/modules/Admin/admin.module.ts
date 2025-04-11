import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../users/entities/user.entity'; // Si vous souhaitez gérer les utilisateurs et leurs intérêts dans le même module


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [AdminService], 
  controllers: [AdminController],
})
export class AdminModule {}
