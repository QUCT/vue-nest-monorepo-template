import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ControllerPrefix } from 'src/decorator/controller-prefix.decorator';
import { InterfaceRulesGuard } from 'src/guards/Interface-rules.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('roles')
@Controller('roles')
@ControllerPrefix('roles') // 配合权限控制使用
@UseGuards(JwtGuard, InterfaceRulesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const { data, err } = await this.rolesService.create(createRoleDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get()
  async findAll() {
    const { data, err } = await this.rolesService.findAll();

    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { data, err } = await this.rolesService.findOne(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const { data, err } = await this.rolesService.update(+id, updateRoleDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { data, err } = await this.rolesService.remove(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
}
