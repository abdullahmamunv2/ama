import { Configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditModel, AuditSchema } from './model';
import { AuditRepository, IAuditRepositoryType } from './repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load : [Configuration]
    }),
    MongooseModule.forFeature(
      [
        { name: AuditModel.name, schema: AuditSchema }
      ]
    )
  ],
  controllers: [],
  providers: [
    {
      provide : IAuditRepositoryType,
      useClass : AuditRepository
    }
  ],
})
export class AuditModule {}
