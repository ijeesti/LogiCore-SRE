import { Controller, Get, Res } from '@nestjs/common';
import { Counter, Gauge, register } from 'prom-client';
import type { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const shipmentsCreatedCounter = new Counter({
  name: 'logistics_core_shipments_total', // Use underscores for names
  help: 'Total number of shipments created in the system',
  labelNames: ['status', 'region'],
});

// 2. Define a Gauge for real-time system state
const activeDeliveriesGauge = new Gauge({
  name: 'logistics_active_deliveries',
  help: 'Current number of active deliveries in transit',
});

@ApiTags('Application Analytics')
@Controller('metrics')
export class MetricsController {
  static recordShipmentCreated(status: 'success' | 'failed') {
    shipmentsCreatedCounter.inc({ status });
  }

  static updateActiveDeliveries(count: number) {
    activeDeliveriesGauge.set(count);
  }

  @ApiOperation({ summary: 'Standard Prometheus Scrape (Plain Text)' })
  @Get()
  async getPrometheusMetrics() {
    return await register.metrics();
  }

  @ApiOperation({
    summary: 'Export application metrics for Prometheus scraping',
  })
  @Get('text')
  async getMetricsAsync(@Res() res: Response) {
    const metrics = await register.metrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
