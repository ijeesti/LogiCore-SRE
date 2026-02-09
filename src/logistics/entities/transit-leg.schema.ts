import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TransitLeg extends Document {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: ['PLANNED', 'IN_TRANSIT', 'ARRIVED'] })
  status: string;

  @Prop()
  carrierName: string;
}

export const TransitLegSchema = SchemaFactory.createForClass(TransitLeg);
