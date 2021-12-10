import { IVerifyPermission } from "./IVerifyPermission";



export class VerifyPermission implements IVerifyPermission{
    async verify(platform: string, module: string, roleId: string, actions: string[]): Promise<boolean> {
        return true;
    }

}