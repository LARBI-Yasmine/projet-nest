
import { IsUUID, IsArray, IsString } from 'class-validator';

export class InterestDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  interestNames: string[];
}
