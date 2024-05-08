import React from 'react';
import { extractCapitalizeLetters } from '../../../api/utils/stringUtils';
import { RecentActors } from '@mui/icons-material';
import { Chip } from '@mui/material';

export default function ChipDocumentoComponent(props) {
    const { documento, color, onEdit, onDelete, ...others } = props;

    const nome = documento.tipoDocumento.nome;
    return (
        <Chip
            {...others}
            
            clickable={true}
            icon={<RecentActors />}
            label={extractCapitalizeLetters(nome) + ": " + documento.numero}
            onDelete={onDelete}
            onClick={onEdit}
            color={color != null ? color : "primary"}
        />
    );
}