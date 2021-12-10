import { SetMetadata } from '@nestjs/common';

export const Permissions = (module: string, actions: string[]) =>
  SetMetadata('permissions', { module: module, actions: actions });
