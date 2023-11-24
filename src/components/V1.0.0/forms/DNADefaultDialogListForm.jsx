import React from "react";
import PropTypes from 'prop-types';
import {
    Box, Grid, SpeedDial, SpeedDialAction,
    Typography
} from "@mui/material";
import DataService from "../../../api/services/DataServices";
import DNADataGrid from "../DNADataGrid";
import { DNAStatus, emptyData } from "../../../api/utils/constants";
import { convertToParams } from "../../../api/utils/util";
import { formContext } from "../../../contexts/formContext";
import { GridActionsCellItem } from "@mui/x-data-grid";

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddIcon from '@mui/icons-material/Add';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteModalMessage } from "../../../api/utils/modalMessages";


function DNADefaultDialogListForm(props) {
    const { datasourceUrl, formtitle, children, filterparams, columns,
        moreActions, gridHeigh, gridWidth, apiRef, slots, slotProps,
        checkboxSelection, getRowId } = props;

    const dataService = React.useMemo(() => new DataService(`/${datasourceUrl}`), [datasourceUrl]);

    /* Atributos de controle da tabela */
    const [isLoading, setIsLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(emptyData);

    /* Atributos de controle do formulário modal que vem do contexto */
    const { setFormId, setDataControl, setOpen } = React.useContext(formContext);

    const handleNew = React.useCallback(() => {
        setFormId(0);
        setDataControl(DNAStatus.EDIT);
        setOpen(true);
    }, [setFormId, setDataControl, setOpen]);

    const handleEdit = React.useCallback(
        (row) => () => {
            setFormId(row.id);
            setDataControl(DNAStatus.EDIT);
            setOpen(true);
        }, [setFormId, setDataControl, setOpen]);

    const handleView = React.useCallback(
        (row) => () => {
            setFormId(row.id);
            setDataControl(DNAStatus.VIEW);
            setOpen(true);
        }, [setFormId, setDataControl, setOpen]);

    const handleDelete = React.useCallback(
        (row) => () => {
            deleteModalMessage('',
                () => dataService.delete(row.id),
                () => setCount(count + 1));
        }, [count, dataService]);

    const actions = React.useMemo(() => [
        { icon: <FileCopyIcon />, name: 'Duplicar cadastro existente', action: '' },
        { icon: <AddIcon />, name: 'Cadastrar novo registro', action: handleNew },
        { icon: <PrintIcon />, name: 'Imprimir', action: '' },
        { icon: <ShareIcon />, name: 'Compartilhar', action: '' },
    ], [handleNew]);

    const getColumnActions = (params) => {
        let columns = [
            <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Visualizar"
                onClick={handleView(params)}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Excluir"
                onClick={handleDelete(params)}
            />,
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Alterar"
                onClick={handleEdit(params)}
            />
        ];

        if (moreActions != null) {
            moreActions.map((obj, index) => {
                const { label, icon, handleClick } = obj;
                columns.push(
                    <GridActionsCellItem
                        key={index}
                        icon={icon}
                        label={label}
                        onClick={handleClick(params)}
                        showInMenu
                    />
                );
                return obj;
            });
        }

        return columns;
    }

    const actionColumn = {
        field: "actions",
        headerName: "Ações",
        width: 140 + (moreActions != null ? 35 : 0),
        pinnable: false,
        type: 'actions',
        getActions: getColumnActions
    };

    const getParams = React.useCallback(() => {
        return convertToParams({
            ...filterparams,
            page: page,
            size: rowsPerPage,
        });
    }, [filterparams, page, rowsPerPage]);

    React.useEffect(() => {
        setIsLoading(true);

        const params = getParams();

        dataService.getDefaultData(params)
            .then(response => {
                setIsLoading(false);
                setRows(response.data);
                setPage(response.data.number);

                setRowsPerPage(response.data.pageable.pageSize);
                setCount(response.data.totalElements);
            });

    }, [getParams, count, dataService]);

    function handlePaginationModelChange(props) {
        setPage(isNaN(props.page) || props.page === undefined ? 0 : props.page);
        setRowsPerPage(props.pageSize);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant={"h4"}>
                    {formtitle}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                {children}
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    height: gridHeigh != null ? gridHeigh : 350,
                    width: gridWidth != null ? gridWidth : '100%',
                    mt: 1
                }}>
                    <DNADataGrid
                        getRowId={getRowId}
                        rows={rows.content}
                        rowCount={rows.totalElements}
                        loading={isLoading}

                        paginationModel={{ page: page, pageSize: rowsPerPage }}
                        onPaginationModelChange={handlePaginationModelChange}
                        paginationMode="server"

                        columns={[...columns, actionColumn]}
                        checkboxSelection={checkboxSelection}
                        apiRef={apiRef}
                        slots={slots}
                        slotProps={slotProps}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <SpeedDial
                    ariaLabel="Acesso rápido ao menu"
                    direction='left'
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={typeof action.action === "function" ? action.action : null}
                        />
                    ))}
                </SpeedDial>
            </Grid>
        </Grid>
    );
}

DNADefaultDialogListForm.propTypes = {
    datasourceUrl: PropTypes.string.isRequired,
    formtitle: PropTypes.string.isRequired,

    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),

    filterparams: PropTypes.object,
    columns: PropTypes.array.isRequired,
    getRowId: PropTypes.any,
    moreActions: PropTypes.arrayOf(PropTypes.exact({
        label: PropTypes.string.isRequired,
        icon: PropTypes.any.isRequired,
        handleClick: PropTypes.func.isRequired
    })),
    gridHeigh: PropTypes.number,
    gridWidth: PropTypes.number,
    checkboxSelection: PropTypes.bool
}

export default DNADefaultDialogListForm;