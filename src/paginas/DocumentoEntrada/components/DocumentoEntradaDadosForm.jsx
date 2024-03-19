import React from 'react';
import { Collapse, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { objectContext } from '../../../contexts/objectContext';
import { handleChangeInputComponent, setFieldValue } from '../../../api/utils/util';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

export default function DocumentoEntradaDadosForm(props) {
    const { disabled } = props;

    /* Recuperação do objeto Analise que será manipulado */
    const { object, setObject, emptyObject } = React.useContext(objectContext);

    const wrapper = React.createRef();

    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        if (object != null) {
            setOpen(!object.doacao);
        } else {
            setOpen(!emptyObject.doacao);
        }
    }, [object, emptyObject]);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setObject, object);
    };

    const setDoacao = (event) => {
        const valor = event.target.checked
        setFieldValue('doacao', valor, setObject, object);
        setOpen(!valor);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <DNAAutocomplete
                    id="fornecedor"
                    path="fornecedores"
                    input_label="Fornecedor"

                    value={object.fornecedor}
                    placeholder="<< Selecione um Fornecedor >>"
                    disabled={disabled}
                    onChange={handleChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.nome}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={object.doacao}
                            onChange={setDoacao}
                            name="doacao"
                            id="doacao"
                            color="primary"
                            size="medium"
                            disabled={disabled}
                        />
                    }
                    label={"Doação"}
                />
                <Collapse ref={wrapper} in={open} timeout="auto" unmountOnExit>
                    <Grid container spacing={1}>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="processo"
                                label="Nº do Processo"
                                value={object.processo}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined' />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="ata"
                                label="Nº da Ata"
                                value={object.ata}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'/>
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="pregao"
                                label="Nº do Pregão"
                                value={object.pregao}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined' />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="empenhoContabil"
                                label="Nº do Empenho Contábil"
                                value={object.empenhoContabil}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined' />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="contrato"
                                label="Nº do Contrato"
                                value={object.contrato}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'/>
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <TextField
                                id="numeroNotaFiscal"
                                label="Nº da Nota Fiscal"
                                value={object.numeroNotaFiscal}
                                disabled={disabled}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined' />
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="observacao"
                    label="Observação"
                    value={object.observacao}
                    placeholder={"Digite uma observação se necessário"}
                    
                    onChange={handleChange}
                    fullWidth
                    variant='outlined'

                    minRows={4}
                    multiline
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
}