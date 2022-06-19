import { Module } from '@nestjs/common';
import { MessagesRepositoryModule } from 'src/core/messages/messages.module';
import { WhatsappModule } from 'src/core/whatsapp/whatsapp.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  imports: [WhatsappModule, MessagesRepositoryModule],
  providers: [MessagesService],
})
export class MessagesModule {}
