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
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import "./Products.scss";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import useProducts from "./hooks/useProducts";
import { ProductModal } from "./modules/ProductModal/ProductModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { change } from "../../store/reducers/ModalSlice";

export default function Products() {
  const { columns, filteredProducts, deleteProduct, categories, handleSearch } =
    useProducts();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalReducer);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  function openCreateModal(item) {
    dispatch(change());
    setSelectedProduct({ data: {} });
  }

  function openUpdateModal(item) {
    dispatch(change());
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
              {filteredProducts?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="product-image">
                    <img src={item.images[0].image_path} alt="" />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell className="actions">
                    <IconButton>
                      <EditAttributesIcon color="primary" />
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

      {modal && (
        <ProductModal data={selectedProduct.data} categories={categories} />
      )}
    </>
  );
}
