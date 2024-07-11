import { SetMetadata } from '@nestjs/common';

export const ControllerPrefix = (prefix: string) =>
  SetMetadata('controllerPrefix', prefix);
