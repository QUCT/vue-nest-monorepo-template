import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../common/service/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const dbData = await this.prismaService.role.create({
        data: createRoleDto,
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

  async findAll() {
    try {
      const dbData = await this.prismaService.role.findMany();
      const formatData = plainToInstance(CreateRoleDto, dbData);
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

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
