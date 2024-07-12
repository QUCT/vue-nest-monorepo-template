import { Exclude } from 'class-transformer';
import { ExculdeFieldsVo } from 'utils/exclude-fields.vo';

export class QueryAuthVo extends ExculdeFieldsVo {
  @Exclude()
  phone;

  @Exclude()
  password;
}
