import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { showModal, hideModal } from "../../store/reducers/ModalSlice";
import { hideLoader, showLoader } from "../../store/reducers/LoadSlice";
import { Notification } from "../../utils/notification";
import useCategory from "./hooks/useCategory";
import { categoryAPI } from "../../services/CategoryServices";
import { CategoryModal } from "./modules/CategoryModal";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import { AddAttributeModal } from "./modules/AddAttributeModal";
import ChangeAttributeModal from "./modules/ChangeAttributeModal";

export default function Category() {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<{
    data?: any;
  }>({
    data: null,
  });
  const [modals, setModals] = useState({
    create: false,
    add: false,
    change: false,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalReducer);
  const { columns, filteredCategory, handleSearch, handleDelete } =
    useCategory();

  const fetchCategory = categoryAPI.endpoints.fetchAllCategories.useQuery("");

  if (fetchCategory.isLoading) {
    dispatch(showLoader());
  } else if (fetchCategory.isError) {
    new Notification().showError("Load error!");
  } else if (fetchCategory.isSuccess) {
    dispatch(hideLoader());
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function openCreateModal(item) {
    dispatch(showModal());
    setSelectedCategory({ data: {} });
    setModals({ create: true, add: false, change: false });
  }

  function openUpdateModal(item) {
    dispatch(showModal());
    setSelectedCategory({ data: item });
    setModals({ create: true, add: false, change: false });
  }

  function openAddAttribute(item) {
    dispatch(showModal());
    setSelectedCategory({ data: item });
    setModals({ create: false, add: true, change: false });
  }

  function openChangeAttribute(item) {
    dispatch(showModal());
    setSelectedCategory({ data: item });
    setModals({ create: false, add: false, change: true });
  }

  return (
    <>
      <div className="products-top">
        <Button onClick={() => openCreateModal({})} variant="contained">
          Add category
        </Button>
        <div className="product-search">
          <span>Search: </span>{" "}
          <TextField onChange={handleSearch} size="small" variant="outlined" />
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategory?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.parent_category.name}</TableCell>
                  <TableCell className="actions">
                    <IconButton onClick={() => openChangeAttribute(item)}>
                      <EditAttributesIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => openAddAttribute(item.id)}>
                      <TextIncreaseIcon />
                    </IconButton>
                    <IconButton onClick={() => openUpdateModal(item)}>
                      <SettingsIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={5}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {modal && modals.create && (
        <CategoryModal
          categories={fetchCategory}
          data={selectedCategory.data}
        />
      )}
      {modal && modals.add && (
        <AddAttributeModal data={selectedCategory.data} />
      )}
      {modal && modals.change && (
        <ChangeAttributeModal data={selectedCategory.data} />
      )}
    </>
  );
}
