import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV); // 기동 시 환경 변수 출력
console.log('current working directory : ' + process.cwd());

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config], // 커스텀 설정 파일 설정
      cache: true, // 캐시하기
      expandVariables: true, // 확장 변수 옵션 추가
    }),
    WeatherModule,
  ], // 전역 모듈 설정 추가
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
