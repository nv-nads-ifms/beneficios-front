import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 300,
    },
});

function SimpleLoadTable(props) {
    const classes = useStyles();
    const { rows, columns, idColumnName, handleRemove } = props;

    const emptyRows = rows.length === 0;

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="Simple Load Table" size="small">
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
                            <TableCell align="right" className={classes.cell}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover tabIndex={-1} key={row[idColumnName]}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="right" >
                                        <IconButton
                                            onClick={() => handleRemove(row[idColumnName])}
                                            aria-label="delete">
                                            <DeleteOutlined />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {!emptyRows && (
                            <TableRow style={{ height: 25 }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

SimpleLoadTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    idColumnName: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default SimpleLoadTable;