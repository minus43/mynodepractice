import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  // 패스포트 모듈 추가
  providers: [AuthService, LocalStrategy, SessionSerializer],
  // 프로바이더 설정 추가
  controllers: [AuthController],
})
export class AuthModule {}
