import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { User } from './modules/users/entity/users.entity';


@Module({
  imports: [UsersModule,ConfigModule.forRoot({ isGlobal: true }), // Charge les variables .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'proj-nest',
      entities: [User],
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    
    
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

