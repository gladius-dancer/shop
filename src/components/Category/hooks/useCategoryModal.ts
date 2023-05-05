import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { useEffect, useState } from "react";
import { categoryAPI } from "../../../services/CategoryServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  parent_category_id: yup.number().required(),
});

export function useCategoryModal(data) {
  const [createCategory, createStatus] =
    categoryAPI.useCreateCategoryMutation();
  const [updateCategory, updateStatus] =
    categoryAPI.useUpdateCategoryMutation();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name,
      parent_category_id: data?.parent_category?.id,
    },
  });

  const onSubmit = (formData) => {
    if (Object.keys(data).length !== 0) {
      updateCategory({ id: data.id, category: formData });
    } else {
      createCategory(formData);
    }
  };

  useEffect(() => {
    if (createStatus.isSuccess) {
      new Notification().showSuccess("Category successfully created!");
    } else if (createStatus.isError) {
      new Notification().showSuccess("Category not created!");
    }

    if (updateStatus.isSuccess) {
      new Notification().showSuccess("Category successfully updated!");
    } else if (updateStatus.isError) {
      new Notification().showSuccess("Category not updated!");
    }
  }, [createStatus, updateStatus]);

  return {
    methods: {
      control,
      errors,
    },
    onSubmit: handleSubmit(onSubmit),
    setIsAdmin: () => setIsAdmin(!isAdmin),
  };
}
