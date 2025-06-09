// backend/src/modules/route/route.module.ts
import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}