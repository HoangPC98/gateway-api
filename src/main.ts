import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ILoggerService } from './common/logger/adapter';
import { GatewayInterceptor } from './common/interceptors/with-token.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = +process.env.APP_PORT;
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };

  const loggerService = app.get(ILoggerService);
  app.useLogger(loggerService);

  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  app.enableCors(options);
  app.useGlobalInterceptors(new GatewayInterceptor(loggerService));

  // app.useGlobalFilters(new AllExceptionFilter(loggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      // stopAtFirstError: true
    }),
  );

  await app.listen(appPort);
  console.log(`==> SERVER is start successfully on port: ${appPort}...`);
}
bootstrap();
