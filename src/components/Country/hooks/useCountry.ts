import { useEffect, useState } from "react";
import { countryAPI } from "../../../services/CountryServices";
import { Notification } from "../../../utils/notification";

export default function useCountry() {
  interface Column {
    id: "country_name" | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "country_name", label: "Name", align: "left", minWidth: 200 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 120,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
  ];

  const {
    data: country,
    error,
    status,
  } = countryAPI.useFetchAllCountryQuery("");
  const [deleteCountry, deleteStatus] = countryAPI.useDeleteCountryMutation();

  const [query, setQuery] = useState("");

  const filteredCountry = country?.filter((item) =>
    item.country_name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    await deleteCountry(id);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification().showSuccess("Country successfully deleted!");
    } else if (deleteStatus.isError) {
      new Notification().showError("Country not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    filteredCountry,
    handleSearch,
    handleDelete,
  };
}
