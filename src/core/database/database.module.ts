import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MessageEntity } from '../messages/messages.model';

export const DATA_SOURCE = 'typeorm_datasource';

@Module({
  providers: [
    {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const database = new DataSource({
          database: 'wablas_bootleg',
          host: 'localhost',
          port: 3306,
          username: 'admin',
          password: 'Aremania87',
          type: 'mysql',
          entities: [MessageEntity],
          synchronize: true,
        });
        return database.initialize();
      },
    },
  ],
  exports: [DATA_SOURCE],
})
export class DatabaseModule {}
