import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsController } from './logistics/controllers/v1/logistics/logistics.controller';
import { LogisticsService } from './logistics/services/logistics.service';
import { Shipment, ShipmentSchema } from './logistics/entities/shipment.schema';
import {
  TransitLeg,
  TransitLegSchema,
} from './logistics/entities/transit-leg.schema';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './core/guards/api-key.guard';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './logistics/metrics/metrics.controller';
import { BusinessMetricsController } from './logistics/metrics/business-metrics.controller';
import { Registry } from 'prom-client';
import { ShipmentsService } from './logistics/services/shipments/shipments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrometheusModule.register({
      global: true,
      path: 'metrics',
      defaultMetrics: {
        enabled: false,
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    // CRITICAL: You must register the models so the Service can inject them
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentSchema },
      { name: TransitLeg.name, schema: TransitLegSchema },
    ]),
  ],
  controllers: [
    LogisticsController,
    MetricsController,
    BusinessMetricsController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: 'MY_CUSTOM_REGISTRY',
      useValue: new Registry(),
    },
    LogisticsService,
    ShipmentsService,
  ],
})
export class AppModule {}
