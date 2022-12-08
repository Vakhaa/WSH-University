import { Headers, Body, Controller, Get, Post, Delete, Param, Res } from '@nestjs/common';
import { User } from 'src/Infrastructure/Schemas/user.schema';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfileByEmail(@Headers("email") email: string, @Res() res: Response) {

    if(email.length == 0) res.sendStatus(400);
    
    const user = await this.userService.findOneByEmail(email);
    if(user == null) res.sendStatus(204);
    
    res.send(user);
  };  

  @Get()
  async getAllProfiles() : Promise<User[]> {
    return this.userService.findAll();
  };
  
  @Post()
  async createProfile(@Body() user: UserDto): Promise<User>{
    return this.userService.create(user);
  };
  
  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return this.userService.delete(id);
  };
}
