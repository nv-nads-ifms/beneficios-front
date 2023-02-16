import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import FieldBeneficioComponent from '../Beneficio/Components/FieldBeneficioComponent';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import AddButton from '../../components/CustomButtons/AddButton';
import SimpleTable from '../../components/CustomTable/SimpleTable';
import ItemDocumentoEntradaListagemTableRow from './ItemDocumentoEntradaTableRow';
import { emptyItemDocumentoEntrada, validarItemDocumentoEntrada } from '../../models/DocumentoEntrada';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import { showErrorMessages } from '../../api/utils/modalMessages';

const columns = [
    { id: 'numero', label: 'N.º do Item' },
    { id: 'beneficio', label: 'Beneficio Eventual' },
    { id: 'quantidade', label: 'Quantidade' },
];

export default function ItemDocumentoEntradaForm(props) {
    const { value, disabled, callback } = props;
    const [item, setItem] = React.useState(emptyItemDocumentoEntrada);
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

    const setValue = (value, fieldname) => {
        setItem({
            ...item,
            [fieldname]: value,
        });
    }

    const onChange = (event, newValue) => {
        let t = event.target;
        let valor = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setValue(valor, fieldname);
    }

    const handleDelete = (value) => {
        const list = itens.map(obj => {
            if (obj.numero === value.numero &&
                obj.beneficioEventual.id === value.beneficioEventual.id) {
                obj.deleted = true;
            }
            return obj;
        });

        setItens(list);
        callback(list);
    }

    const handleSave = () => {
        const data = validarItemDocumentoEntrada(item);
        if (data.length > 0) {
            validarCampos(data);
        } else {
            const index = itens.findIndex(obj => (
                obj.beneficioEventual.id === item.beneficioEventual.id
            ));

            if (index !== -1) {
                itens[index] = item;
            } else {
                itens.push(item);
            }

            setItens(itens);
            callback(itens);
            setItem(emptyItemDocumentoEntrada);
        }
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center" >
                    <Grid item lg={6} xs={12}>
                        <FieldBeneficioComponent
                            beneficio={item.beneficioEventual}
                            unidadeAtendimento={value != null ? value.unidadeAtendimento : emptyUnidadeAtendimento}
                            callback={(value) => setValue(value, 'beneficioEventual')}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item lg={4} md={8} sm={12}>
                        <CustomTextField
                            id="quantidade"
                            label="Quantidade"
                            value={item.quantidade}
                            disabled={disabled}
                            InputProps={{
                                inputComponent: CustomInteger,
                            }}
                            onChangeHandler={onChange} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={12}>
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
                            <ItemDocumentoEntradaListagemTableRow
                                key={"row-" + key}
                                row={row}
                                disabled={disabled}
                                onRemoveRow={() => handleDelete(row)} />
                        )
                    ))}
                </SimpleTable>
            </CardContent>
        </Card>
    );
}