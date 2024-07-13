import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { InterfaceRulesGuard } from 'src/guards/Interface-rules.guard';
import { ControllerPrefix } from 'src/decorator/controller-prefix.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
@ControllerPrefix('menu') // 配合权限控制使用
@UseGuards(JwtGuard, InterfaceRulesGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const { data, err } = await this.menuService.create(createMenuDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get()
  async findAll() {
    const { data, err } = await this.menuService.findAll();
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { data, err } = await this.menuService.findOne(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const { data, err } = await this.menuService.update(+id, updateMenuDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { data, err } = await this.menuService.remove(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
}
