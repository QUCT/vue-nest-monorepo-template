import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  name: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  @Exclude() // 过滤敏感数据
  password: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '手机号' })
  @IsNumber()
  @IsOptional()
  phone?: number;
}
