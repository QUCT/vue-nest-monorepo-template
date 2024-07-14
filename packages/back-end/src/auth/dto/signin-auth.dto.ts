import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Length(4, 20)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  captchaKey?: string;
}
