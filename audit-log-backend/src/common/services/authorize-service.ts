import {
  HttpService,
  Injectable,
  PreconditionFailedException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IVerifyPermission, IVerifyPermissionType } from '@modules/auth/adapter/api/permission';

@Injectable()
export class AuthorizeService {
  constructor(
    private configService: ConfigService,
    @Inject(IVerifyPermissionType)
    private permissionVerifier : IVerifyPermission
  ) {}

  /**
   * Authorize user for action
   * @param role User role
   * @param platform Platform name
   * @param module Module name
   * @param actions actions
   * @returns decrypted payload from JWT
   */
  public async checkAuthorization(role: string,platform: string,module: string,actions: string[]):Promise<boolean>{
    try{
      return this.permissionVerifier.verify(platform,module,role,actions)
    }catch(err){

    }
  }
}
