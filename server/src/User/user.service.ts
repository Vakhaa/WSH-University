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
    return this.userModel.create(userDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    const  isExists = this.userModel.exists({ email: email });
    if(!isExists) return null;
    return this.userModel.findOne({ email: email }).exec();
  }

  async delete(id: string) {
    const deletedProfile = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProfile;
  }
}
