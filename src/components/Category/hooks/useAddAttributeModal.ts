import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { useEffect, useState } from "react";
import { categoryAPI } from "../../../services/CategoryServices";

const schema = yup.object().shape({
  attribute_name: yup.string().required(),
});

export function useAddAttributeModal(data) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (formData) => {
    console.log(formData);

    // if (Object.keys(data).length !== 0) {
    //   updateCategory({ id: data.id, category: formData });
    // } else {
    //   createCategory(formData);
    // }
  };

  useEffect(() => {
    // if (createStatus.isSuccess) {
    //   new Notification().showSuccess("Category successfully created!");
    // } else if (createStatus.isError) {
    //   new Notification().showSuccess("Category not created!");
    // }
  }, []);

  return {
    methods: {
      control,
      errors,
    },
    onSubmit: handleSubmit(onSubmit),
  };
}
