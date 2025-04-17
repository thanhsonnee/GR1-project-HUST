import { Controller, Post, Body } from '@nestjs/common';
import { GeneticAlgorithmService } from './genetic-algorithm.service';
import { Location } from './genetic-algorithm.service';

@Controller('route')
export class RouteController {
  constructor(private readonly gaService: GeneticAlgorithmService) {}

  @Post('optimize')
  async optimizeRoute(@Body() locations: Location[]): Promise<Location[]> {
    return this.gaService.findOptimalRoute(locations);
  }
} 