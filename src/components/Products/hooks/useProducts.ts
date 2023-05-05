import * as React from "react";
import { productAPI } from "../../../services/ProductServices";
import { categoryAPI } from "../../../services/CategoryServices";
import { useEffect, useState } from "react";
import { Notification } from "../../../utils/notification";

export default function useProducts() {
  interface Column {
    id:
      | "phote"
      | "name"
      | "description"
      | "category"
      | "price"
      | "count"
      | "discount"
      | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "phote", label: "Phote", align: "left", minWidth: 50 },
    { id: "name", label: "Name", align: "left", minWidth: 150 },
    { id: "description", label: "Description", align: "left", minWidth: 300 },
    {
      id: "category",
      label: "Category",
      minWidth: 100,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "price",
      label: "Price",
      minWidth: 90,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "count",
      label: "Count",
      minWidth: 50,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "discount",
      label: "Discount",
      minWidth: 50,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 160,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
  ];

  const { data: products } = productAPI.useFetchAllProductsQuery("");
  const [deleteProduct, deleteStatus] = productAPI.useDeleteProductMutation();
  const { data: category } = categoryAPI.useFetchAllCategoriesQuery("");
  const categories = category?.reduce((acc: any, item: any) => {
    acc.push({ label: item.name, value: item.id });
    return acc;
  }, []);

  const [query, setQuery] = useState("");

  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification().showSuccess("Product successfully deleted!");
    } else if (deleteStatus.isError) {
      new Notification().showError("Product not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    deleteProduct,
    categories,
    filteredProducts,
    handleSearch,
  };
}
