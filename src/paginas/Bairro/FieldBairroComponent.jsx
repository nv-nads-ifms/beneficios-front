import React from "react";

import BairroCadastroModal from "./BairroCadastroModal";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";

export default function FieldBairroComponent(props) {
    const { bairro, callback } = props;

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
                id="bairro"
                path="bairros"
                input_label="<< Bairro >>"
                value={bairro}
                
                onChange={(e, value) => callback(value)}
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                }
                getOptionLabel={(option) => option.nome}
                input_modal={true}
                input_handle_modal={handleShowCadastro}
            />

            <BairroCadastroModal
                id={bairro != null ? bairro.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />
        </React.Fragment>
    );
}