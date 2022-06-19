import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './core/whatsapp/whatsapp.module';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { DatabaseModule } from './core/database/database.module';
import { MessagesRepositoryModule } from './core/messages/messages.module';

@Module({
  imports: [
    WhatsappModule,
    MessagesModule,
    DatabaseModule,
    MessagesRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
