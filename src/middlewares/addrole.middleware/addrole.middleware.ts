import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AddroleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    
    res.status(HttpStatus.OK).json({
      message : 'Add role',
      data : req.body, 
    });
    next();
  }
}
