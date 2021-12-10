


export interface IVerifyPermission {
    verify(platform : string,module : string,roleId : string,actions : string[]):Promise<boolean>
}


export const IVerifyPermissionType = Symbol.for('IVerifyPermission')