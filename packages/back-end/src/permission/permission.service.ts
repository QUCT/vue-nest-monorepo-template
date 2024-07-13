import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '../common/service/prisma.service';
import { plainToInstance } from 'class-transformer';
import { QueryPermissionVo } from './vo/query-permission.vo';

@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const dbData = await this.prismaService.permission.create({
        data: createPermissionDto,
      });
      const formatedData = plainToInstance(QueryPermissionVo, dbData);
      return {
        data: formatedData,
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
      const dbData = await this.prismaService.permission.findMany();
      const formatedData = plainToInstance(QueryPermissionVo, dbData);
      return {
        data: formatedData,
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
      const dbData = await this.prismaService.permission.findUnique({
        where: { id },
      });
      const formatedData = plainToInstance(QueryPermissionVo, dbData);
      return {
        data: formatedData,
        err: null,
      };
    } catch (error) {
      return {
        data: null,
        err: error,
      };
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const dbData = await this.prismaService.permission.update({
        where: { id },
        data: updatePermissionDto,
      });
      const formatedData = plainToInstance(QueryPermissionVo, dbData);
      return {
        data: formatedData,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: err,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.permission.delete({
        where: { id },
      });
      return {
        data: [],
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
