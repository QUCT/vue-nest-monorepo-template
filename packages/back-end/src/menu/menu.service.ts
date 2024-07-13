import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../common/service/prisma.service';
import { QueryMenuVo } from './vo/query-menu.vo';
@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const dbData = await this.prismaService.menu.create({
        data: createMenuDto,
      });
      const formatedData = plainToInstance(QueryMenuVo, dbData);
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
      const dbData = await this.prismaService.menu.findMany();
      const formatedData = plainToInstance(QueryMenuVo, dbData);
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
      const dbData = await this.prismaService.menu.findUnique({
        where: { id },
      });
      const formatedData = plainToInstance(QueryMenuVo, dbData);
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

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      const dbData = await this.prismaService.menu.update({
        where: { id },
        data: updateMenuDto,
      });
      const formatedData = plainToInstance(QueryMenuVo, dbData);
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

  async remove(id: number) {
    try {
      await this.prismaService.menu.delete({
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
