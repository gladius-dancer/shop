export type ProductSendType = {
  id?: number;
  product: {
    id?: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    discount: number;
    category_id: number;
    attributes?: string[];
  };
  product_images: ProductImage[];
};

type ProductImage = {
  image_path: any;
};
