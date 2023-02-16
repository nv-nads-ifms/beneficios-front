
import React from "react";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import ProntuarioFamiliaTableRowComponent from "./ProntuarioFamiliaTableRowComponent";
import FieldPessoaComponent from "../../Pessoa/FieldPessoaComponent";
import AddButton from "../../../components/CustomButtons/AddButton";
import { Grid } from "@material-ui/core";
import ComboParentesco from "../../Parentesco/Component/ComboParentesco";

const columns = [
    { id: 'nome', label: 'Nome' },
    { id: 'parentesco', label: 'Parentesco' },
    { id: 'nascimento', label: 'Nascimento' },
    { id: 'idade', label: 'Idade' }
];

const emptyDependente = {
    pessoa: null,
    parentesco: null,
};

export default function ProntuarioFamiliaListagemComponent(props) {
    const { disabled, dependentes, callback } = props;
    const [dependente, setDependente] = React.useState(emptyDependente);

    const handleRemove = (composicaoFamilia) => {
        const list = dependentes.map(obj => {
            if (obj.pessoa.id === composicaoFamilia.pessoa.id &&
                obj.parentesco.id === composicaoFamilia.parentesco.id) {
                obj.deleted = true;
            }

            return obj;
        });
        callback(list);;
    }

    const handleAdd = () => {
        if (dependente.pessoa == null) {
            alert("Uma pessoa deve ser informada.");
        } else if (dependente.parentesco == null) {
            alert("Um parentesco com o Titular deve ser informado.");
        } else {
            dependentes.push(dependente);
            callback(dependentes);
            setDependente(emptyDependente);
        }
    }

    const setPessoa = (pessoa) => {
        setDependente({
            ...dependente,
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
        <div>
            {callback != null ? (
                <React.Fragment>
                    <Grid container spacing={1} direction="row" alignItems="center">
                        <Grid item xs={5}>
                            <FieldPessoaComponent
                                disabled={disabled}
                                id="pessoa"
                                name="pessoa"
                                pessoa={dependente.pessoa}
                                callback={setPessoa} />
                        </Grid>
                        <Grid item xs={5}>
                            <ComboParentesco
                                disabled={disabled}
                                id="parentesco"
                                value={dependente.parentesco}
                                callback={setParentesco}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <AddButton
                                disabled={disabled}
                                type="button"
                                onClick={() => handleAdd()} />
                        </Grid>
                    </Grid>
                    <SimpleTable
                        emptyRows={dependentes.length === 0}
                        columns={columns}>
                        {dependentes.map((row, key) => (
                            !row.deleted && (
                                <ProntuarioFamiliaTableRowComponent
                                    key={"row-" + key}
                                    disabled={disabled}
                                    row={row}
                                    onRemoveRow={() => handleRemove(row)} />
                            )
                        ))}
                    </SimpleTable>
                </React.Fragment>
            ) : (
                <SimpleTable
                    emptyRows={dependentes.length === 0}
                    columns={columns}
                    notShowActions>
                    {dependentes.map((row, key) => {
                        return (
                            <ProntuarioFamiliaTableRowComponent
                                key={"row-" + key}
                                row={row} />
                        );
                    })}
                </SimpleTable>
            )}

        </div>
    );
}