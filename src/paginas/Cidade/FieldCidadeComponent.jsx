import React from "react";
import CidadeCadastro from "./CidadeCadastro";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";

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
                path="cidades"
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

            <CidadeCadastro
                id={cidade != null ? cidade.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />
        </React.Fragment>
    );
}