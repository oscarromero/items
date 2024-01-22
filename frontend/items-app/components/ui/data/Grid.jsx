import { useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const Grid = ({
  columns,
  data,
  pagination,
  onRowSelected,
  actionRow,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRowId, setSelectedRowId] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelected = (row) => {
    const value = selectedRowId == row ? null : row;
    setSelectedRowId(value);
    onRowSelected(value);
  };

  return (
    <>
      <Paper elevation={5}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <strong>{column.label.toUpperCase()}</strong>
                  </TableCell>
                ))}
                {actionRow ? (
                  <TableCell/>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} hover>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      onClick={() => handleRowSelected(row)}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                  {actionRow && selectedRowId == row ? (
                    <TableCell key={row.id}>{actionRow}</TableCell>
                  ) : (
                    <TableCell />
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default Grid;
