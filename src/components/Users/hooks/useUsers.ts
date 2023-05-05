import { useEffect, useState } from "react";
import { userAPI } from "../../../services/UserServices";
import { Notification } from "../../../utils/notification";

export default function useUsers() {
  interface Column {
    id:
      | "phote"
      | "login"
      | "firstName"
      | "lastName"
      | "role"
      | "city"
      | "number"
      | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "phote", label: "Avatar", align: "left", minWidth: 50 },
    { id: "login", label: "Login", align: "left", minWidth: 150 },
    { id: "firstName", label: "First name", align: "left", minWidth: 150 },
    { id: "lastName", label: "Last name", align: "left", minWidth: 150 },
    { id: "role", label: "Role", align: "left", minWidth: 150 },
    {
      id: "city",
      label: "City",
      minWidth: 120,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "number",
      label: "Number",
      minWidth: 120,
      align: "left",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 120,
      align: "left",
      format: (value: number) => value.toFixed(2),
    },
  ];

  const { data: users } = userAPI.useFetchAllUsersQuery("");
  const [deleteUser, deleteStatus] = userAPI.useDeleteUserMutation();
  const [query, setQuery] = useState("");

  const filteredUsers = users?.filter((item) =>
    item.user_detail.first_name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification().showSuccess("User successfully deleted!");
    } else if (deleteStatus.isError) {
      new Notification().showError("User not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    filteredUsers,
    handleSearch,
    handleDelete,
  };
}
