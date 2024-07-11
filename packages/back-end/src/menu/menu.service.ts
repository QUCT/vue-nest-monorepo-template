import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'common/service/prisma.service';
@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const dbData = await this.prismaService.menu.create({
        data: createMenuDto,
      });
      const formatedData = plainToInstance(CreateMenuDto, dbData);
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
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
