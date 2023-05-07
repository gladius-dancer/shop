import { useEffect, useState } from "react";
import { userAPI } from "../../../services/UserServices";
import { Notification } from "../../../utils/notification";
import { orderAPI } from "../../../services/OrderServices";

export default function useOrders() {
  interface Column {
    id: "name" | "products" | "status" | "adress" | "date" | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "name", label: "Name", align: "left", minWidth: 170 },
    { id: "products", label: "Products", align: "left", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "adress",
      label: "Adress",
      minWidth: 170,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
  ];

  interface Data {
    name: string;
    products: any;
    status: string;
    adress: string;
    date: string;
    actions: any;
  }

  const { data: orders } = orderAPI.useFetchAllOrdersQuery("");
  const { data: users } = userAPI.useFetchAllUsersQuery("");
  const [deleteOrder, deleteStatus] = orderAPI.useDeleteOrderMutation();

  const handleDelete = (user_id, order_id) => {
    deleteOrder({ user_id, order_id });
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification().showSuccess("Order successfully deleted!");
    } else if (deleteStatus.isError) {
      new Notification().showError("Order not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    orders,
    users,
    handleDelete,
  };
}
