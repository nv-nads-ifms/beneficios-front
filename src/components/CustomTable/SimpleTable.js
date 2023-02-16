import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, StyledTableRow } from './AutoLoadTable';
import { Card, CardHeader, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 350,
    },
    cell: {
        width: "150px",
    },
    checkbox: {
        width: "50px",
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
}));

function SimpleTable(props) {
    const { children, emptyRows, columns, checkComponent, titleCheckComponent,
        subTitleCheckComponent, notShowActions } = props;
        
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
                avatar={checkComponent}
                title={titleCheckComponent}
                subheader={subTitleCheckComponent}
            />
            <Divider />

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="custom table" size="small">
                    <TableHead>
                        <TableRow>
                            {checkComponent != null && (
                                <StyledTableCell className={classes.checkbox} />
                            )}
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            {(notShowActions == null || notShowActions === false) && (
                                <StyledTableCell align="center" className={classes.cell}>Ações</StyledTableCell>
                            )}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children}
                        {emptyRows === 0 && (
                            <StyledTableRow style={{ height: 25 * emptyRows }}>
                                <StyledTableCell colSpan={6}>
                                    <Typography variant="body1" align="center" color="textSecondary">
                                        {"<< Lista de dados vazia >>"}
                                    </Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default SimpleTable;