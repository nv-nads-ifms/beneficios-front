import React from 'react';
import { TipoAvaliacao } from '../api/utils/constants';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function TipoAvaliacaoComponent(props) {
    const { disabled } = props;
    return (
        <FormControl disabled={disabled} sx={{ border: 1, borderColor: 'lightgray', borderRadius: 5, pl: 2, pr: 2, color: 'inherit' }}>
            <FormLabel id={props.id}>Tipo de Avaliação</FormLabel>
            <RadioGroup
                {...props}
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel name={props.name} value={TipoAvaliacao.INTERNA} control={<Radio />} label="Interna" />
                <FormControlLabel name={props.name} value={TipoAvaliacao.EXTERNA} control={<Radio />} label="Externa" />
            </RadioGroup>
        </FormControl>
    );
}

export default TipoAvaliacaoComponent;