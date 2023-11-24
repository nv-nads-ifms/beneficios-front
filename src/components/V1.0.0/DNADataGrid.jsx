import React from 'react';
import PropTypes from 'prop-types';

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import DNANoData from './DNANoData';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

export function CustomNoRowsOverlay(params) {
    const { message } = params;
    return (
        <StyledGridOverlay>
            <DNANoData />
            <Box sx={{ mt: 1 }}>
                {message != null ? message : "Sem dados!"}
            </Box>
        </StyledGridOverlay>
    );
}

function DNADataGrid(props) {

    return (
        <StripedDataGrid
            {...props}

            pageSizeOptions={[5, 10, 25, 50, 100]}
            pagination
            
            disableSelectionOnClick
            disableRowSelectionOnClick

            keepNonExistentRowsSelected

            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            slots={{
                ...props.slots,
                noRowsOverlay: CustomNoRowsOverlay,
            }}
        />
    );
}

DNADataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    rowCount: PropTypes.number,
    apiGrid: PropTypes.any,
    slots: PropTypes.object,
    slotProps: PropTypes.object,
}

export default DNADataGrid;