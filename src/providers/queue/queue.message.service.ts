import { Injectable } from "@nestjs/common";
import { Channel, Connection } from "amqplib";
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { MESSSAGE_SERVICE_QUEUE, QUEUE_SEND_SMS, rabbitmqUri } from ".";
@Injectable()
export class QueueMessageService {
  public rmqChannel: ChannelWrapper;

  constructor(){
    this.initConnection();
  }

  async initConnection() {
    const connection = amqp.connect(rabbitmqUri());
    this.rmqChannel = connection.createChannel({
      setup: (channel: Channel) => {
        channel.assertExchange('1234', 'direct', {
          durable: false
        });
      },
    });
    return this.rmqChannel.assertQueue('', { durable: true });
  }

  pushlishMsgJson(queue: string, msg: any, rkey?: any) {
    // this.rmqChannel.sendToQueue(
    //   queue,
    //   Buffer.from(JSON.stringify({ msg })),
    //   { persistent: true }
    // )
    this.rmqChannel.publish('1234', 'hoangpc', Buffer.from(JSON.stringify({ msg })))
  }
}