import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationDto } from './create-operation.dto';

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
