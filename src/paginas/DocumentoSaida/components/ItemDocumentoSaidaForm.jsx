import React from 'react';
import { Box, Card, CardContent, Grid, TextField } from '@mui/material';
import FieldBeneficioComponent from '../../Beneficio/Components/FieldBeneficioComponent';
import AddButton from '../../../components/CustomButtons/AddButton';
import CustomInteger from '../../../components/CustomFields/CustomInteger';
import { emptyItemDocumentoSaida, validarItemDocumentoSaida } from '../../../models/DocumentoSaida';
import { showErrorMessages } from '../../../api/utils/modalMessages';
import { objectContext } from '../../../contexts/objectContext';
import { handleChangeInputComponent, setFieldValue } from '../../../api/utils/util';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import DNADataGrid from '../../../components/V1.0.0/DNADataGrid';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

const columns = [
    { field: 'numero', headerName: 'N.º do Item', width: 90 },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de Atendimento',
        width: 180,
        valueGetter: ({ value }) => value.numeroDaUnidade
    },
    {
        field: 'beneficioEventual',
        headerName: 'Benefício Eventual',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    },
    {
        field: 'quantidade',
        headerName: 'Quantidade',
        width: 150,
    }
];

function ItemDocumentoSaidaForm(props) {
    const { disabled } = props;

    /* Recuperação do objeto Analise que será manipulado */
    const { object, setObject } = React.useContext(objectContext);

    const [item, setItem] = React.useState(emptyItemDocumentoSaida);
    const [itens, setItens] = React.useState([]);

    React.useEffect(() => {
        if (object == null) {
            setItens([]);
        } else {
            setItens(object.itens);
        }
    }, [object]);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setItem, item);
    };

    const setBeneficio = (value) => {
        setItem({
            ...item,
            beneficioEventual: value,
        });
    }

    const handleDelete = (value) => () => {
        const list = itens.filter(obj => !(
            obj.beneficioEventual.id === value.beneficioEventual.id &&
            obj.unidadeAtendimento.id === value.unidadeAtendimento.id
        ));

        setItens(list);
        setFieldValue('itens', list, setObject, object);
    }

    const handleSave = () => {
        const data = validarItemDocumentoSaida(item, itens, object);
        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            let list = [];
            list = list.concat(itens);

            if (item.numero === "") {
                list.push(item);
            } else {
                const index = itens.findIndex(obj => (
                    obj.beneficioEventual.id === item.beneficioEventual.id &&
                    obj.unidadeAtendimento.id === item.unidadeAtendimento.id
                ));

                if (index !== -1) {
                    list[index] = item;
                }
            }
            
            setItens(list);
            setFieldValue('itens', list, setObject, object);
            setItem(emptyItemDocumentoSaida);
        }
    }

    const actionColumn = {
        field: "actions",
        headerName: "Ações",
        width: 140,
        pinnable: false,
        type: 'actions',
        getActions: (params) => {
            let columns = [
                <GridActionsCellItem
                    disabled={disabled}
                    icon={<Delete />}
                    label="Excluir"
                    onClick={handleDelete(params.row)}
                />,
            ];

            return columns;
        }
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1} alignItems="center" >
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id='unidadeAtendimento'
                            path="unidades-de-atendimento"
                            placeholder="<< Selecione uma Unidade de Atendimento >>"
                            input_label={"Unidade de Atendimento de Destino"}
                            value={item.unidadeAtendimento}
                            disabled={disabled}
                            onChange={handleChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.numeroDaUnidade + " - " +
                                option.nome + (option.matriz ? " [Matriz]" : "")}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FieldBeneficioComponent
                            beneficio={item.beneficioEventual}
                            callback={setBeneficio}
                            disabled={disabled}
                            unidadeAtendimento={object.unidadeAtendimento}
                        />
                    </Grid>
                    <Grid item lg={4} md={8} sm={12}>
                        <TextField
                            id="quantidade"
                            label="Quantidade"
                            value={item.quantidade}
                            disabled={disabled}
                            InputProps={{
                                inputComponent: CustomInteger,
                            }}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={12}>
                        <AddButton
                            disabled={disabled}
                            type="button"
                            onClick={handleSave} />
                    </Grid>
                </Grid>
                <Box sx={{
                    height: 320,
                    width: '100%',
                    mt: 1
                }}>
                    <DNADataGrid
                        getRowId={(row) => row.beneficioEventual.id}
                        rows={itens}
                        rowCount={itens.length}

                        columns={[...columns, actionColumn]}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default ItemDocumentoSaidaForm;