import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { PrismaService } from '../../common/service/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OperationService {
  constructor(private prismaService: PrismaService) {}
  async create(createOperationDto: CreateOperationDto) {
    try {
      const dbData = await this.prismaService.operation.create({
        data: createOperationDto,
      });
      const formatData = plainToInstance(CreateOperationDto, dbData);
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
      const dbData = await this.prismaService.operation.findMany();
      const formatData = plainToInstance(CreateOperationDto, dbData);
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
    return `This action returns a #${id} operation`;
  }

  update(id: number, updateOperationDto: UpdateOperationDto) {
    return `This action updates a #${id} operation`;
  }

  remove(id: number) {
    return `This action removes a #${id} operation`;
  }
}
