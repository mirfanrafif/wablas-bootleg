import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendMessageRequest } from './messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  sendMessage(@Body() body: SendMessageRequest) {
    return this.service.sendMessage(body);
  }

  @Get()
  getAllMessage() {
    return this.service.getAllMessages();
  }
}
