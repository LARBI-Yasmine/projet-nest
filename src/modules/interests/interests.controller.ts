import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InterestsService } from './Interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateInterestDto } from './dto/update-interest.dto';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
   @UseGuards(AuthGuard('jwt'))
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @Get()
    findAll() {
    return this.interestsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.interestsService.findOne(+id);
  }

  

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.interestsService.remove(+id);
  }
}