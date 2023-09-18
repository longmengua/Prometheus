import { Injectable } from '@nestjs/common';
import { Gauge, MetricObjectWithValues, MetricValue, register } from 'prom-client';
import { ENV } from 'src/constant';
import { Util } from 'src/util';
import axios from 'axios'

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
    this.cryptoPriceStatus.set({ exchange: 'kraken', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'okex', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'huobi', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'binance', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'bitfinex', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'coinmarketcap', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());
    this.cryptoPriceStatus.set({ exchange: 'coinGecko', app: 'node_crypto_crawler' }, Util.getRandomZeroOrOne());

    return true
  }

  getCryptoPriceStatus(): Promise<MetricObjectWithValues<MetricValue<string>>[]> {
    return register.getMetricsAsJSON()
  }

  async getMetricsFromGrafana() {
    // const data = {}
    // const config: AxiosRequestConfig = {}
    // const res = await axios.post('https://prometheus-prod-13-prod-us-east-0.grafana.net/api/prom', data, config)
    // console.log(res)
    return 'in development'
  }

  async sendMetricsToGrafana(): Promise<boolean> {
    const body = `grafana_demo,label=grafana_demo_label metric=${Util.getRandomInt(1, 100)}`;
    console.log(body)
    const response = await axios.post(`${ENV.GRAFANA_WRITE}`, body, {
      headers: {
          'Authorization': `Bearer ${ENV.USER_ID}:${ENV.API_KEY}`, 
          'Content-Type': 'text/plain',
      },
    }).catch(err => err?.response);

   return response?.status == 204
  }
}
