export type CartType = {
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    discount: number,
    images: ProductImage[],
    category: ProductCategory,
    attributes: string[],
    count?: number,
    totalPrice?: number
}

type ProductImage = {
    product_id: number,
    image_path: string,
    id: number
}

type ProductCategory = {
    name: string,
    id: number,
    children_category: string[],
    parent_category: {
        name: string,
        id: number
    }
}