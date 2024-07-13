import { IsNotEmpty, IsString, Length } from 'class-validator';
export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Length(4, 20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  captchaKey: string;
}
