import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Shipment extends Document {
  @Exclude() // This hides __v from the JSON output
  __v: number;

  @Prop({ required: true, unique: true })
  trackingId: string;

  @Prop({ default: 'CREATED' })
  @Transform(({ value }) => value.toISOString().split('T')[0])
  status: string;

  // This is the "Child" collection reference (Foreign Key array)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TransitLeg' }] })
  legs: Types.ObjectId[];
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
