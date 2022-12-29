import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
   @ApiProperty()
   readonly fullName: string;
   
   @ApiProperty()
   readonly photo: string;
   
   @ApiProperty()
   readonly email: string;

   constructor(fullName : string, photo: string, email:string){
      this.fullName = fullName;
      this.photo = photo;
      this.email = email;
   }
}