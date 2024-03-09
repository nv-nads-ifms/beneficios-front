
import React from "react";
import Moment from 'moment';

import FieldPessoaComponent from "../../Pessoa/FieldPessoaComponent";
import AddButton from "../../../components/CustomButtons/AddButton";
import { Grid } from "@material-ui/core";

import DNAAutocomplete from "../../../components/V1.0.0/DNAAutocomplete";
import { objectContext } from "../../../contexts/objectContext";
import EditDataGridComponent from "../../../components/V1.0.0/EditDataGridComponent";

const columns = [
    {field: 'id', headerName: 'ID', width: 50}, 
    {
        field: 'pessoa',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => params.value.nome
    },
    {
        field: 'parentesco',
        headerName: 'Parentesco',
        width: 150,
        valueGetter: (params) => params.value.nome
    },
    {
        field: 'nascimento',
        headerName: 'Nascimento',
        width: 180,
        renderCell: (params) => {
            return (
                Moment(params.row.pessoa.nascimento).format('DD/MM/Y hh:mm:ss a')
            );
        }
    },
    {
        field: 'idade',
        headerName: 'Idade',
        width: 180,
        renderCell: (params) => {
            return (
                params.row.pessoa.idade
            );
        }
    },
];

const emptyDependente = {
    id: null,
    pessoa: null,
    parentesco: null,
};

export default function ProntuarioFamiliaListagemComponent(props) {
    const { disabled } = props;

    const { object, setObject } = React.useContext(objectContext);

    const [dependente, setDependente] = React.useState(emptyDependente);
    
    const handleAdd = () => {
        if (dependente.pessoa == null) {
            alert("Uma pessoa deve ser informada.");
        } else if (dependente.parentesco == null) {
            alert("Um parentesco com o Titular deve ser informado.");
        } else {
            setObject({
                ...object,
                dependentes: [
                    ...object.dependentes,
                    dependente
                ],
            });
            setDependente(emptyDependente);
        }
    }

    const handleUpdateRows = (values) => {
        setObject({
            ...object,
            dependentes: values,
        });
    }

    const setPessoa = (pessoa) => {
        setDependente({
            ...dependente,
            id: pessoa != null ? pessoa.id : '',
            pessoa: pessoa,
        });
    }

    const setParentesco = (value) => {
        setDependente({
            ...dependente,
            parentesco: value,
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={1} direction="row" alignItems="center">
                <Grid item xs={12} lg={5}>
                    <FieldPessoaComponent
                        disabled={disabled}
                        id="pessoa"
                        name="pessoa"
                        pessoa={dependente.pessoa}
                        callback={setPessoa} />
                </Grid>
                <Grid item xs={12} md={10} lg={5}>
                    <DNAAutocomplete
                        id="parentesco"
                        path={"parentescos"}
                        input_label="<< Selecione um Parentesco >>"
                        value={dependente.parentesco}
                        disabled={disabled}
                        onChange={(event, newValue) => setParentesco(newValue)}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={(option) => option.nome}
                        input_modal={true}
                        input_modal_title={"Cadastrar um novo Parentesco"}
                    />
                </Grid>
                <Grid item xs={12} md={2} lg={2} container direction="column" alignContent="flex-end">
                    <AddButton
                        disabled={disabled}
                        type="button"
                        onClick={() => handleAdd()} />
                </Grid>
            </Grid>
            <EditDataGridComponent
                height={250}
                
                idRowColumnName={'id'}
                rows={object.dependentes}
                setRows={handleUpdateRows}
                columns={columns}
                disabled={disabled}
                disableEdit={true}
             />
        </React.Fragment>
    );
}