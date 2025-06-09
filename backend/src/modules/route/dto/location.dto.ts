import { IsString, IsNumber } from 'class-validator';

export class LocationDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  warehouseAddress: string;

  @IsNumber()
  orderWeight: number;
}