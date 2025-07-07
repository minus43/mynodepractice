import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
// PassportStrattegy(Strategy) 상속
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    // 생성자

    // 부모 클래스의 생성자를 호출
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // 시크릿
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // 콜백 URL
      scope: ['email', 'profile'], // 스코프
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log('accessToken:' + accessToken);
    console.log('refreshToken:' + refreshToken);

    const providerId = id;
    const email = emails[0].value;

    console.log('providerId:' + providerId);
    console.log('email:' + email);
    console.log('familyName:' + name.familyName);
    console.log('givenName:' + name.givenName);

    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name.givenName,
      providerId,
    );

    // 유저 정보 반환
    return user;
  }
}
