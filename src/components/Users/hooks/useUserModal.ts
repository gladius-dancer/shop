import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { useAppDispatch } from "../../../hooks/useRedux";
import { userAPI } from "../../../services/UserServices";
import { UserType, UserSendType } from "../../../models/UserType";

let notify = new Notification();
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(4),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  user_image: yup.string().required(),
  phone_number: yup.string().required(),
  type: yup.string().required(),
  street_adress: yup.string().required(),
  postal_code: yup.number().required(),
  country_id: yup.number().required(),
});

export function useUserModal(data) {
  const [createUser, {}] = userAPI.useCreateUserMutation();
  const [updateUser, {}] = userAPI.useUpdateUserMutation();
  const dispatch = useAppDispatch();

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

  const onSubmit = async (formData) => {
    let payload: UserSendType = {
      user: {
        username: formData.username,
        password: formData.password,
      },
      user_detail: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_image: formData.user_image,
      },
      user_phones: [
        {
          phone_number: formData.phone_number,
          type: formData.type,
        },
      ],
      user_address: {
        street_address: formData.street_address,
        postal_code: formData.postal_code,
        city: formData.city,
        country_id: formData.country_id,
      },
    };

    if (Object.keys(data).length !== 0) {
      console.log("Update");
      await updateUser({ id: data.id, product: payload });
    } else {
      console.log("Create");
      await createUser(payload);
      notify.showSuccess("User added successfully!");
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
