import { useEffect, useState } from "react";
import { countryAPI } from "../../../services/CountryServices";
import { categoryAPI } from "../../../services/CategoryServices";

export default function useCategory() {
  interface Column {
    id: "name" | "parent_category" | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "name", label: "Name", align: "left", minWidth: 200 },
    {
      id: "parent_category",
      label: "Parent category",
      align: "left",
      minWidth: 200,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 120,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
  ];

  const { data: category } = categoryAPI.useFetchAllCategoriesQuery("");
  const [deleteCategory, deleteStatus] =
    categoryAPI.useDeleteCategoryMutation();

  const [query, setQuery] = useState("");

  const filteredCategory = category?.filter((item) =>
    item.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification("Category successfully deleted");
    } else if (deleteStatus.isError) {
      new Notification("Category not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    filteredCategory,
    handleSearch,
    handleDelete,
  };
}
