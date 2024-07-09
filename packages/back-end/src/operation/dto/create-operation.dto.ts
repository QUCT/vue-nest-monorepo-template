import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateOperationDto {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @Length(1, 20)
  code: string;

  @Length(3, 20)
  @IsOptional()
  method?: string;

  @Length(3, 50)
  @IsOptional()
  url?: string;

  @Length(3, 50)
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
