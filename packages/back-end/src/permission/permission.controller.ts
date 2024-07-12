import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const { data, err } =
      await this.permissionService.create(createPermissionDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get()
  async findAll() {
    const { data, err } = await this.permissionService.findAll();
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { data, err } = await this.permissionService.findOne(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const { data, err } = await this.permissionService.update(
      +id,
      updatePermissionDto,
    );
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { data, err } = await this.permissionService.remove(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
}
