export interface OrderResponse {
  name: string;
  purchaseOrders: PurchaseOrder[];
}

export interface PurchaseOrder {
  id: string;
  cost: number;
}

export type PurchaseInfo = Readonly<{
    amountOfPurchases: number
}>
