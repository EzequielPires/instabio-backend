import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth.module';
import { LinkModule } from './modules/link.module';
import { ProductModule } from './modules/product.module';
import { ProfileModule } from './modules/profile.module';
import { SocialModule } from './modules/social.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'term228687535',
      database: 'instabio',
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    LinkModule,
    ProductModule,
    ProfileModule,
    SocialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
