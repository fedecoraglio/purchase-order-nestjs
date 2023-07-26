import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    this.httpService.axiosRef
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((data) => console.log('data', data.data[0]));

    const result = await lastValueFrom(
      this.httpService
        .get('https://jsonplaceholder.typicode.com/todos')

    )

    console.log("result", result)

    return 'Hello World!';
  }
}
