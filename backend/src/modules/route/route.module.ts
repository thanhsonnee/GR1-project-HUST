import { Module } from '@nestjs/common';
import { GeneticAlgorithmService } from './genetic-algorithm.service';
import { RouteController } from './route.controller';

@Module({
  controllers: [RouteController],
  providers: [GeneticAlgorithmService],
  exports: [GeneticAlgorithmService]
})
export class RouteModule {} 