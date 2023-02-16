import React from 'react';
import { List, ListItemText, Typography } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import { extractCapitalizeLetters } from '../../api/utils/stringUtils';
import ListContatoView from '../Analise/Components/ListContatoView';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

export default function FornecedorTableRow(props) {

    const { row, onView, onEdit, onRemove } = props;
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
        { label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) },
        { label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) },
    ];

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                <List dense={true}>
                    {row.documentos.map(documentoPessoa => (
                        <React.Fragment>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        {documentoPessoa.numero}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        Número do {extractCapitalizeLetters(documentoPessoa.documentoDto.descricao)}
                                    </Typography>
                                }
                            />
                        </React.Fragment>
                    ))}
                </List>
            </StyledTableCell>
            <StyledTableCell>
                {row.contatos.map((obj) => (
                    <ListContatoView contatoPessoa={obj} />
                ))}
            </StyledTableCell>
            <StyledTableCell>
                {row.enderecoDto.logradouroNome + ", " +
                    row.enderecoDto.numero + ", " +
                    row.enderecoDto.bairroNome}
            </StyledTableCell>
            <StyledTableCell>
                {row.enderecoDto.cidadeNome + " - " +
                    row.enderecoDto.ufSigla}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}