import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty({ example: 'SHIP-999', description: 'Unique tracking ID' })
  @IsString()
  @IsNotEmpty()
  trackingId: string;
}
