import React from 'react';
import { List, Typography, ListItemText, Card, CardHeader, Avatar } from "@material-ui/core";
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import { extractCapitalizeLetters } from '../../api/utils/stringUtils';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

export default function PessoaTableRow(props) {
    const { row, onSelectRow, onGerarAtendimento, onView, onEdit, onRemove } = props;
    
    const buttons = [];
    if (onSelectRow != null) {
        buttons.push({ label: 'Selecionar', type: ButtonType.SELECT, action: () => onSelectRow(row) });
    } 
    
    if (onGerarAtendimento != null) {
        buttons.push({ label: 'Gerar atendimento', type: ButtonType.GENERATOR, action: () => onGerarAtendimento(row) });
    }
    
    if (onView != null) {
        buttons.push({ label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) });
    }
    
    if (onEdit != null) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    }
    
    if (onRemove != null) {
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    }

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.id}
            </StyledTableCell>
            <StyledTableCell>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="pessoa"
                                src={"data:image/png;base64," + row.foto} />
                        }
                        title={row.nome}
                    />
                </Card>
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.nascimento).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell>
                <List dense={true}>
                    {row.documentos.map(obj => (
                        <React.Fragment>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        {obj.numero}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        Número do {extractCapitalizeLetters(obj.documento.nome)}
                                    </Typography>
                                }
                            />
                        </React.Fragment>
                    ))}
                </List>
            </StyledTableCell>
            <StyledTableCell>
                <List dense={true}>
                    {row.contatos.map(obj => (
                        <React.Fragment>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        {obj.descricao}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        {obj.tipoContato.nome}
                                    </Typography>
                                }
                            />
                        </React.Fragment>
                    ))}
                </List>
            </StyledTableCell>
            <StyledTableCell>
                {row.escolaridade.nome}
            </StyledTableCell>
            <StyledTableCell align="center">                
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}