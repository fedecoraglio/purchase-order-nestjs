import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom, map, tap } from 'rxjs';

import { OrderResponse, PurchaseInfo, PurchaseOrder } from './types';
import { AxiosResponse } from 'axios';
@Injectable()
export class OrderService {
  constructor(private readonly httpService: HttpService) {}

  async getNumberOfOrderPurchase(): Promise<PurchaseInfo> {
    const order = await this.getOrder();

    return {
      amountOfPurchases: order.purchaseOrders.length,
    };
  }

  private sortByCost(a: PurchaseOrder, b: PurchaseOrder): number {
    if (b.cost > a.cost) {
      return 1;
    } else if (b.cost < a.cost) {
      return -1;
    } else {
      return 0;
    }
  }

  async getPurchaseOrderCost(): Promise<PurchaseOrder[]> {
    const resp = await this.getOrder();
    return resp.purchaseOrders
      .sort((order1, order2) => {
        const vendor1 = order1.id.split('-')[0];
        const vendor2 = order2.id.split('-')[0];
        if (vendor1 > vendor2) {
          return 1;
        } else if (vendor2 > vendor1) {
          return -1;
        } else {
          return 0;
        }
        return vendor1 > vendor2 ? 1 : -1;
      })
      .sort((order1, order2) => {
        if (order1.cost > order2.cost) {
          return 1;
        } else if (order1.cost > order2.cost) {
          return -1;
        } else {
          return 0;
        }
      });
  }

  private async getOrder(): Promise<OrderResponse> {
    const order = await lastValueFrom(this.callApiOrder());
    return order.data;
  }

  private callApiOrder(): Observable<AxiosResponse<OrderResponse>> {
    return this.httpService.get<OrderResponse>(
      'https://mf-public-demo-files.s3.amazonaws.com/pos.json',
    );
  }
}
