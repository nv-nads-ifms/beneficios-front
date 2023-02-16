import { Collapse, FormControlLabel, Grid, Switch } from '@material-ui/core';
import React from 'react';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import ComboFornecedor from '../Fornecedor/Component/ComboFornecedor';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';

export default function DocumentoEntradaForm(props) {
    const { value, disabled, callback } = props;
    const wrapper = React.createRef();

    const [open, setOpen] = React.useState(true);
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    React.useEffect(() => {
        if (value != null) {
            setDocumentoEntrada(value);
            setOpen(!value.doacao);
        } else {
            setDocumentoEntrada(emptyDocumentoEntrada);
            setOpen(!emptyDocumentoEntrada.doacao);
        }
    }, [value]);

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setFieldValue(fieldname, value);
    }

    const setFieldValue = (fieldname, value) => {
        callback({
            ...documentoEntrada,
            [fieldname]: value
        });
    }

    const setDoacao = (event) => {
        const valor = event.target.checked
        setFieldValue("doacao", valor);
        setOpen(!valor);
    }

    return (
        <Grid container spacing={1}>
            <Grid item md={12} lg={6}>
                <ComboUnidadeAtendimento
                    id="unidadeAtendimento"
                    value={documentoEntrada.unidadeAtendimento}
                    label="Unidade de Atendimento"
                    disabled={disabled}
                    callback={(value) => setFieldValue('unidadeAtendimento', value)}
                />
            </Grid>
            <Grid item md={12} lg={6}>
                <ComboFornecedor
                    id="fornecedor"
                    value={documentoEntrada.fornecedor}
                    disabled={disabled}
                    callback={(value) => setFieldValue("fornecedor", value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={documentoEntrada.doacao}
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
                            <CustomTextField
                                id="processo"
                                label="Nº do Processo"
                                value={documentoEntrada.processo}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <CustomTextField
                                id="ata"
                                label="Nº da Ata"
                                value={documentoEntrada.ata}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <CustomTextField
                                id="pregao"
                                label="Nº do Pregão"
                                value={documentoEntrada.pregao}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <CustomTextField
                                id="empenhoContabil"
                                label="Nº do Empenho Contábil"
                                value={documentoEntrada.empenhoContabil}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <CustomTextField
                                id="contrato"
                                label="Nº do Contrato"
                                value={documentoEntrada.contrato}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item lg={2} md={4} sm={6} xs={12}>
                            <CustomTextField
                                id="numeroNotaFiscal"
                                label="Nº da Nota Fiscal"
                                value={documentoEntrada.numeroNotaFiscal}
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <CustomTextField
                    id="observacao"
                    label="Observação"
                    value={documentoEntrada.observacao}
                    placeholder={"Digite uma observação se necessário"}
                    onChangeHandler={onChange}
                    rows={4}
                    multiline
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
}