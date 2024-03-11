import React, { useState } from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { Box, FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNADataGrid from '../../components/V1.0.0/DNADataGrid';

const emptyDoc = {
    ...emptyBaseObject,
    disponivel: false,
    tipoConcessao: false,
    estoque: []
}

const columns = [
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de Atendimento',
        minWidth: 100,
        flex: 1,
        renderCell: (value) => value.nome ? value.nome : "UA não Encontrado"
    },
    {
        field: 'bairro',
        headerName: 'Bairro',
        minWidth: 100,
        flex: 1,
        renderCell: (value) => value.nome ? value.nome : "Bairro não Encontrado",
    },
    {
        field: 'cidade',
        headerName: 'Cidade',
        minWidth: 100,
        flex: 1,
        renderCell: (value) => value.nome ? value.nome : "Cidade não Encontrado",
    },
];

export default function BeneficioForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [beneficio, setBeneficio] = useState(emptyDoc);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setBeneficio, beneficio);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }


    return (
        <>
            <objectContext.Provider value={{
                object: beneficio,
                setObject: setBeneficio,
                emptyObject: emptyDoc
            }}>
                <DNAFormDialog
                    id_value={id_value}
                    texto_titulo_formulario={"Cadastro de Benefício Eventual"}
                    datacontrol={datacontrol}
                    open={open}
                    data_source_url={data_source_url}
                    on_edit_func={handleEdit}
                    on_close_func={on_close_func}
                    maxWidth={'md'}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ListItemText primary={beneficio.id} secondary="Código" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='nome'
                                value={beneficio.nome}
                                label={"Digite o nome do Benefício Eventual"}
                                variant='outlined'
                                fullWidth
                                disabled={datacontrol === DNAStatusComponent.VIEW}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                label="Beneficio referente a outro tipo de concessão?"
                                control={
                                    <Switch
                                        checked={beneficio.tipoConcessao}
                                        onChange={handleChange}
                                        name="tipoConcessao"
                                        color="primary"
                                        size="medium"
                                    />
                                }

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ height: 410 }}>
                                <DNADataGrid
                                    rows={beneficio.estoque}
                                    columns={columns}
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </DNAFormDialog>
            </objectContext.Provider>
        </>
    )
}