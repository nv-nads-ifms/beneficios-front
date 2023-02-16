import React from 'react';
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import CustomTextField from "../../../components/CustomFields/CustomTextField";
import { emptyItemAnalise, validarItemAnalise } from '../../../models/Analise';
import CustomInteger from '../../../components/CustomFields/CustomInteger';
import SimpleTable from '../../../components/CustomTable/SimpleTable';
import ItemAnaliseListagemTableRow from './ItemAnaliseListagemTableRow';
import AddButton from '../../../components/CustomButtons/AddButton';
import FieldBeneficioComponent from '../../Beneficio/Components/FieldBeneficioComponent';
import { emptyUnidadeAtendimento } from '../../../models/UnidadeAtendimento';
import { showErrorMessages } from '../../../api/utils/modalMessages';

const columns = [
    { id: 'beneficio', label: 'Beneficio Eventual' },
    { id: 'quantidade', label: 'Quantidade' },
];

export default function ItemAnaliseListagem(props) {
    const { value, unidadeAtendimento, callback, disabled } = props;
    const [itemAnalise, setItemAnalise] = React.useState(emptyItemAnalise);
    const [itens, setItens] = React.useState([]);

    React.useEffect(() => {
        if (value == null) {
            setItens([]);
        } else {
            setItens(value.itens);
        }
    }, [value]);

    const validarCampos = (value) => {
        showErrorMessages(value);
    }

    const onChangeItem = (event, newValue) => {
        let t = event.target;
        let valor = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setItemAnalise({
            ...itemAnalise,
            [fieldname]: valor,
        });
    }
    
    const setBeneficio = (value) => {
        setItemAnalise({
            ...itemAnalise,
            beneficioEventual: value,
            unidadeAtendimento: unidadeAtendimento,
        });
    }

    const handleDelete = (value) => {
        const list = itens.filter(obj => {
            if (obj.id === value.id &&
                obj.beneficioEventual.id === value.beneficioEventual.id) {
                obj.deleted = true;
            }
            return obj;
        });

        setItens(list);
        callback(list);
    }

    const handleSave = () => {
        const data = validarItemAnalise(itemAnalise, itens, unidadeAtendimento);
        if (data.length > 0) {
            validarCampos(data);
        } else {
            const index = itens.findIndex(obj => (
                obj.beneficioEventual.id === itemAnalise.beneficioEventual.id
            ));

            if (index !== -1) {
                itens[index] = itemAnalise;
            } else {
                itens.push(itemAnalise);
            }
            setItens(itens);
            callback(itens);
            setItemAnalise(emptyItemAnalise);
        }
    }
    
    return (
        <Card>
            <CardHeader subheader="Itens autorizados" />
            <CardContent>
                <Grid container spacing={2} alignItems="center" >
                    <Grid item xs={6}>
                        <FieldBeneficioComponent
                            beneficio={itemAnalise.beneficioEventual}
                            unidadeAtendimento={unidadeAtendimento != null ? unidadeAtendimento : emptyUnidadeAtendimento}
                            callback={setBeneficio}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTextField
                            id="quantidade"
                            label="Quantidade"
                            value={itemAnalise.quantidade}
                            InputProps={{
                                inputComponent: CustomInteger,
                            }}
                            onChangeHandler={onChangeItem}
                            disabled={disabled} />
                    </Grid>
                    <Grid item xs={2}>
                        <AddButton
                            type="button"
                            onClick={handleSave}
                            disabled={disabled} />
                    </Grid>
                </Grid>
                <SimpleTable
                    emptyRows={itens.length === 0}
                    columns={columns}
                >
                    {itens.map((row, key) => (
                        !row.deleted &&
                        (
                            <ItemAnaliseListagemTableRow
                                key={"row-" + key}
                                row={row}
                                onRemoveRow={() => handleDelete(row)}
                                disabled={disabled} />
                        )
                    ))}
                </SimpleTable>
            </CardContent>
        </Card>
    );
}