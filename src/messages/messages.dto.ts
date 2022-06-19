import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SendMessageRequest {
  @IsNumberString()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
