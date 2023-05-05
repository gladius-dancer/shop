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
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import "./Products.scss";
import IconButton from "@mui/material/IconButton";
import { Button, TableFooter } from "@mui/material";
import TextField from "@mui/material/TextField";
import useProducts from "./hooks/useProducts";
import { ProductModal } from "./modules/ProductModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { showModal, hideModal } from "../../store/reducers/ModalSlice";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Notification } from "../../utils/notification";
import { productAPI } from "../../services/ProductServices";
import { showLoader, hideLoader } from "../../store/reducers/LoadSlice";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Products() {
  const { columns, filteredProducts, deleteProduct, categories, handleSearch } =
    useProducts();

  const dispatch = useAppDispatch();
  const fetchProducts = productAPI.endpoints.fetchAllProducts.useQuery("");

  if (fetchProducts.isLoading) {
    dispatch(showLoader());
  } else if (fetchProducts.isError) {
    new Notification().showError("Load error!");
  } else if (fetchProducts.isSuccess) {
    dispatch(hideLoader());
  }

  const modal = useAppSelector((state) => state.modalReducer);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts?.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  function openCreateModal(item) {
    dispatch(showModal());
    setSelectedProduct({ data: {} });
  }

  function openUpdateModal(item) {
    dispatch(showModal());
    setSelectedProduct({ data: item });
  }

  const [selectedProduct, setSelectedProduct] = useState<{
    data?: any;
  }>({
    data: null,
  });

  return (
    <>
      <div className="products-top">
        <Button onClick={() => openCreateModal({})} variant="contained">
          Create product
        </Button>
        <div className="product-search">
          <span>Search: </span>{" "}
          <TextField onChange={handleSearch} size="small" variant="outlined" />
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
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
              {(rowsPerPage > 0
                ? filteredProducts?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredProducts
              )?.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ minWidth: 60 }}
                    className="product-image"
                  >
                    {<img src={row.images[0].image_path} alt="" />}
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }} align="left">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ minWidth: 260 }} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }} align="left">
                    {row.category.name}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }} align="left">
                    {row.price}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }} align="left">
                    {row.quantity}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }} align="left">
                    {row.discount}
                  </TableCell>
                  <TableCell className="actions">
                    <IconButton>
                      <EditAttributesIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => openUpdateModal(row)}>
                      <SettingsIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={12}
                  count={filteredProducts?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>

      {modal && (
        <ProductModal data={selectedProduct.data} categories={categories} />
      )}
    </>
  );
}
