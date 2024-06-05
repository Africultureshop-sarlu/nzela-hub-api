import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeMessage(): any {
    return {
      message: 'Welcome to the Nzela Hub API',
      version: '0.0.1',
      team: 'Developpé par hobedbayekula@gmail.com',
    };
  }
}
