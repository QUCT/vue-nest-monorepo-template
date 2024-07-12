import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ExculdeFieldsVo {
  @Exclude()
  createdAt;

  @Exclude()
  updatedAt;

  @Exclude()
  isSystem;

  @Exclude()
  status;
}
