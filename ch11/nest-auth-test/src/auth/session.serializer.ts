import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { userInfo } from 'os';
import { UserService } from 'src/user/user.service';

@Injectable()
// PassportSerializer 상속받음
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    // userService를 주입받음
    super();
  }

  // 세션에 정보를 저장할 때 사용
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email); // 세션에 저장할 정보
  }

  // 세션에서 정보를 꺼내올 때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;

    // 유저 정보가 있다면 유저 정보 반환
    done(null, userInfo);
  }
}
