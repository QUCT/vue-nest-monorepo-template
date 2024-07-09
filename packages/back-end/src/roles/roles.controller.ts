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
  UseInterceptors,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FormatInterceptor } from 'interpector/response-format.interceptor';
// import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
// @UseGuards(AuthGuard('jwt')) // 开启jwt守卫
@UseInterceptors(FormatInterceptor)
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
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
