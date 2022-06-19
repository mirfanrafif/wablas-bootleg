import { Inject, Injectable } from '@nestjs/common';
import { WHATSAPP_CLIENT } from 'src/core/whatsapp/whatsapp.module';
import { Client, Message, MessageTypes } from 'whatsapp-web.js';
import { SendMessageRequest } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(@Inject(WHATSAPP_CLIENT) private whatsappClient: Client) {
    this.whatsappClient.on('message', async (message: Message) => {
      if (message.type == MessageTypes.TEXT) {
        console.log('Message from ' + message.from + ': ' + message.body);
        const contact = await message.getContact();
        console.log(contact.pushname);
        const chat = await message.getChat();
        console.log(chat.id);
      }
    });
  }

  async sendMessage(request: SendMessageRequest) {
    return await this.whatsappClient.sendMessage(
      request.phoneNumber + '@c.us',
      request.message,
    );
  }
}
