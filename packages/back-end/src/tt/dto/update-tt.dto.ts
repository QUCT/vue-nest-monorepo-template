import { PartialType } from '@nestjs/mapped-types';
import { CreateTtDto } from './create-tt.dto';

export class UpdateTtDto extends PartialType(CreateTtDto) {}
