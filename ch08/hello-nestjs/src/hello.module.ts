import { Module } from '@nestjs/common';
import { HelloCotroller } from './hello.controller';

@Module({
  // 모듈 데코레이터
  controllers: [HelloCotroller],
})
export class HelloModule {}
