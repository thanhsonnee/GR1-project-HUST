// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AcoModule } from './algorithms/aco.module';

@Module({
  imports: [AcoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}