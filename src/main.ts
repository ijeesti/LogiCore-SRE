import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { MongoExceptionFilter } from './core/filters/mongo-exception/mongo-exception.filter';
import { setupSwagger } from './core/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new DocumentBuilder()
  //   .setTitle('Logistics API')
  //   .setDescription('The Logistics Parent-Child Showcase API')
  //   .setVersion('1.0')
  //   .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
  //   .addSecurityRequirements('x-api-key')
  //   .addTag('logistics')
  //   .build();

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

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
