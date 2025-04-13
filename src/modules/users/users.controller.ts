import { Controller, Get, UseGuards, Body, Param, Delete, Request, UsePipes, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from './dto/user-role.type';
import { InterestDto } from 'src//modules/interests/dto/interest.dto';
import { User as UserDecorator } from '../users/user.decorator'; 

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req): Promise<User | null> {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }


  // @Post('interests')
  // @UseGuards(AuthGuard('jwt'))
  // async addInterestsToUser(@Body() addInterestsDto: AddInterestsDto) {
  //   return this.usersService.addInterestsToUser(addInterestsDto.userId, addInterestsDto.interestNames);
  // }

  @Post('interests')
  @UseGuards(AuthGuard('jwt'))
  async addInterestsToUser(@Body() interestDto: InterestDto) {
    return this.usersService.addInterestsToUser(interestDto.userId, interestDto.interestNames);
  }

  @Get('interests')
  @UseGuards(AuthGuard('jwt'))
  async getUserInterests(@UserDecorator()  user: User) {
    return this.usersService.getUserInterests(user.id);
   }
}