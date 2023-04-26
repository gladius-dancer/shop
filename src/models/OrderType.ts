export type OrderType = {
  user_id: number;
  order_date: string;
  address_id: number;
  order_status_id: number;
  id: number;
  order_details: [
    {
      product_id: number;
      quantity: number;
      price: number;
    }
  ];
  order_status: {
    status: string;
    id: number;
  };
};
