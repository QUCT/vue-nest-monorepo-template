import { Status } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, Length, Max } from 'class-validator';

export class CreateMenuDto {
  @IsNumber()
  @IsOptional()
  @Max(10)
  pid?: number;

  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(3, 50)
  path: string;

  @IsNumber()
  @Max(100)
  order: number;

  @IsOptional()
  @Length(3, 50)
  icon?: string;

  @IsOptional()
  status?: Status;
}
