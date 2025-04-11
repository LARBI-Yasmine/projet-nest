import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Interest } from 'src/modules/interests/entities/interest.entity';
import { User } from 'src/modules/users/entities/user.entity';
 // charger les variables d'environnement
 dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:  'localhost',
  port:  5432,
  username:  'postgres',
  password:  'test',
  database: 'proj-nest',
  //entities: [User,Interest],
  autoLoadEntities: true,
  synchronize: true,
};