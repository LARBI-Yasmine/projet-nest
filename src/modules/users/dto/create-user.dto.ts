import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
//+ config dans main.ts
import { UserRole } from './user-role.type';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: string;
}