import { RoleCode, RuleCode } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  Max,
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Status } from 'common/interface';

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
