import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { User } from 'src/Infrastructure/Schemas/user.schema';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) : Promise<User> {
    return this.userService.findOne(id);
  };

  @Get()
  async getAllProfiles() : Promise<User[]> {
    return this.userService.findAll();
  };
  
  @Post()
  async createProfile(): Promise<User>{
    return this.userService.create( new UserDto("name code" + (Date.now()%10), "https://i1.sndcdn.com/artworks-lMByCSU7UjUew4Tf-yLe2aA-t500x500.jpg", "ex@gmail.com"));
  };
  
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return this.userService.delete(id);
  };
}
