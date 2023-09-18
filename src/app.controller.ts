import { Controller, Get, Post, Res } from '@nestjs/common';
import { version } from "../package.json";
import { MetricsService } from './metrics/metrics.service';
@Controller()
export class AppController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  health() {
    return {
      status: 'ok',
      version: version
    }
  }

  @Post('metrics')
  async updateMetrics() {
    const bool = this.metricsService.setCryptoPriceStatus()
    return {
      status: bool ? 'ok' : 'failed'
    }
  }

  @Get('metrics')
  async getMetrics() {
    return this.metricsService.getCryptoPriceStatus()
  }

  @Get('grafana')
  async getDataFromGrafana() {
    return this.metricsService.getMetricsFromGrafana()
  }

  @Post('grafana')
  async sendDataToGrafana() {
    const bool = await this.metricsService.sendMetricsToGrafana()
    return {
      status: bool ? 'ok' : 'failed'
    }
  }
}
