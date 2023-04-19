export type ProductSendType = {
    product:{
        id: number,
        name: string,
        price: number,
        description: string,
        quantity: number,
        discount: number,
        category_id: number,
        attributes: string[]
    },
    images: ProductImage[],


}

type ProductImage = {
    image_path: string,
}
