import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UserModule } from './user.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            privateKey: 'YXNkY2RrZnVlYmFzamJkYXNsa2ZmZHNoZ3BvamFzZGZqaWhhb2RpamZpYWJzZGZpam5zYWRrbA==',
            signOptions: { expiresIn: '3600s' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [],
})
export class AuthModule { }