import { useEffect, useState } from "react";
import { callbackAPI } from "../../../services/CallbackServices";
import { Notification } from "../../../utils/notification";

export default function useFeedback() {
  interface Column {
    id: "fullname" | "number" | "time_range" | "comments" | "actions";
    label: string;
    minWidth?: number;
    align?: "center" | "left";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "fullname", label: "Full name", align: "left", minWidth: 100 },
    { id: "number", label: "Number", align: "left", minWidth: 100 },
    { id: "time_range", label: "Time range", align: "left", minWidth: 150 },
    { id: "comments", label: "Comments", align: "left", minWidth: 200 },
    { id: "actions", label: "Actions", align: "left", minWidth: 80 },
  ];

  const { data: callbacks } = callbackAPI.useFetchAllCallbacksQuery("");
  const [deleteCallback, deleteStatus] =
    callbackAPI.useDeleteCallbackMutation();

  const [query, setQuery] = useState("");

  const filteredCallbacks = callbacks?.filter((item) =>
    item.full_name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  const handleDelete = async (id) => {
    await deleteCallback(id);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      new Notification().showSuccess("Feedback successfully deleted!");
    } else if (deleteStatus.isError) {
      new Notification().showSuccess("Feedback not deleted!");
    }
  }, [deleteStatus]);

  return {
    columns,
    filteredCallbacks,
    handleSearch,
    handleDelete,
  };
}
