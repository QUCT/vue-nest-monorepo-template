import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../common/service/prisma.service';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await argon2.hash(createUserDto.password); // 加密敏感数据
      const dbData = await this.prismaService.user.create({
        data: createUserDto,
      });
      const formatData = plainToInstance(CreateUserDto, dbData); // 过滤数据

      return {
        data: formatData,
        err: null,
      };
    } catch (error) {
      return {
        data: null,
        err: error,
      };
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneByEmail(email: string) {
    try {
      const dbData = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      return {
        data: dbData,
        err: null,
      };
    } catch (error) {
      return {
        data: null,
        err: error,
      };
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
