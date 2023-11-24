import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DNASexo } from '../api/utils/constants';

export default function DNASexoComponent(props) {
    const { disabled } = props;
    return (
        <FormControl disabled={disabled} sx={{border: 1, borderColor: 'lightgray', borderRadius: 5, pl: 2, pr: 2, color: 'inherit'}}>
            <FormLabel id="row-radio-buttons-group-label">Sexo</FormLabel>
            <RadioGroup
                {...props}
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel name={props.name} value={DNASexo.FEMININO} control={<Radio />} label="Feminino" />
                <FormControlLabel name={props.name} value={DNASexo.MASCULINO} control={<Radio />} label="Masculino" />
            </RadioGroup>
        </FormControl>
    );
}