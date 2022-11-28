export class UserDto {
    readonly name: string;
    readonly photo: string;
    readonly email: string;;

    constructor(name : string, photo: string, email:string){
      this.name = name;
      this.photo = photo;
      this.email = email;
    }
  }