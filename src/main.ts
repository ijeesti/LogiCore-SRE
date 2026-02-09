import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { MongoExceptionFilter } from './core/filters/mongo-exception/mongo-exception.filter';
import { setupSwagger } from './core/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips non-DTO properties
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 2. Global Serialization (Cleans up __v and handles @Exclude)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 3. Global Response Wrapping (Our custom interceptor from above)
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new MongoExceptionFilter());
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
