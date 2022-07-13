import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RolesGuard } from './auth/roles.guard';
import { AuthModule } from './modules/auth.module';
import { LinkModule } from './modules/link.module';
import { PlanModule } from './modules/plan.module';
import { ProductModule } from './modules/product.module';
import { ProfileModule } from './modules/profile.module';
import { SocialModule } from './modules/social.module';
import { StorageModule } from './modules/storage.module';
import { UserModule } from './modules/user.module';
import { UserTokensModule } from './modules/user_tokens.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-05.cleardb.net',
      port: 3306,
      username: 'bbfd745ea95773',
      password: 'd57a9f9a',
      database: 'heroku_81242de3d0622a9',
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
    SocialModule,
    StorageModule,
    UserTokensModule,
    PlanModule
  ],
  controllers: [],
  providers: [RolesGuard],
})
export class AppModule { }
