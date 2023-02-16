import React from 'react';
import { Chip } from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { extractCapitalizeLetters } from '../../../api/utils/stringUtils';

export default function ChipDocumentoComponent(props) {
    const { documento, color, onEdit, onDelete, ...others } = props;

    const descricao = documento.documentoDto.descricao;
    return (
        <Chip
            {...others}
            clickable={true}
            icon={<RecentActorsIcon />}
            label={extractCapitalizeLetters(descricao) + ": " + documento.numero}
            onDelete={onDelete}
            onClick={onEdit}
            color={color != null ? color : "primary"}
        />
    );
}