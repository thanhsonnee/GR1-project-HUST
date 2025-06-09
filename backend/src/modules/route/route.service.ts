// backend/src/modules/route/route.service.ts
import { Injectable } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class RouteService {
  async optimizeRoute(locations: LocationDto[]) {
    // Logic tối ưu tuyến đường sẽ được implement sau
    return {
      optimizedRoute: locations,
      totalDistance: 0,
      estimatedTime: 0
    };
  }
}