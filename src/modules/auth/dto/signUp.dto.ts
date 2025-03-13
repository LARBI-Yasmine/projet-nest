import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/modules/users/dto/user-role.type';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsEnum(UserRole)
   role: string;
}
