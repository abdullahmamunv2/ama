import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthorizeService } from '@common/services/authorize-service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizeService,
    private configService: ConfigService,
  ) {}

  /**
   * Check if the user has permission to access the resource
   * @param context {ExecutionContext}
   * @returns{boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const permissions = this.reflector.getAllAndOverride('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permissions || req.user.isSuperUser) {
      return true;
    }
    const data = await this.authorizationService.checkAuthorization(
      req.user.roleId,
      this.configService.get('PLATFORM'),
      permissions.module,
      permissions.actions,
    );
    if (!data) {
      throw new UnauthorizedException();
    }
    //req.user['permissions'] = data;
    return data;
  }
}
