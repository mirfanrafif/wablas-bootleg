import { Module } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

export const WHATSAPP_CLIENT = 'whatsapp_client';

@Module({
  imports: [],
  providers: [
    {
      provide: WHATSAPP_CLIENT,
      useFactory: () => {
        const client = new Client({
          authStrategy: new LocalAuth(),
        });

        client.once('qr', async (qr: string) => {
          console.log('qr code diterima: ');
          qrcode.generate(qr, {
            small: true,
          });
        });

        client.on('ready', () => {
          console.log('ready');
        });

        client.initialize();
      },
    },
  ],
})
export class WhatsappModule {}
