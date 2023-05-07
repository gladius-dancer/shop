import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { useEffect, useState } from "react";
import { attributeAPI } from "../../../services/AttributeServices";

const schema = yup.object().shape({
  attribute_name: yup.string().required(),
});

export function useChangeAttributeModal(data) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const [createAttibute, createStatus] =
    attributeAPI.useCreateAttributeMutation();

  const onSubmit = (formData) => {
    const payload = {
      attribute: {
        attribute_name: formData.attribute_name,
        category_id: data,
      },
      variants: formData.variants.map((item) => {
        return {
          value: item.name,
        };
      }),
    };

    createAttibute(payload);
  };

  useEffect(() => {
    if (createStatus.isSuccess) {
      new Notification().showSuccess("Attribute successfully added!");
    } else if (createStatus.isError) {
      new Notification().showSuccess("Attribute not added!");
    }
  }, [createStatus]);

  return {
    methods: {
      control,
      errors,
      register,
    },
    onSubmit: handleSubmit(onSubmit),
  };
}
