import React from "react";

import { formContext } from "../../contexts/formContext";

import PessoaListagemModal from "./PessoaListagemModal";
import SearchIconButton from "../../components/CustomIconButtons/SearchIconButton";
import AddIconButton from "../../components/CustomIconButtons/AddIconButton";
import EditIconButton from "../../components/CustomIconButtons/EditIconButton";
import ClearIconButton from "../../components/CustomIconButtons/ClearIconButton";
import { emptyPessoa } from "../../models/Pessoa";
import { InputAdornment, TextField } from "@mui/material";
import { Person } from "@mui/icons-material";
import { DNAStatus } from "../../api/utils/constants";
import PessoaForm from "./PessoaForm";

export default function FieldPessoaComponent(props) {
    const { disabled, pessoa, callback, onlySearch } = props;

    /* Atributos de controle do formulário modal */
    const [dataControl, setDataControl] = React.useState(DNAStatus.EDIT);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const [nome, setNome] = React.useState('');
    const [openCadastro, setOpenCadastro] = React.useState(false);
    const [openConsulta, setOpenConsulta] = React.useState(false);

    React.useEffect(() => {
        if (pessoa != null) {
            setNome(pessoa.nome);
        } else {
            setNome('');
        }
    }, [pessoa]);

    const handleShowCadastro = () => {
        setFormId(0);
        setOpenCadastro(true);
    };

    const handleShowConsulta = () => {
        setOpenConsulta(true);
    };

    const handleCloseCadastro = () => {
        setOpenCadastro(false);
        setFormId(-1);
    };

    const handleCloseConsulta = () => {
        setOpenConsulta(false);
    };

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpenCadastro
        }}>
            <TextField
                id="nome"
                label="Nome da pessoa"
                placeholder="Buscar pelo nome da pessoa"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {(onlySearch != null || pessoa == null || pessoa === emptyPessoa) && (
                                <SearchIconButton
                                    disabled={disabled}
                                    tooltip="Buscar por uma Pessoa"
                                    onClick={handleShowConsulta} />
                            )}
                            {onlySearch == null && (
                                (pessoa == null || pessoa === emptyPessoa) ? (
                                    <AddIconButton
                                        disabled={disabled}
                                        tooltip="Adicionar uma Pessoa"
                                        onClick={handleShowCadastro} />
                                ) : (
                                    <React.Fragment>
                                        <EditIconButton
                                            disabled={disabled}
                                            tooltip="Alterar dados da Pessoa"
                                            onClick={handleShowCadastro} />
                                        <ClearIconButton
                                            disabled={disabled}
                                            tooltip="Limpar pessoa"
                                            onClick={() => callback(null)} />
                                    </React.Fragment>
                                )
                            )}
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                disabled={true}
                readOnly={true}
                fullWidth
                value={nome}
            />

            <PessoaForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={openCadastro}
                on_close_func={handleCloseCadastro}
                data_source_url={'pessoas'}
            />

            <PessoaListagemModal
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
        </formContext.Provider>
    );
}