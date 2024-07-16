/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
} from '@nestjs/common';
import { SeedingService } from './seeding.service';
// import { CreateSeedingDto } from './dto/create-seeding.dto';

@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  create() {
    return this.seedingService.create();
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
