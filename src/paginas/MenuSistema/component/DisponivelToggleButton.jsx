import React from 'react'
import { FormControl, FormGroup, FormLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';

function DisponivelToggleButton(params) {
    const { value, onChange } = params;
    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Disponível</FormLabel>
            <FormGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={value}
                    exclusive
                    onChange={onChange}
                    aria-label="Platform"
                >
                    <ToggleButton value={true}>Sim</ToggleButton>
                    <ToggleButton value={false}>Não</ToggleButton>
                </ToggleButtonGroup>
            </FormGroup>
        </FormControl>
    );
}


export default DisponivelToggleButton;