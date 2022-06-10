import Bitfield from 'bitfield';

export class PermissionsManager<T> {
  private permissionSize: number;
  constructor(permissionEnum: T) {
    if (typeof permissionEnum !== 'object') {
      throw new Error('Unrecognised enum');
    }

    const validation = {};
    let largestIndex = 0;
    const isNum = (str: string) => /^\d+$/.test(str);

    Object.entries(permissionEnum).forEach(([k, v]) => {
      if (!isNum(k) && typeof v !== 'number') {
        throw new Error(
          `Invalid enum entry [${k},${v}] - expected [string,number]`,
        );
      }
      if (!isNum(k)) {
        validation[k] = v;
        largestIndex = largestIndex < v ? v : largestIndex;
      }
    });

    const enumLength = Object.keys(validation).length;
    if (largestIndex + 1 !== enumLength) {
      throw new Error(
        `Unexpected largest index value - expected = ${enumLength}, actual = ${
          largestIndex + 1
        }`,
      );
    }

    this.permissionSize = enumLength;
  }
  /**
   * Converts permission attribute value to permission bitfield
   */
  permAttr2Bits(value: number): Bitfield {
    const bitStr = value.toString(2);
    const bitfield = new Bitfield(this.permissionSize);
    for (let i = 0; i < bitStr.length; i++)
      bitfield.set(bitStr.length - (i + 1), bitStr.charAt(i) === '1');
    return bitfield;
  }

  /**
   * Converts permission bitfield to permission attribute value
   */
  bits2PermAttr(bitfield: Bitfield): number {
    let binStr = '';
    for (let i = 0; i < this.permissionSize; i++)
      binStr = (bitfield.get(i) ? '1' : '0') + binStr;
    return parseInt(binStr, 2);
  }

  /**
   * Takes list of permissions and returns permission attribute value
   * @param permissions List of permissions for the user
   */
  createPermissionAttribute(...permissions: T[keyof T][]): number {
    const bitfield = new Bitfield(this.permissionSize);
    // @ts-expect-error Expecting `perm` to be a number
    for (const perm of permissions) bitfield.set(perm, true);
    return this.bits2PermAttr(bitfield);
  }

  /**
   * @param permissionAtrr Permission attribute of a user
   * @param requiredPerms Permissions to check presence of within permission attribute
   */
  checkPermissions(permissionAtrr: number, ...requiredPerms: T[keyof T][]) {
    const bitfield = this.permAttr2Bits(permissionAtrr);
    for (const perm of requiredPerms)
    // @ts-expect-error Expecting `perm` to be a number
      if (bitfield.get(perm) === false) return false;
    return true;
  }

  /**
   * Modify an existing permission attribute
   * @param permAttr User's existing permission value
   * @param permsToAdd List of permissions to add
   * @param permsToRemove List of permissions to revoke
   * @returns New permission attribute
   */
  modifyPermissions(
    permAttr: number,
    permsToAdd?: T[keyof T][],
    permsToRemove?: T[keyof T][],
  ) {
    const bitfield = this.permAttr2Bits(permAttr);

    if (permsToAdd) {
      // @ts-expect-error Expecting `perm` to be a number
      for (const perm of permsToAdd) bitfield.set(perm, true);
    }

    if (permsToRemove) {
      // @ts-expect-error Expecting `perm` to be a number
      for (const perm of permsToRemove) bitfield.set(perm, false);
    }

    return this.bits2PermAttr(bitfield);
  }
}
