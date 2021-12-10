import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  /**
   * Check if the user has permission to access the resource
   * @param context {ExecutionContext}
   * @returns{boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const secretKey = req.headers['secret-key'];
    if (!secretKey) {
      throw new UnauthorizedException();
    }
    return secretKey === this.configService.get('API_SECRET_KEY');
  }
}
