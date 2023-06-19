import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import FieldBeneficioComponent from '../Beneficio/Components/FieldBeneficioComponent';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import AddButton from '../../components/CustomButtons/AddButton';
import SimpleTable from '../../components/CustomTable/SimpleTable';
import ItemDocumentoSaidaListagemTableRow from './ItemDocumentoSaidaTableRow';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import { emptyItemDocumentoSaida, validarItemDocumentoSaida } from '../../models/DocumentoSaida';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';
import { showErrorMessages } from '../../api/utils/modalMessages';

const columns = [
    { id: 'numero', label: 'N.º do Item' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'beneficio', label: 'Beneficio Eventual' },
    { id: 'quantidade', label: 'Quantidade' },
];

export default function ItemDocumentoSaidaForm(props) {
    const { value, disabled, callback } = props;
    const [item, setItem] = React.useState(emptyItemDocumentoSaida);
    const [itens, setItens] = React.useState([]);
    const [sequencia, setSequencia] = React.useState(0);

    React.useEffect(() => {
        if (value == null) {
            setItens([]);
            setSequencia(0);
        } else {
            setItens(value.itens);
            setSequencia(Math.max(value.itens
                .map(o => o.numero === '' ? 0 : o.numero)) + 1);
        }
    }, [value]);

    const validarCampos = (value) => {
        showErrorMessages(value);
    }

    const increment = () => {
        setSequencia(sequencia + 1);
    };

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
                obj.beneficioEventual.id === value.beneficioEventual.id &&
                obj.unidadeAtendimento.id === value.unidadeAtendimento.id) {
                obj.deleted = true;
            }
            return obj;
        });

        setItens(list);
        callback(list);
    }

    const handleSave = () => {
        const data = validarItemDocumentoSaida(item, itens, value);
        if (data.length > 0) {
            validarCampos(data);
        } else {
            const index = itens.findIndex(obj => (
                obj.beneficioEventual.id === item.beneficioEventual.id &&
                obj.unidadeAtendimento.id === item.unidadeAtendimento.id
            ));

            if (index !== -1) {
                itens[index] = item;
            } else {
                itens.push({
                    ...item,
                    numero: sequencia
                });
                
                increment();
            }
            setItens(itens);
            callback(itens);

            setItem(emptyItemDocumentoSaida);
        }
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1} alignItems="center" >
                    <Grid item xs={12}>
                        <ComboUnidadeAtendimento
                            id="unidadeAtendimento"
                            value={item.unidadeAtendimento}
                            label="Unidade de Atendimento Destino"
                            disabled={disabled}
                            callback={(value) => setValue(value, 'unidadeAtendimento')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FieldBeneficioComponent
                            beneficio={item.beneficioEventual}
                            unidadeAtendimento={value != null ? value.unidadeAtendimento : emptyUnidadeAtendimento}
                            callback={(value) => setValue(value, 'beneficioEventual')}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={2}>
                        <AddButton
                            disabled={disabled}
                            type="button"
                            onClick={handleSave} />
                    </Grid>
                </Grid>
                <SimpleTable
                    emptyRows={itens.length === 0}
                    columns={columns}
                >
                    {itens.map((row, key) => (
                        !row.deleted &&
                        (
                            <ItemDocumentoSaidaListagemTableRow
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