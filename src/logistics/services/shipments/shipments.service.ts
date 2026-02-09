import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../../entities/shipment.schema';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel('Shipment') private readonly shipmentModel: Model<Shipment>,
  ) {}

  async getTotalCountAsync(): Promise<number> {
    return await this.shipmentModel.countDocuments().exec();
  }

  async getActiveCountAsync(): Promise<number> {
    return await this.shipmentModel
      .countDocuments({
        status: { $ne: 'DELIVERED' },
      })
      .exec();
  }
}
