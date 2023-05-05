import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { userAPI } from "../../../services/UserServices";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  user_image: yup.string().required(),
});

export function useUserUpdateModal(data) {
  const [updateUser, updateStatus] = userAPI.useUpdateUserMutation();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: data.user_detail.first_name,
      last_name: data.user_detail.last_name,
      user_image: data.user_detail.user_image,
      username: data.username,
    },
  });
  const onSubmit = (formData) => {
    let payload = {
      user: {
        username: formData.username,
      },
      user_detail: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_image: formData.user_image,
      },
    };
    updateUser({ id: data.id, user: payload });
  };

  useEffect(() => {
    if (updateStatus.isSuccess) {
      new Notification().showSuccess("User successfully updated!");
    } else if (updateStatus.isError) {
      new Notification().showSuccess("User not updated!");
    }
  }, [updateStatus]);

  return {
    methods: {
      control,
      errors,
    },
    onSubmit: handleSubmit(onSubmit),
    setIsAdmin: () => setIsAdmin(!isAdmin),
  };
}
