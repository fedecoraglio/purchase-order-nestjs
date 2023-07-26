import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./order.service";
import { PurchaseInfo, PurchaseOrder } from "./types";

@Controller('orders')
export class OrderController {

    constructor(private readonly orderService: OrderService) {

    }

    @Get('/costs')
    async getPurchasesByCost(): Promise<PurchaseOrder[]> {
        return await this.orderService.getPurchaseOrderCost();
    }

    @Get('/info')
    async getNumberOfPurchases(): Promise<PurchaseInfo> {
        return await this.orderService.getNumberOfOrderPurchase();
    }

}
