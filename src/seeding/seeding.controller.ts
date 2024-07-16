/* eslint-disable prettier/prettier */
import {
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { Response } from 'express';
// import { CreateSeedingDto } from './dto/create-seeding.dto';

@Controller('api/seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  async create(
    @Res() res: Response,
  ): Promise<any> {
    try {
      const seed = await this.seedingService.create();
      return res.status(HttpStatus.OK).json({
        "message": "Successfully created",
        "data": seed
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        "message": "Error creating seed",
        "data": error,
      });
    }
  }

  // @Get()
  // findAll() {
  //   return this.seedingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.seedingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSeedingDto: UpdateSeedingDto) {
  //   return this.seedingService.update(+id, updateSeedingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.seedingService.remove(+id);
  // }
}
