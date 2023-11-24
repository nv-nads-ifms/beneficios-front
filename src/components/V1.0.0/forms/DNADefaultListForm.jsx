import React from "react";
import PropTypes from 'prop-types';
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DataService from "../../api/services/DataServices";
import { emptyData } from "../../api/utils/constants";
import DNAFilterPanel from "../panels/DNAFilterPanel";
import DNADataGrid from "../DNADataGrid";
import DNAGridActionButtonGroup from "../button-group/DNAGridActionButtonGroup";

export const getRequestParams = (page, pageSize, anotherParams) => {
    let params = {};

    if (page) {
        params["page"] = page;
    }

    if (pageSize) {
        params["size"] = pageSize;
    }

    if (anotherParams) {
        Object.entries(anotherParams).map(([k, v]) => {
            params[`${k}`] = v;
            return v;
        });
    }

    return params;
};

function DNADefaultListForm(props) {
    const { path, text, children, filterparams, columns, moreActions, gridHeigh, gridWidth } = props;
    const dataService = new DataService(`/${path}`);
    const [isLoading, setIsLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(emptyData);
    let navigate = useNavigate();

    const actionColumn = {
        field: "acoes",
        headerName: "Ações",
        width: 140 + (moreActions != null ? 35 : 0),
        pinnable: false,

        renderCell: (params) => <DNAGridActionButtonGroup
            moreActions={moreActions}
            datasourceUrl={path}
            callbackDelete={() => setCount(count + 1)}
            onView={(e, data) => handleAction('view', data.id)}
            edit_func={(e, data) => handleAction('edit', data.id)}
            {...params} />
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            const params = getRequestParams(page, rowsPerPage, filterparams);
            const response = await dataService.getDefaultData(params);
            setIsLoading(false);
            setRows(response.data);
            setPage(response.data.number);

            setRowsPerPage(response.data.pageable.pageSize);
            setCount(response.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        loadData();
    }, [filterparams, count, page, rowsPerPage]);

    const handleAction = (action, id) => {
        navigate(`/${path}-form/${action}/${id}`);
    };

    return (
        <DNAFilterPanel
            {...props}
            text={text}
            urltonew={`${path}-form/edit/0`}>

            <Container>
                {children}
            </Container>

            <Box sx={{
                height: gridHeigh != null ? gridHeigh : 350,
                width: gridWidth != null ? gridWidth : '100%',
                mt: 1
            }}>
                <DNADataGrid
                    rows={rows.content}
                    rowCount={rows.totalElements}
                    loading={isLoading}
                    page={page}
                    pageSize={rowsPerPage}
                    paginationMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPage) => setRowsPerPage(newPage)}
                    columns={[...columns, actionColumn]}
                />
            </Box>
        </DNAFilterPanel>
    );
}

DNADefaultListForm.propTypes = {
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,

    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,

    filterparams: PropTypes.object,
    columns: PropTypes.array.isRequired,
    moreActions: PropTypes.arrayOf(PropTypes.exact({
        label: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
        handleClick: PropTypes.func.isRequired
    })),
    gridHeigh: PropTypes.number,
    gridWidth: PropTypes.number
}

export default DNADefaultListForm;