import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import AutoLoadTableRow from './AutoLoadTableRow';
import { CircularProgress, Typography } from '@material-ui/core';
import TableChartIcon from '@material-ui/icons/TableChart';
import { deleteModalMessage } from '../../api/utils/modalMessages';

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170, innerField: 'name' },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//         id: 'population',
//         label: 'Population',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'size',
//         label: 'Size\u00a0(km\u00b2)',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'density',
//         label: 'Density',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toFixed(2),
//     },
// ];

// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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

function AutoLoadTable(props) {
    const { children, retrieveDataFunction, columns, 
        idColumnName, handleEdit, handleRemove, handleView } = props;

    const classes = useStyles();
    const columnCount = columns.length + 1;

    const [dataFetched, setDataFetched] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(page, rowsPerPage);
        retrieveDataFunction(params)
            .then((response) => {
                setRows(response.data.content);
                setRowsPerPage(response.data.pageable.pageSize);
                setCount(response.data.totalElements);
                setPage(response.data.number);
                setDataFetched(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [retrieveDataFunction, setRows, setRowsPerPage,
        setCount, setPage, page, rowsPerPage]);

    const removeDataFunction = (row) => {
        const value = row[columns[1].id];
        const idValue = row[idColumnName];

        deleteModalMessage(
            value,
            () => handleRemove(idValue),
            () => {
                setRows(rows.filter(row => row[idColumnName] !== idValue));
                setCount(rows.length);
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (rows === undefined ? 0 : rows.length) - page * rowsPerPage);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
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
                        {children != null && (
                            <Typography>{children}</Typography>
                        )}
                        {rows.map((row, key) => {
                            if (children == null) {
                                return (
                                    <AutoLoadTableRow
                                        key={"row-" + key}
                                        columns={columns}
                                        row={row}
                                        idColumnName={idColumnName}
                                        handleView={handleView}
                                        handleEdit={handleEdit}
                                        handleRemove={handleRemove != null ? removeDataFunction : null} />
                                );
                            }
                            return null;
                        })}
                        {emptyRows < 0 && dataFetched && (
                            <TableRow style={{ height: 25 * emptyRows }}>
                                <TableCell colSpan={columnCount} align="center">
                                    <TableChartIcon />
                                    <Typography variant="h6" color="textSecondary">
                                        Sem dados!
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {!dataFetched && (
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

AutoLoadTable.propTypes = {
    retrieveDataFunction: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    idColumnName: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default AutoLoadTable;