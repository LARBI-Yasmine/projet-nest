
import { IsUUID, IsArray, IsString } from 'class-validator';

export class AddInterestsDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  interestNames: string[];
}
