import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ProductType } from "../../../models/ProductType";
import * as yup from "yup";
import { productAPI } from "../../../services/ProductServices";
import { ProductSendType } from "../../../models/ProductSendType";
import { Notification } from "../../../utils/notification";
import { useAppDispatch } from "../../../hooks/useRedux";

let notify = new Notification();
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
  discount: yup.number().required(),
  category: yup.string().required(),
  images: yup.string().required(),
});

export function useProductModalForm(data) {
  const [createProduct, {}] = productAPI.useCreateProductMutation();
  const [updateProduct, {}] = productAPI.useUpdateProductMutation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      category: data?.category?.id,
      images: data?.images?.[0]?.image_path,
    },
  });

  const onSubmit = async (formData: ProductType) => {
    let payload: ProductSendType = {
      product: {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        quantity: formData.quantity,
        discount: formData.discount,
        category_id: Number(formData.category),
      },
      product_images: [
        {
          image_path: formData.images,
        },
      ],
    };
    if (Object.keys(data).length !== 0) {
      // console.log("Update");
      await updateProduct({ id: data.id, product: payload });
    } else {
      // console.log("Create");
      await createProduct(payload);
      notify.showSuccess("Product added successfully!");
    }
  };

  return {
    methods: {
      control,
      errors,
      register,
    },
    onSubmit: handleSubmit(onSubmit),
  };
}
