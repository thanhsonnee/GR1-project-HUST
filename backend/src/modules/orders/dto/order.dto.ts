import { IsNumber, IsString, IsOptional, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}

export class TrackingHistoryDto {
  @IsString()
  status!: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsDate()
  timestamp!: Date;
}

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsString()
  pickupAddress!: string;

  @IsString()
  deliveryAddress!: string;

  @IsNumber()
  weight!: number;

  @IsNumber()
  volume!: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  assignedVehicleId?: number;

  @IsOptional()
  @IsDate()
  estimatedDeliveryTime?: Date;

  @IsOptional()
  @IsDate()
  actualDeliveryTime?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackingHistoryDto)
  trackingHistory?: TrackingHistoryDto[];
} 