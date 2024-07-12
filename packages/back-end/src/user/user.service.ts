import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../common/service/prisma.service';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { QueryUserVo } from './vo/query-user.vo';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await argon2.hash(createUserDto.password); // 加密敏感数据
      const dbData = await this.prismaService.user.create({
        data: createUserDto,
      });
      const formatData = plainToInstance(QueryUserVo, dbData); // 过滤数据
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
    try {
      const dbData = await this.prismaService.user.findMany();
      const formatData = plainToInstance(QueryUserVo, dbData);
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

  async findOneByEmail(email: string) {
    try {
      const dbData = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      const formatData = plainToInstance(QueryUserVo, dbData);
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

  async findOne(id: number) {
    try {
      const dbData = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      const formatData = plainToInstance(QueryUserVo, dbData);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const dbData = await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      const formatData = plainToInstance(QueryUserVo, dbData);
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

  remove(id: number) {
    try {
      const dbData = this.prismaService.user.delete({
        where: {
          id,
        },
      });
      const formatData = plainToInstance(QueryUserVo, dbData);
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
}
