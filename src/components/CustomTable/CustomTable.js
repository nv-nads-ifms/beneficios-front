import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, StyledTableRow } from './AutoLoadTable';
import { CircularProgress, TableCell, Typography } from '@material-ui/core';
import TableChartIcon from '@material-ui/icons/TableChart';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    cell: {
        width: "150px",
    }
});

function CustomTable(props) {
    const { children, data, columns,
        page, setPage, rowsPerPage, setRowsPerPage,
        dataFetched } = props;

    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [emptyRows, setEmptyRows] = React.useState(true);
    const columnCount = columns.length + 1;

    useEffect(() => {
        setCount(data.totalElements);
        setEmptyRows(data.totalElements <= 0);
    }, [setCount, data.totalElements]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="custom table" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center" className={classes.cell}>Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children}
                        {emptyRows === true && (
                            <TableRow style={{ height: 25 * emptyRows }}>
                                <TableCell colSpan={columnCount} align="center">
                                    <TableChartIcon />
                                    <Typography variant="h6" color="textSecondary">
                                        Sem dados!
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {dataFetched != null && !dataFetched && (
                            <StyledTableRow style={{ height: 25 * emptyRows }}>
                                <TableCell colSpan={columnCount} align="center">
                                    <CircularProgress />
                                    <Typography variant="body2" color="textSecondary">
                                        Carregando dados!
                                    </Typography>
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default CustomTable;