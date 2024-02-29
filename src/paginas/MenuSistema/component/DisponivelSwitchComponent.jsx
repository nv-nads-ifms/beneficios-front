import React from 'react'
import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from '@mui/material';

function DisponivelSwitchComponent(props) {
    const { checked, onChange, disabled } = props;
    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Disponível?</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch disabled={disabled} checked={checked} onChange={onChange} name="disponivel" />
                    }
                    label={checked ? 'Sim' : 'Não'}
                />
            </FormGroup>
        </FormControl>
    );
}

export default DisponivelSwitchComponent;