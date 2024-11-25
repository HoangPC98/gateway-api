import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { MESSSAGE_SERVICE, MESSSAGE_SERVICE_QUEUE, rabbitmqUri } from '.';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QueueService {

  public readonly MESSSAGE_SERVICE_QUEUE = 'MESSSAGE_SERVICE_QUEUE';
  public readonly MESSSAGE_SERVICE = 'MESSSAGE_SERVICE_NAME';
  constructor(
    private readonly configService: ConfigService,
    @Inject(MESSSAGE_SERVICE_QUEUE) protected messageProducer: ClientProxy
  ) { }

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUri()],
        queue: MESSSAGE_SERVICE_QUEUE,
        noAck,
        persistent: true,
      },
    };
  }

  // ack(context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMessage = context.getMessage();
  //   channel.ack(originalMessage);
  // }

  async publishMsg(routingKey: string, data: any) {
    try {
      console.log(`==> PublishMsgTo ${MESSSAGE_SERVICE_QUEUE}: `, routingKey, data)
      const resp = this.messageProducer.send(routingKey, data);
      return resp;
    } catch (error) {
      console.log('=> Error: ', error)
    }
  }
}