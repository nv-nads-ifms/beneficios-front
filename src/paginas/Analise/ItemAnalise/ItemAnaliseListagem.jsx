import React from 'react';
import { Box, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";

import { emptyItemAnalise, validarItemAnalise } from '../../../models/Analise';
import CustomInteger from '../../../components/CustomFields/CustomInteger';
import AddButton from '../../../components/CustomButtons/AddButton';
import FieldBeneficioComponent from '../../Beneficio/Components/FieldBeneficioComponent';

import { objectContext } from '../../../contexts/objectContext';
import { handleChangeInputComponent, setFieldValue } from '../../../api/utils/util';
import { showErrorMessages } from '../../../api/utils/modalMessages';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import DNADataGrid from '../../../components/V1.0.0/DNADataGrid';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'beneficioEventual',
        headerName: 'Benefício Eventual',
        minWidth: 200,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    },
    {
        field: 'quantidade',
        headerName: 'Quantidade',
        width: 150,
    }
];

export default function ItemAnaliseListagem(props) {
    const { disabled } = props;
    /* Recuperação do objeto Analise que será manipulado */
    const { object, setObject } = React.useContext(objectContext);

    const [itemAnalise, setItemAnalise] = React.useState(emptyItemAnalise);
    const [itens, setItens] = React.useState([]);

    React.useEffect(() => {
        if (object == null) {
            setItens([]);
        } else {
            setItens(object.itens);
        }
    }, [object]);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setItemAnalise, itemAnalise);
    };

    const setBeneficio = (value) => {
        setItemAnalise({
            ...itemAnalise,
            beneficioEventual: value,
            unidadeAtendimento: object.atendimento.prontuario.unidadeAtendimento,
        });
    }

    const handleDelete = (value) => () => {
        const list = itens.filter(obj => !(
            obj.id === value.id &&
            obj.beneficioEventual.id === value.beneficioEventual.id
        ));

        setItens(list);
        setFieldValue('itens', list, setObject, object);
    }

    const handleSave = () => {
        const data = validarItemAnalise(itemAnalise, itens, object.atendimento.prontuario.unidadeAtendimento);
        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            let list = [];
            list = list.concat(itens);

            if (itemAnalise.id === "") {
                list.push(itemAnalise);
            } else {
                const index = list.findIndex(obj => (
                    obj.id === itemAnalise.id &&
                    obj.beneficioEventual.id === itemAnalise.beneficioEventual.id
                ));

                if (index !== -1) {
                    list[index] = itemAnalise;
                }
            }

            setItens(list);
            setFieldValue('itens', list, setObject, object);
            setItemAnalise(emptyItemAnalise);
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
            <CardHeader subheader="Itens autorizados" />
            <CardContent>
                <Grid container spacing={2} alignItems="center" >
                    <Grid item xs={6}>
                        <FieldBeneficioComponent
                            beneficio={itemAnalise.beneficioEventual}
                            unidadeAtendimento={object.atendimento.prontuario.unidadeAtendimento}
                            callback={setBeneficio}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="quantidade"
                            label="Quantidade"
                            value={itemAnalise.quantidade}
                            InputProps={{
                                inputComponent: CustomInteger,
                            }}
                            variant='outlined'
                            fullWidth
                            onChange={handleChange}
                            disabled={disabled} />
                    </Grid>
                    <Grid item xs={2}>
                        <AddButton
                            type="button"
                            onClick={handleSave}
                            disabled={disabled} />
                    </Grid>
                </Grid>
                <Box sx={{
                    height: 320,
                    width: '100%',
                    mt: 1
                }}>
                    <DNADataGrid
                        getRowId={(row) => row.sequencia}
                        rows={itens}
                        rowCount={itens.length}

                        columns={[...columns, actionColumn]}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}