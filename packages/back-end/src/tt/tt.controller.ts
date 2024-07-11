import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TtService } from './tt.service';
import { CreateTtDto } from './dto/create-tt.dto';
import { UpdateTtDto } from './dto/update-tt.dto';
import { ControllerPrefix } from 'decorator/controller-prefix.decorator';
import { CommonRulesGuard } from 'guards/common-rules.guard';
import { JwtGuard } from 'guards/jwt.guard';

@Controller('tt')
@ControllerPrefix('tt')
@UseGuards(JwtGuard, CommonRulesGuard)
export class TtController {
  constructor(private readonly ttService: TtService) {}

  @Post()
  create(@Body() createTtDto: CreateTtDto) {
    return this.ttService.create(createTtDto);
  }

  @Get()
  findAll() {
    return this.ttService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ttService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTtDto: UpdateTtDto) {
    return this.ttService.update(+id, updateTtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ttService.remove(+id);
  }
}
