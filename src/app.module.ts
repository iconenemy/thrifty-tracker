import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('POSTGRES_DB_TYPE'),
          host: configService.get('POSTGRES_DB_HOST'),
          port: configService.get('POSTGRES_DB_PORT'),
          username: configService.get('POSTGRES_DB_USER'),
          password: configService.get('POSTGRES_DB_PASSWORD'),
          database: configService.get('POSTGRES_DB_NAME'),
          entities: [],
          synchronize: configService.get('NODE_ENV') === 'DEV',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class AppModule {}
