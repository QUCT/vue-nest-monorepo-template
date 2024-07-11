import { RoleCode, Status } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class CreateRoleDto {
  @IsNumber()
  @IsOptional()
  @Max(10)
  pid?: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  roleCode: RoleCode;

  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @Length(3, 100)
  @IsOptional()
  @Exclude()
  description?: string;

  @IsNotEmpty()
  @Length(1, 20)
  @IsOptional()
  status: Status;
}
