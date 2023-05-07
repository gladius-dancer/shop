import { useCallback } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useAppDispatch } from "../../../hooks/useRedux";

export function useCheckout() {
  const schema = yup.object().shape({
    // paypal: paypal ? yup.string().required() : "",
    // card: card ? yup.string().required() : "",
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();

    alert("Successfully");
  };

  return {
    methods: {
      control,
    },
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
}
