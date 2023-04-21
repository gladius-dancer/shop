import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../hooks/useRedux";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import "./Dashboard.scss";
import IconButton from "@mui/material/IconButton";
import {productAPI} from "../../services/ProductServices";

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

export default function Dashboard() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const products = useAppSelector((state) => state.productsReduser.products);
    const {data: products, isLoading, error} = productAPI.useFetchAllProductsQuery("");
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
                        {products?.map((item) => (
                            <TableRow key={item.id} hover role="checkbox">
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
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                    <IconButton>
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
    );
}
