import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule, DATA_SOURCE } from '../database/database.module';
import { MessageEntity } from './messages.model';

export const MESSAGES_REPOSITORY = 'messages_repository';
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: MESSAGES_REPOSITORY,
      inject: [DATA_SOURCE],
      useFactory: (ds: DataSource) => ds.getRepository(MessageEntity),
    },
  ],
  exports: [MESSAGES_REPOSITORY],
})
export class MessagesRepositoryModule {}
