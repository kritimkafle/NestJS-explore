import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/error.handler';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * to apply Logger globally
   * 
   * const app = await NestFactory.create(AppModule, {
   *   bufferLogs: true,
   * });
   * 
   * app.useLogger(app.get(MyLoggerService));
   */

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
