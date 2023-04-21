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
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import "./Products.scss";
import IconButton from "@mui/material/IconButton";
import ModalComponent from "../Modal/ModalComponent";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { InputText } from "../FormComponents/InputText";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Dropdown } from "../FormComponents/Dropdown";
import { MultiLine } from "../FormComponents/MultiLine";
import CloseIcon from "@mui/icons-material/Close";
import useProducts from "./hooks/useProducts";

export default function Products() {
  const {
    columns,
    createProduct,
    updateProduct,
    filteredProducts,
    deleteProduct,
    categories,
    handleSearch,
  } = useProducts();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [modal, setModal] = useState({ status: false, type: "", data: {} });
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = async (product) => {
    let data = {
      product: {
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.count,
        discount: product.discount,
        category_id: product.category,
      },
      product_images: [
        {
          image_path: product.image,
        },
      ],
    };
    await createProduct(data);
  };

  const handleUpdate = async (id, product) => {
    let data = {
      product: {
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.count,
        discount: product.discount,
        category_id: product.category,
      },
      product_images: [
        {
          image_path: product.image,
        },
      ],
    };
    await updateProduct({id, payload: data});
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteProduct(id);
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    count: yup.number().required(),
    discount: yup.number().required(),
    category: yup.string().required(),
    image: yup.string().required(),
  });

  const methods = useForm({ resolver: yupResolver(schema), defaultValues:{
      name: modal.data.name,
      description: modal.data.description,
      price: modal.data.price,
      count: modal.data.count,
      discount: modal.data.discount,
      category: modal.data.category,
      image: modal.data.image_path,
    } });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: any) => {
    console.log(data)
    switch(modal.type){
      case "add": handleCreate(data); break;
      case "update": handleUpdate(modal.data?.id, data); break;
    }

  };

  return (
    <>
      <div className="products-top">
        <Button onClick={() => setModal({status: true, type: "add", data: {}})} variant="contained">
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
                    <IconButton
                      onClick={() =>
                        setModal({
                          status: true,
                          type: "update",
                          data: {
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            category: item.category.id,
                            price: item.price,
                            quantity: item.quantity,
                            discount: item.discount,
                            image_path: item.images[0].image_path
                          },
                        })
                      }
                    >
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
      <ModalComponent
        isOpen={modal.status}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="add-modal">
          <div className="modal-header">
            <IconButton
              onClick={() => setModal({ status: false, data: {} })}
              className="modal-close"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="add-form">
            <InputText
              status={true}
              name="name"
              label="Name"
              defaultValue={modal.data?.name}
              control={control}
            />
            <MultiLine
              name="description"
              label="Description"
              defaultValue={modal.data?.description}
              control={control}
            />
            <InputText
              status={true}
              name="price"
              label="Price"
              defaultValue={modal.data?.price}
              control={control}
            />
            <div className="counts">
              <InputText
                status={true}
                name="count"
                label="Count"
                defaultValue={modal.data?.quantity}
                control={control}
              />
              <InputText
                status={true}
                name="discount"
                label="Discount"
                defaultValue={modal.data?.discount}
                control={control}
              />
            </div>
            <Dropdown
              key="category"
              name="category"
              control={control}
              options={categories}
              defaultValue={modal.data?.category}
            />
            <InputText
              status={true}
              name="image"
              label="Image link"
              defaultValue={modal.data?.image_path}
              control={control}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}
