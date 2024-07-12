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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const { data, err } = await this.userService.create(createUserDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get('/findAll')
  async findAll() {
    const { data, err } = await this.userService.findAll();
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string) {
    const { data, err } = await this.userService.findOne(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { data, err } = await this.userService.update(+id, updateUserDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { data, err } = await this.userService.remove(+id);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
}
