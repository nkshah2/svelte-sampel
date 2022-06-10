import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;
  @IsNotEmpty() password: string;
}

export class CreateUserDto {
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;
  @MinLength(8) username: string;
  password: string;
}
export class CreateUserGoogleDto {
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;
  id: string;
}

export class UserInfoDto {
  uid: string;
  email: string;
}
