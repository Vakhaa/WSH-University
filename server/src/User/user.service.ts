import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Infrastructure/schemas/user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  
  constructor( 
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
  private configService: ConfigService
  ) {}
  async create(userDto: UserDto): Promise<User> {
    const createProfile = await this.userModel.create(userDto);
    return createProfile;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedProfile = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProfile;
  }
}
