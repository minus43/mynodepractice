import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'; // 패스포트를 사용하는 AuthGuard 임포트

@Injectable()
export class LoginGuard implements CanActivate {
  // CanActivate 인터페이스 구현
  constructor(private authService: AuthService) {} // AuthService를 주입받음

  // CanActivate 인터페이스의 메서드
  async canActivate(context: any): Promise<boolean> {
    // 컨텍스트에서 리퀘스트 정보를 가져옴
    const request = context.switchToHttp().getRequest();

    // 쿠키가 있으면 인증된 것
    if (request.cookies['login']) {
      return true;
    }

    // 쿠키가 없으면 request의 body 정보 확인
    // if (!request.body.email || !request.body.password) {
    //   return false;
    // }

    const { email, password } = request.body || {};

    if (!email || !password) {
      return false;
    }

    // 인증 로직은 기존의 authService.validateUser 사용
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    // 유저 정보가 없으면 false 반환
    if (!user) {
      return false;
    }
    // 있으면 request에 user 정보를 추가하고 true 반환
    request.user = user;

    return true;
  }
}

@Injectable()
// AuthGuard 상속
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // 로컬 스트래티지 실행
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // 세션 저장
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인
  }
}
