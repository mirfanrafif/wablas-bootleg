import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'message',
})
export class MessageEntity {
  @PrimaryColumn()
  messageId: string;

  @Column()
  message: string;

  @Column()
  phoneNumber: string;

  @Column()
  ack: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
