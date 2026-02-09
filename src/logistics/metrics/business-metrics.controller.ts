import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ShipmentsService } from '../services/shipments/shipments.service';

@ApiTags('Business Analytics')
@Controller('metrics')
export class BusinessMetricsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @ApiOperation({ summary: 'Customized Business KPIs (JSON)' })
  @Get('business')
  async getBusinessMetrics() {
    const total = await this.shipmentsService.getTotalCountAsync();
    const active = await this.shipmentsService.getActiveCountAsync();

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        totalShipments: total,
        activeDeliveries: active,
        systemHealth: 'Optimal',
      },
    };
  }
}
