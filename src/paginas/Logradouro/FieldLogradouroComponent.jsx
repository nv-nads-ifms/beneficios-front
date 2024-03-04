import React from "react";

import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import LogradouroForm from "./LogradouroForm";
import { DNAStatus } from "../../api/utils/constants";

const path = "logradouros";

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
                path={path}
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

            <LogradouroForm
                id_value={0}
                datacontrol={DNAStatus.EDIT}
                
                open={openCadastro}
                on_close_func={handleCloseCadastro}
                data_source_url={path}
            />
            
        </React.Fragment>
    );
}