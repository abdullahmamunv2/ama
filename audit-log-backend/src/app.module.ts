import { Module } from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config';
import {MongooseModule}  from '@nestjs/mongoose'
import { AuthModule } from './modules/auth/auth.module';
import { AuditModule } from './modules/audit/audit.module';
import {Configuration} from './config/';

@Module({
  imports: [
    ConfigModule.forRoot({
        load : [Configuration]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('DATABASE'),
      inject: [ConfigService],
    }),
    AuthModule,
    AuditModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
