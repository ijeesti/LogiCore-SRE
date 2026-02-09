import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LogisticsService } from '../../../services/logistics.service';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateShipmentDto } from '../../../dtos/create-shipment.dto';
import { AddLegDto } from '../../../dtos/add-leg.dto';
import { ApiKeyGuard } from 'src/core/guards/api-key.guard';
import { MetricsController } from 'src/logistics/metrics/metrics.controller';

@ApiTags('Shipments')
@ApiSecurity('x-api-key')
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly service: LogisticsService) {}

  @Post('shipments')
  @ApiOperation({ summary: 'Create a new global shipment' })
  @ApiResponse({
    status: 201,
    description: 'The shipment has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async createAsync(@Body() dto: CreateShipmentDto) {
    var result = await this.service.createShipmentAsync(dto);
    MetricsController.recordShipmentCreated('success');
    return result;
  }

  @Post('shipments/:id/legs')
  @ApiOperation({ summary: 'Add a transit leg (child) to a shipment (parent)' })
  async addLegAsync(@Param('id') id: string, @Body() dto: AddLegDto) {
    return await this.service.addLegToShipmentAsync(id, dto);
  }

  @Get('shipments/secure')
  @ApiOperation({ summary: 'Add something here' })
  @UseGuards(ApiKeyGuard)
  async getAllAsync() {
    return await this.service.findAllAsync();
  }

  @Get('shipments')
  @ApiOperation({ summary: 'Add something here' })
  @UseGuards(ApiKeyGuard)
  async getAllGuardAsync() {
    return await this.service.findAllAsync();
  }

  @Get('shipments/:id')
  @ApiOperation({ summary: 'Add something here' })
  async getOneAsync(@Param('id') id: string) {
    return await this.service.getFullHistoryAsync({ shipmentId: id });
  }
}
