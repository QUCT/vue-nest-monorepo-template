import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;
}
