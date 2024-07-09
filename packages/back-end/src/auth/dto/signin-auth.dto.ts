import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
