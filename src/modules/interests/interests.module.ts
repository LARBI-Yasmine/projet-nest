import { Module } from '@nestjs/common';
import { InterestsService } from './Interests.service';
import { InterestsController } from './interests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest])],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}