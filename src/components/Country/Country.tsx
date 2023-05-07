import * as React from "react";
import { useEffect, useState } from "react";
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
import { showModal } from "../../store/reducers/ModalSlice";
import useCountry from "./hooks/useCountry";
import { CountryModal } from "./modules/CountryModal";
import { countryAPI } from "../../services/CountryServices";
import { hideLoader, showLoader } from "../../store/reducers/LoadSlice";
import { Notification } from "../../utils/notification";

export default function Country() {
  const [page, setPage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<{
    data?: any;
  }>({
    data: null,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalReducer);
  const { columns, filteredCountry, handleSearch, handleDelete } = useCountry();

  const fetchCountry = countryAPI.endpoints.fetchAllCountry.useQuery("");

  useEffect(() => {
    if (fetchCountry.isLoading) {
      dispatch(showLoader());
    } else if (fetchCountry.isError) {
      new Notification().showError("Load error!");
    } else if (fetchCountry.isSuccess) {
      dispatch(hideLoader());
    }
  }, [fetchCountry]);

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
    dispatch(showModal());
    setSelectedCountry({ data: {} });
  }

  function openUpdateModal(item) {
    dispatch(showModal());
    setSelectedCountry({ data: item });
  }

  return (
    <>
      <div className="products-top">
        <Button onClick={() => openUserModal({})} variant="contained">
          Add country
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
              {filteredCountry?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.country_name}</TableCell>
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

      {modal && <CountryModal data={selectedCountry.data} />}
    </>
  );
}
