import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { userAPI } from "../../../services/UserServices";
import { UserSendType } from "../../../models/UserType";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(4),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  user_image: yup.string().required(),
  phone_number: yup.string().required(),
  type: yup.string().required(),
  street_adress: yup.string().required(),
  postal_code: yup.string().required(),
  country_id: yup.number().required(),
});

export function useUserModal(data) {
  const [createUser, createStatus] = userAPI.useCreateUserMutation();
  const [createAdminUser, createAdminStatus] =
    userAPI.useCreateAdminUserMutation();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (formData) => {
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
        street_address: formData.street_adress,
        postal_code: formData.postal_code,
        city: formData.city,
        country_id: formData.country_id,
      },
    };

    if (isAdmin) {
      createAdminUser(payload);
    } else {
      createUser(payload);
    }
  };

  useEffect(() => {
    if (createStatus.isSuccess) {
      new Notification().showSuccess("User successfully created!");
    } else if (createStatus.isError) {
      new Notification().showError("User not created!");
    }

    if (createAdminStatus.isSuccess) {
      new Notification().showSuccess("Admin user successfully created!");
    } else if (createAdminStatus.isError) {
      new Notification().showError("Admin user not created!");
    }
  }, [createStatus, createAdminStatus]);

  return {
    methods: {
      control,
      errors,
    },
    onSubmit: handleSubmit(onSubmit),
    setIsAdmin: () => setIsAdmin(!isAdmin),
  };
}
