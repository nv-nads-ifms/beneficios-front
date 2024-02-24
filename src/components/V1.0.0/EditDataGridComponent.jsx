import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import DNADataGrid from './DNADataGrid';
import { GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';

function EditDataGridComponent(props) {
    const { height, getRowId, idRowColumnName, columns, rows, setRows, 
        apiRef, rowHeight, slots, slotProps, disabled, disableDelete, disableEdit } = props;

    const [rowModesModel, setRowModesModel] = React.useState({});

    const updateRows = (items) => {
        setRows(items);
    }

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row[idRowColumnName] === id);
        if (editedRow.isNew) {
            updateRows(rows.filter((row) => row[idRowColumnName] !== id));
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleDeleteClick = (id) => () => {
        updateRows(rows.filter((row) => row[idRowColumnName] !== id));
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        updateRows(rows.map((row) => (row[idRowColumnName] === newRow[idRowColumnName] ? updatedRow : row)));
        return updatedRow;
    };

    const actionColumns = {
        field: 'actions',
        type: 'actions',
        headerName: 'Ação',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<Save />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                        disabled={disabled}
                    />,
                    <GridActionsCellItem
                        icon={<Cancel />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                        disabled={disabled}
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                    
                    disabled={disabled || disableEdit}
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                    disabled={disabled || disableDelete}
                />,
            ];
        },
    }

    return (
        <Box sx={{mt: 2}}>
            <Box sx={{ height: height }}>
                <DNADataGrid
                    getRowId={getRowId}
                    rows={rows}
                    columns={[...columns, actionColumns]}

                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}

                    apiRef={apiRef}
                    rowHeight={rowHeight}
                    slots={slots}
                    slotProps={slotProps}
                />
            </Box>
        </Box>
    );
}

EditDataGridComponent.propTypes = {
    height: PropTypes.number.isRequired,
    idRowColumnName: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object.isRequired),
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    disableDelete: PropTypes.bool,
    disableEdit: PropTypes.bool,
    getRowId: PropTypes.func,
    apiRef: PropTypes.any,
    slots: PropTypes.object,
    slotProps: PropTypes.object,
}

export default EditDataGridComponent;