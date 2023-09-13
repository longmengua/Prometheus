import { Injectable } from '@nestjs/common';
import { Gauge, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private cryptoPriceStatus: Gauge<string>;

  constructor() {
    // 先註冊
    const cryptoPriceStatus = register.getSingleMetric('crypto_price_status')
    if (cryptoPriceStatus) {
      this.cryptoPriceStatus = cryptoPriceStatus as Gauge
      return
    }
    this.cryptoPriceStatus = new Gauge({
      name: 'crypto_price_status',
      help: 'crypto_price_status_help',
      labelNames: ['exchange', 'app'],
    });
    register.registerMetric(this.cryptoPriceStatus);
  }

  // return true while update successfully
  setCryptoPriceStatus(): boolean {
    if (!this.cryptoPriceStatus) return false
    
    // Initialize the metric with default values
    this.cryptoPriceStatus.set({ exchange: 'kraken', app: 'node_crypto_crawler' }, 0);
    this.cryptoPriceStatus.set({ exchange: 'okex', app: 'node_crypto_crawler' }, 1);
    this.cryptoPriceStatus.set({ exchange: 'huobi', app: 'node_crypto_crawler' }, 0);
    this.cryptoPriceStatus.set({ exchange: 'binance', app: 'node_crypto_crawler' }, 0);
    this.cryptoPriceStatus.set({ exchange: 'bitfinex', app: 'node_crypto_crawler' }, 0);
    this.cryptoPriceStatus.set({ exchange: 'coinmarketcap', app: 'node_crypto_crawler' }, 0);
    this.cryptoPriceStatus.set({ exchange: 'coinGecko', app: 'node_crypto_crawler' }, 1);

    return true
  }

  getCryptoPriceStatus() {
    return this.cryptoPriceStatus;
  }
}
