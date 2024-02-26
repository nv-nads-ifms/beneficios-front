import React from "react";

import LogradouroCadastroModal from "./LogradouroCadastroModal";

import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";

export default function FieldLogradouroComponent(props) {
    const { logradouro, callback } = props;
    
    const [openCadastro, setOpenCadastro] = React.useState(false);

    const handleShowCadastro = () => {
        setOpenCadastro(true);
    };

    const handleCloseCadastro = () => {
        setOpenCadastro(false);
    };

    return (
        <React.Fragment>
            <DNAAutocomplete
                id="logradouro"
                path="logradouros"
                input_label="<< Logradouro >>"
                value={logradouro}
                
                onChange={(e, value) => callback(value)}
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                }
                getOptionLabel={(option) => option.nome}
                input_modal={true}
                input_handle_modal={handleShowCadastro}
            />

            <LogradouroCadastroModal
                id={logradouro != null ? logradouro.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />
        </React.Fragment>
    );
}