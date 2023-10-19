import React from "react";
import PropTypes from 'prop-types';
import { Divider, Typography } from "@mui/material";

import DNATextfield from "../DNATextfield";
import DNADefaultListForm from "./DNADefaultListForm";

const columns = [
    {
        field: "nome",
        headerName: "Nome",
        flex: 1,
        minWidth: 100,
        editable: false,
        renderCell: (param) => (
            <Typography>
                {`[${param.id}] ${param.value}`}
            </Typography>
        )
    }
];

function DNABaseListForm(props) {
    const { path, text } = props;
    const [nome, setNome] = React.useState('');


    return (
        <DNADefaultListForm
            path={path}
            text={text}
            filterparams={{'nome': nome}}
            columns={columns}
        >
            <DNATextfield
                id="nome"
                fullWidth
                label="Buscar por nome"
                search="true"
                value={nome}
                onChange={(e) => setNome(e.target.value)} />
            <Divider variant="middle" />
        </DNADefaultListForm>
    );
}

DNABaseListForm.propTypes = {
    path: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired
}

export default DNABaseListForm;