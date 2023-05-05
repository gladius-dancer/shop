import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Notification } from "../../../utils/notification";
import { useEffect, useState } from "react";
import { countryAPI } from "../../../services/CountryServices";

const schema = yup.object().shape({
  country_name: yup.string().required(),
});

export function useCountryModal(data) {
  const [createCountry, createStatus] = countryAPI.useCreateCountryMutation();
  const [updateCountry, updateStatus] = countryAPI.useUpdateCountryMutation();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country_name: data.country_name,
    },
  });
  const onSubmit = (formData) => {
    if (Object.keys(data).length !== 0) {
      updateCountry({ id: data.id, country: formData });
    } else {
      createCountry(formData);
    }
  };

  useEffect(() => {
    if (createStatus.isSuccess) {
      new Notification().showSuccess("Country successfully added!");
    } else if (createStatus.isError) {
      new Notification().showError("Country not added!");
    }

    if (updateStatus.isSuccess) {
      new Notification().showSuccess("Country successfully updated!");
    } else if (updateStatus.isError) {
      new Notification().showError("Country not updated!");
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
