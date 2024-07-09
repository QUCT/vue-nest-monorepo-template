import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { FormatInterceptor } from 'interpector/response-format.interceptor';
// import { AuthGuard } from '@nestjs/passport';

@Controller('operation')
// @UseGuards(AuthGuard('jwt')) // 开启jwt守卫
@UseInterceptors(FormatInterceptor)
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  async create(@Body() createOperationDto: CreateOperationDto) {
    const { data, err } =
      await this.operationService.create(createOperationDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get()
  async findAll() {
    const { data, err } = await this.operationService.findAll();
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
