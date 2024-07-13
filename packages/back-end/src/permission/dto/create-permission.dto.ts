import { RuleCode } from '@prisma/client';
import {
  IsNumber,
  IsOptional,
  Max,
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreatePermissionDto {
  @IsNumber()
  @IsOptional()
  @Max(1000)
  menuId: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  ruleCode: RuleCode;

  @IsNotEmpty()
  @Length(1, 20)
  name: string;
}
