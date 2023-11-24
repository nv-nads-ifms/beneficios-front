import React from 'react';
import { TipoNotificacao } from '../api/utils/constants';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function TipoNotificacaoComponent(props) {
    const { disabled } = props;
    return (
        <FormControl disabled={disabled} sx={{ border: 1, borderColor: 'lightgray', borderRadius: 5, pl: 2, pr: 2, color: 'inherit' }}>
            <FormLabel id="row-radio-buttons-group-label">Tipo de Notificação</FormLabel>
            <RadioGroup
                {...props}
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel name={props.name} value={TipoNotificacao.EMAIL} control={<Radio />} label="E-mail" />
                <FormControlLabel name={props.name} value={TipoNotificacao.SMS} control={<Radio />} label="SMS" />
            </RadioGroup>
        </FormControl>
    );
}

export default TipoNotificacaoComponent;