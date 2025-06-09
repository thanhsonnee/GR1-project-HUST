// backend/src/modules/route/route.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post('optimize')
  async optimizeRoute(@Body() locations: LocationDto[]) {
    return this.routeService.optimizeRoute(locations);
  }
}