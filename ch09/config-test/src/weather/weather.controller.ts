import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  async getWeather() {
    // 환경 변숫값 가져오기
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    // 내부 함수인 callWeatherAPI()를 호출
    return await this.callWeatherApi(apiUrl, apiKey);
  }

  async callWeatherApi(apiUrl: string, apiKey: string): Promise<string> {
    console.log('날씨 정보 가져오는 중...');
    console.log(apiUrl);
    const url = `${apiUrl}${apiKey}`;
    const result = await axios.get(url);
    const weather = result.data;
    const mains = weather.weather.map((el) => el.description);
    return mains.join(' and ');
  }
}
