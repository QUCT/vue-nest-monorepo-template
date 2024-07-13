import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../common/service/prisma.service';
import { plainToInstance } from 'class-transformer';
import { QueryRoleVo } from './vo/query-role.vo';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const dbData = await this.prismaService.role.create({
        data: createRoleDto,
      });
      const formatData = plainToInstance(QueryRoleVo, dbData);
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
      const dbData = await this.prismaService.role.findMany();
      const formatData = plainToInstance(QueryRoleVo, dbData);
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
      const dbData = await this.prismaService.role.findUnique({
        where: { id },
      });
      const formatData = plainToInstance(QueryRoleVo, dbData);
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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const dbData = await this.prismaService.role.update({
        where: { id },
        data: updateRoleDto,
      });
      const formatData = plainToInstance(QueryRoleVo, dbData);
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

  async remove(id: number) {
    try {
      await this.prismaService.role.delete({
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
