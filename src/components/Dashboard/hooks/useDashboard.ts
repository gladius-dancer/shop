import React from "react";

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
];

export function useDashboard() {
  return {
    columns,
  };
}
