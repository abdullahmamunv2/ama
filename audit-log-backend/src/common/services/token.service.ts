import { HttpService, Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenGeneratorType, ITokenGenerator, JwtToken } from '@modules/auth/adapter/api/token';

@Injectable()
export class TokenService {
  constructor(
    @Inject(ITokenGeneratorType)
        private tokenGenerator : ITokenGenerator<JwtToken>
  ) {
    
  }

  /**
   * Velidate JWT Token
   * @param token JWT token
   * @param type {TokenType} "access"
   * @returns decrypted payload from JWT
   */
  public async validate(token: string) {
    try {
      let user = await this.tokenGenerator.verify(token);
      return user;
    } catch (e) {
    }
  }
}
