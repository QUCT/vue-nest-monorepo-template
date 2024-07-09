import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @Length(3, 100)
  @IsOptional()
  @Exclude()
  description?: string;

  @IsOptional()
  @Exclude()
  createdAt?: Date;

  @IsOptional()
  @Exclude()
  updatedAt?: Date;
}
