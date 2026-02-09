import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddLegDto {
  @IsString()
  @ApiProperty({ example: 'UUS Keskus' })
  location: string;

  @IsString()
  @ApiProperty({ example: 'DHL' })
  carrierName: string;
}
