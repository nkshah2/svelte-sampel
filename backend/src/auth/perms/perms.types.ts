export enum Permissions {
  CREATE_LINK,
  EDIT_LINK,
}

export interface AccessTokenPayload {
  perms?: number;
}
