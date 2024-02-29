import React from 'react'
import { FormControl, FormGroup, FormLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MenuTipo } from '../../../api/utils/constants';

function TipoMenuSistemaToggleButton(params) {
    const { value, onChange, disabled } = params;
    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Tipo de menu</FormLabel>
            <FormGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={value}
                    exclusive
                    onChange={onChange}
                    aria-label="Platform"
                    disabled={disabled}
                >
                    <ToggleButton value={MenuTipo.ADMIN}>Administrador</ToggleButton>
                    <ToggleButton value={MenuTipo.ANALISE}>Analise</ToggleButton>
                    <ToggleButton value={MenuTipo.ATENDIMENTO}>Atendimento</ToggleButton>
                    <ToggleButton value={MenuTipo.CADASTRO}>Cadastro</ToggleButton>
                    <ToggleButton value={MenuTipo.ESTOQUE}>Estoque</ToggleButton>
                    <ToggleButton value={MenuTipo.LOCALIZACAO}>Localização</ToggleButton>
                </ToggleButtonGroup>
            </FormGroup>
        </FormControl>
    );
}


export default TipoMenuSistemaToggleButton;