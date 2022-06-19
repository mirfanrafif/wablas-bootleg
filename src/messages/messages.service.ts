import { Inject, Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/core/messages/messages.model';
import { MESSAGES_REPOSITORY } from 'src/core/messages/messages.module';
import { WHATSAPP_CLIENT } from 'src/core/whatsapp/whatsapp.module';
import { Repository } from 'typeorm';
import { Client, Message, MessageAck, MessageTypes } from 'whatsapp-web.js';
import { SendMessageRequest } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(WHATSAPP_CLIENT) private whatsappClient: Client,
    @Inject(MESSAGES_REPOSITORY)
    private messageRespository: Repository<MessageEntity>,
  ) {
    this.whatsappClient.on('message', (message) => {
      this.handleIncomingMessage(message);
    });

    this.whatsappClient.on('message_ack', (message, ack) => {
      this.updateMessageStatus(message, ack);
    });
  }

  async handleIncomingMessage(message: Message) {
    if (message.type == MessageTypes.TEXT) {
      await this.saveMessage(message);
    }
  }

  async updateMessageStatus(message: Message, ack: MessageAck) {
    const existingMessage = await this.messageRespository.findOne({
      where: {
        messageId: message.id.id,
      },
    });

    if (existingMessage !== null) {
      existingMessage.ack = this.getMessageAck(ack);
      await this.messageRespository.save(existingMessage);
    }
  }

  getMessageAck = (messageAck: MessageAck) => {
    switch (messageAck) {
      case -1:
        return 'error';
      case 0:
        return 'pending';
      case 1:
        return 'sent';
      case 2:
        return 'received';
      case 3:
        return 'read';
      case 4:
        return 'played';
      default:
        return 'pending';
    }
  };

  async sendMessage(request: SendMessageRequest) {
    const message = await this.whatsappClient.sendMessage(
      request.phoneNumber + '@c.us',
      request.message,
    );

    await this.saveMessage(message);
  }

  async saveMessage(message: Message) {
    const findMessage = await this.messageRespository.findOne({
      where: {
        messageId: message.id.id,
      },
    });

    const newMessage =
      findMessage !== null
        ? findMessage
        : await this.messageRespository.save({
            message: message.body,
            ack: this.getMessageAck(message.ack),
            messageId: message.id.id,
            phoneNumber: (await message.getContact()).number,
          });

    console.log(newMessage.phoneNumber + ': ' + newMessage.message);

    return newMessage;
  }

  async getAllMessages() {
    return this.messageRespository.find();
  }
}
