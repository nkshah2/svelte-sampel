import { SetMetadata } from '@nestjs/common';
import { Permissions } from './perms.types';

export const PERMS_KEY = 'perms';
export const Perms = (...perms: Permissions[]) => SetMetadata(PERMS_KEY, perms);
