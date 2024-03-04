import React from "react";

import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import { DNAStatus } from "../../api/utils/constants";
import CidadeForm from "./CidadeForm";

const path = 'cidades';

export default function FieldCidadeComponent(props) {
    const { cidade, callback } = props;
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
                id="cidade"
                path={path}
                input_label="<< Cidade >>"
                value={cidade}

                onChange={(e, value) => callback(value)}
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                }
                getOptionLabel={(option) => option.nome}
                input_modal={true}
                input_handle_modal={handleShowCadastro}
            />

            <CidadeForm
                id_value={0}
                datacontrol={DNAStatus.EDIT}
                
                open={openCadastro}
                on_close_func={handleCloseCadastro}
                data_source_url={path}
            />
        </React.Fragment>
    );
}