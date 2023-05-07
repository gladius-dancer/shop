import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import useOrders from "./hooks/useOrders";
import IconButton from "@mui/material/IconButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { showModal } from "../../store/reducers/ModalSlice";
import { useState } from "react";
import CreateStatusModal from "./modules/CreateStatusModal";

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const modal = useAppSelector((state) => state.modalReducer);
  const [update, setUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const { columns, orders, users, handleDelete } = useOrders();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openCreateStatusModal = () => {
    dispatch(showModal());
  };

  return (
    <>
      <div className="products-top">
        <Button onClick={() => openCreateStatusModal()} variant="contained">
          Create order status
        </Button>
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
              {orders?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {
                      users?.filter((user) => user.id === item.user_id)[0]
                        .username
                    }
                  </TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>{item.order_status.status}</TableCell>
                  <TableCell>
                    {
                      users?.filter(
                        (user) => user.addresses[0].id === item.address_id
                      )[0].addresses[0].street_address
                    }
                  </TableCell>
                  <TableCell>{item.order_date}</TableCell>
                  <TableCell>
                    {/*<IconButton onClick={() => openUpdateModal(item)}>*/}
                    <IconButton>
                      <AppRegistrationIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.user_id, item.id)}
                    >
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
      {modal && !update && <CreateStatusModal />}
    </>
  );
}
