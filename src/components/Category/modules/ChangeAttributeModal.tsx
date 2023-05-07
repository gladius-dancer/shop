import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useChangeAttributeModal } from "../hooks/useChangeAttributeModal";
import { attributeAPI } from "../../../services/AttributeServices";
import ModalComponent from "../../Modal/ModalComponent";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ChangeAttributeModal(data) {
  const fetchCategoryAttributes =
    attributeAPI.endpoints.fetchCategoryAttributes.useQuery(data.data.id);
  const [deleteAttribute, deleteStatus] =
    attributeAPI.useDeleteAttributeMutation();

  const attributes = fetchCategoryAttributes.data;

  const {
    methods: { control, errors, register },
    onSubmit,
  } = useChangeAttributeModal(data);

  function handleDelete(id) {
    deleteAttribute(id);
  }

  return (
    <ModalComponent>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 60 }}>Name of attribute</TableCell>
              <TableCell style={{ minWidth: 60 }}>
                Variants of attribute
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes?.map((item) => (
              <TableRow
                key={item.attribute_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="d-flex justify-content-between align-items-center"
                >
                  {item.attribute_name}
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
                {item.variants.map((variant) => (
                  <TableCell align="left" key={variant.id}>
                    {variant.value}{" "}
                    <IconButton>
                      <CloseIcon color="error" />
                    </IconButton>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ModalComponent>
  );
}
