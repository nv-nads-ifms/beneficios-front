import React from "react";

import { formContext } from "../../contexts/formContext";
import { DNAStatus } from "../../api/utils/constants";
import DNADefaultDialogListForm from "../../components/V1.0.0/forms/DNADefaultDialogListForm";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import { Grid, TextField } from "@mui/material";
import FuncionarioForm from "./FuncionarioForm";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "nome",
        headerName: "Nome",
        minWidth: 150,
        flex: 1,
    },
    {
        field: "nascimento",
        headerName: "Nascimento",
        width: 150,
    },
    {
        field: "funcao",
        headerName: "Função",
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => {
            return value.nome;
        },
    },
    {
        field: "unidadeAtendimento",
        headerName: "Unidade de Atendimento",
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => {
            return value.nome;
        },
    },
];

function FuncionarioConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "funcionarios";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState("");
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(null);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(-1);
    };

    return (
        <formContext.Provider
            value={{
                setFormId: setFormId,
                setDataControl: setDataControl,
                setOpen: setOpen,
            }}
        >
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle="Consultar Funcionários"
                filterparams={{
                    nome: nome,
                    unidadeAtendimentoId:
                        unidadeAtendimento != null ? unidadeAtendimento.id : "",
                }}
                columns={columns}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            value={nome}
                            label={"Buscar por nome"}
                            variant="outlined"
                            fullWidth
                            onChange={(event) => setNome(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="unidadeAtendimento"
                            fullWidth
                            path={`unidades-de-atendimento`}
                            input_label={"Unidade de Atendimento"}
                            value={unidadeAtendimento}
                            onChange={(event, value) =>
                                setUnidadeAtendimento(value)
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <FuncionarioForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={handleClose}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

export default FuncionarioConsulta;
