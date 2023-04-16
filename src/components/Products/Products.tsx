import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import "./Products.scss";
import IconButton from "@mui/material/IconButton";
import ModalComponent from "../Modal/ModalComponent";
import { useState } from "react";
import { Button } from "@mui/material";
import {InputText} from "../FormComponents/InputText";
import TextField from "@mui/material/TextField";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {Dropdown} from "../FormComponents/Dropdown";
import {MultiLine} from "../FormComponents/MultiLine";
import CloseIcon from '@mui/icons-material/Close';
import {addNewProduct, deleteProduct} from "../../store/reducers/AsyncActions";

interface Column {
  id:
    | "phote"
    | "name"
    | "description"
    | "category"
    | "price"
    | "count"
    | "discount"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "phote", label: "Phote", align: "left", minWidth: 50 },
  { id: "name", label: "Name", align: "left", minWidth: 150 },
  { id: "description", label: "Description", align: "left", minWidth: 300 },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 90,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "count",
    label: "Count",
    minWidth: 50,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 50,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
];

export default function Products() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const products = useAppSelector((state) => state.productsReduser.products);
  const category = useAppSelector(state => state.categoriesReduser.categories);
  const categories = category.reduce((acc: any, item: any)=>{acc.push({label: item.name, value: item.id}); return acc}, []);
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const methods = useForm({resolver: yupResolver(schema)});
  const {handleSubmit, control, setValue, formState: {errors}} = methods;
  const onSubmit = async (data: any) => {
    dispatch(addNewProduct(data));
    console.log(data)
  }

  return (
    <>
      <div className="products-top">
        <Button onClick={()=>setModal(true)} variant="contained">Create product</Button>
        <div className="product-search">
          <span>Search: </span> <TextField size="small"  variant="outlined" />
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
              {products.map((item) => (
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
                    <IconButton onClick={()=>setModal(true)}>
                      <SettingsIcon />
                    </IconButton>
                    <IconButton onClick={()=>dispatch(deleteProduct(item.id))}>
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
        isOpen={modal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="add-modal">
          <div className="modal-header">
            <IconButton onClick={() => setModal(false)} className="modal-close">
              <CloseIcon/>
            </IconButton>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="add-form">
            <InputText status={true} name="name" label="Name" control={control}/>
            <MultiLine name="description" label="Description" control={control}/>
            <InputText status={true} name="price" label="Price" control={control}/>
            <div className="counts">
              <InputText status={true} name="count" label="Count" control={control}/>
              <InputText status={true} name="discount" label="Discount" control={control}/>
            </div>
            <Dropdown
                key="category"
                name="category"
                control={control}
                options={categories}
            />
            <InputText status={true} name="image" label="Image link" control={control}/>
            <Button type="submit" variant="contained">Add</Button>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}
