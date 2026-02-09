import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../entities/shipment.schema';
import { TransitLeg } from '../entities/transit-leg.schema';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<Shipment>,
    @InjectModel(TransitLeg.name) private legModel: Model<TransitLeg>,
  ) {}

  async createShipmentAsync(dto: any): Promise<Shipment> {
    const newShipment = new this.shipmentModel(dto);
    return await newShipment.save();
  }

  async addLegToShipmentAsync(
    shipmentId: string,
    legDto: any,
  ): Promise<Shipment> {
    const newLeg = await new this.legModel({
      ...legDto,
      status: 'PLANNED',
    }).save();
    const updatedShipment = await this.shipmentModel
      .findByIdAndUpdate(
        shipmentId,
        { $push: { legs: newLeg._id } },
        { new: true },
      )
      .populate('legs') // This is the .Include() equivalent
      .exec();

    if (!updatedShipment) throw new NotFoundException('Shipment not found');
    return updatedShipment;
  }

  async findAllAsync(): Promise<Shipment[]> {
    return await this.shipmentModel.find().populate('legs').exec();
  }

  async getFullHistoryAsync({
    shipmentId,
  }: {
    shipmentId: string;
  }): Promise<Shipment> {
    const shipment = await this.shipmentModel
      .findById(shipmentId)
      .populate('legs') // Eager loading
      .exec();

    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${shipmentId} not found`);
    }

    return shipment;
  }
}
