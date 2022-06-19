import { Module } from '@nestjs/common';
import { WhatsappModule } from 'src/core/whatsapp/whatsapp.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  imports: [WhatsappModule],
  providers: [MessagesService],
})
export class MessagesModule {}
