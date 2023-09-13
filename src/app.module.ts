import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MetricsService } from './metrics/metrics.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MetricsService],
})
export class AppModule {}
