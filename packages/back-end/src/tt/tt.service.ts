import { Injectable } from '@nestjs/common';
import { CreateTtDto } from './dto/create-tt.dto';
import { UpdateTtDto } from './dto/update-tt.dto';

@Injectable()
export class TtService {
  create(createTtDto: CreateTtDto) {
    return 'This action adds a new tt';
  }

  findAll() {
    return `This action returns all tt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tt`;
  }

  update(id: number, updateTtDto: UpdateTtDto) {
    return `This action updates a #${id} tt`;
  }

  remove(id: number) {
    return `This action removes a #${id} tt`;
  }
}
