import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload') // POST 메서드로 localhost:3000/file-upload 호출 시 동장
  @UseInterceptors(FileInterceptor('file', multerOption)) // 파일 인터셉터
  // 인터셉터에서 준 파일을 받음
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    // console.log(file.buffer.toString('utf-8')); // 텍스트 파일 내용 출력
    console.log(file);
    // return 'File Upload';
    return `${file.originalname} File Upload check http://localhost:3000/uploads/${file.filename}`; // 업로드한 파일명과 경로 반환
  }
}
