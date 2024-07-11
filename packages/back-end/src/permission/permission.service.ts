import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'common/service/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const dbData = this.prismaService.permission.create({
        data: createPermissionDto,
      });
      const formatedData = plainToInstance(CreatePermissionDto, dbData);
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

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
