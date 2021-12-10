import { Module } from '@nestjs/common';
import { AuthController, TokenController } from './adapter/controller';
import { OTPLoginUseCaseType, OTPLoginVerifyUseCaseType, OTPLoginUseCase, OTPLoginVerifyUseCase } from "@modules/auth/core/usecase";
import { IChallengeRepositoryType, IUserRepositoryType } from './core/repository';
import { ChallengeRepository, UserRepository, UserModel, UserSchema, ChallengeModel, ChallengeSchema, InMemoryUserRepository } from './infrastructure/persistance/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { OTPLoginPresenterType, OTPLoginPresenter, OTPLoginVerifyPresenterType, OTPLoginVerifyPresenter } from './adapter/presenter';
import { ITokenGeneratorType } from './adapter/api/token';
import { JwtTokenGenerator } from './adapter/api/token/JwtTokenGenerator';
import { ConfigModule } from '@nestjs/config';
import {Configuration} from '../../config/';
import {IVerifyPermissionType,VerifyPermission} from './adapter/api/permission'

@Module({
  imports: [
    ConfigModule.forRoot({
      load : [Configuration]
    }),
    CqrsModule,
    MongooseModule.forFeature(
      [
        { name: UserModel.name, schema: UserSchema },
        { name: ChallengeModel.name,schema : ChallengeSchema}
      ]
    )
  ],
  controllers: [AuthController,TokenController],
  providers: [
    {
      provide : IVerifyPermissionType,
      useClass : VerifyPermission
    },
    {
      provide : ITokenGeneratorType,
      useClass : JwtTokenGenerator
    },
    {
      provide : IUserRepositoryType,
      useClass : InMemoryUserRepository
    },
    {
      provide : IChallengeRepositoryType,
      useClass : ChallengeRepository
    },
    {
      provide  : OTPLoginUseCaseType,
      useClass : OTPLoginUseCase
    },
    {
      provide  : OTPLoginVerifyUseCaseType,
      useClass : OTPLoginVerifyUseCase
    },
    {
      provide : OTPLoginPresenterType,
      useClass : OTPLoginPresenter
    },
    {
      provide : OTPLoginVerifyPresenterType,
      useClass : OTPLoginVerifyPresenter
    }
  ],
})
export class AuthModule {}
