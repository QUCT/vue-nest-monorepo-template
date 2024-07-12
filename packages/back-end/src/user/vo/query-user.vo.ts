import { Exclude } from 'class-transformer';
import { ExculdeFieldsVo } from 'utils/exclude-fields.vo';

export class QueryUserVo extends ExculdeFieldsVo {
  @Exclude()
  password: string;
}
