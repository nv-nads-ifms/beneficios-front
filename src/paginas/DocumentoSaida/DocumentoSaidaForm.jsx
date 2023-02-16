import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { emptyDocumentoSaida } from '../../models/DocumentoSaida';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';

export default function DocumentoSaidaForm(props) {
    const { value, disabled, callback } = props;

    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);

    React.useEffect(() => {
        if (value != null) {
            setDocumentoSaida(value);
        } else {
            setDocumentoSaida(emptyDocumentoSaida);
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
            ...documentoSaida,
            [fieldname]: value
        });
    }

    return (
        <Grid container spacing={1} direction="column">
            <Grid item>
                <ComboUnidadeAtendimento
                    id="unidadeAtendimento"
                    value={documentoSaida.unidadeAtendimento}
                    label="Unidade de Atendimento Origem"
                    disabled={disabled}
                    callback={(value) => setFieldValue('unidadeAtendimento', value)}
                />
            </Grid>
            <Grid item>
                <CustomTextField
                    id="observacao"
                    label="Observação"
                    value={documentoSaida.observacao}
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