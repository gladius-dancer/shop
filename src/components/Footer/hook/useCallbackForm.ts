import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CallbackType } from "../../../models/CallbackType";
import { callbackAPI } from "../../../services/CallbackServices";
import { Notification } from "../../../utils/notification";

type FormData = CallbackType;

export function useCallbackForm() {
  const [createCallback, createStatus] =
    callbackAPI.useCreateCallbackMutation();

  const schema = yup.object().shape({
    full_name: yup.string().required(),
    phone_number: yup.string().required(),
    start_time: yup.date().required(),
    end_time: yup.date().required(),
    comment: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = useCallback((formData: FormData) => {
    createCallback({
      ...formData,
      start_time: new Date(formData.start_time).toLocaleTimeString(),
      end_time: new Date(formData.end_time).toLocaleTimeString(),
    });
    reset({
      full_name: "",
      phone_number: "",
      comment: "",
    });
  }, []);

  useEffect(() => {
    if (createStatus.isSuccess) {
      new Notification().showSuccess("Feedback successfully sended!");
    } else if (createStatus.isError) {
      new Notification().showSuccess("Feedback not sended!");
    }
  }, [createStatus]);

  return {
    methods: {
      control,
    },
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
}
