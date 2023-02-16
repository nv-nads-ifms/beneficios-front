import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function CustomRowAutoLoadTable(props) {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    const { retrieveDataFunction, columns, idColumnName, handleEdit, handleRemove,
        cellRenderer } = props;

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
        const params = getRequestParams(page, rowsPerPage);
        retrieveDataFunction(params)
            .then(r => r.json())
            .then((data) => {
                setRows(data.content);
                setRowsPerPage(data.pageable.pageSize);
                setCount(data.totalElements);
                setPage(data.number);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [retrieveDataFunction, setRows, setRowsPerPage,
        setCount, setPage, page, rowsPerPage]);

    const removeDataFunction = (idValue) => {
        if (window.confirm("Deseja remover esse dado?")) {
            handleRemove(idValue)
                .then(() => {
                    setRows(rows.filter(row => row[idColumnName] !== idValue));
                    setCount(rows.length);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row[idColumnName]}>
                                    {cellRenderer(row)}
                                    {/* {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })} */}
                                    <TableCell align="right" >
                                        <IconButton
                                            onClick={() => handleEdit(row[idColumnName])}
                                            aria-label="alterar">
                                            <EditOutlined />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => removeDataFunction(row[idColumnName])}
                                            aria-label="delete">
                                            <DeleteOutlined />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 25 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
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

CustomRowAutoLoadTable.propTypes = {
    retrieveDataFunction: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    idColumnName: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    cellRenderer: PropTypes.func.isRequired,
};

export default CustomRowAutoLoadTable;