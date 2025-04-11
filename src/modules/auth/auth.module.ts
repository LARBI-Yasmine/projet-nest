import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { BlacklistService } from 'src/modules/auth/blackList.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Global()
@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN') ?? '3600'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BlacklistService, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}