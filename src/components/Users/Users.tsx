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
import { change } from "../../store/reducers/ModalSlice";
import useUsers from "./hooks/useUsers";
import "./Users.scss";
import { UserModal } from "./modules/UserModal";
import { countryAPI } from "../../services/CountryServices";
import { UserUpdateModal } from "./modules/UserUpdateModal";

export default function Users() {
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<{
    data?: any;
  }>({
    data: null,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [update, setUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalReducer);
  const { data: country } = countryAPI.useFetchAllCountryQuery("");
  const { columns, filteredUsers, handleSearch, handleDelete } = useUsers();

  const country_list = country?.map((item) => {
    return {
      value: item.id,
      label: item.country_name,
    };
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function openUserModal(item) {
    dispatch(change());
    setSelectedUser({ data: {} });
  }

  function openUpdateModal(item) {
    dispatch(change());
    setUpdate(true);
    setSelectedUser({ data: item });
  }

  return (
    <>
      <div className="products-top">
        <Button onClick={() => openUserModal({})} variant="contained">
          Create user
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
              {filteredUsers?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="user-image">
                    <img src={item.user_detail.user_image} alt="" />
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.user_detail.first_name}</TableCell>
                  <TableCell>{item.user_detail.last_name}</TableCell>
                  <TableCell>{item.is_admin ? "Admin" : "User"}</TableCell>
                  <TableCell>{item.addresses[0].city}</TableCell>
                  <TableCell>{item.phone_numbers[0].phone_number}</TableCell>
                  <TableCell className="actions">
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

      {modal && !update && (
        <UserModal country={country_list} data={selectedUser.data} />
      )}
      {modal && update && <UserUpdateModal data={selectedUser.data} />}
    </>
  );
}
