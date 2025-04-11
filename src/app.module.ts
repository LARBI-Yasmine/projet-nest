import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';
import { InterestsModule } from 'src/modules/interests/interests.module';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [UsersModule, InterestsModule, ConfigModule.forRoot(), TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}