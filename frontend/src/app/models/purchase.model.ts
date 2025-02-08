export interface Items {
  productId: number;
  quantity: number;
  total: number;
  active: boolean;
}

export interface Purchase {
  purchaseId: number;
  clientId: string;
  date: Date;
  paymentMethod: string;
  comment: string;
  state: string;
  items: Array<Items>;
}

export interface CreatePurchaseDTO extends Omit<Purchase, "purchaseId">{}
