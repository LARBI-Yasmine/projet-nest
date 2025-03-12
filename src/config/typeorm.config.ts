import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
 // charger les variables d'environnement
 dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:  'localhost',
  port:  5432,
  username:  'postgres',
  password:  'test',
  database: 'proj-nest',
  autoLoadEntities: true,
  synchronize: true,
};