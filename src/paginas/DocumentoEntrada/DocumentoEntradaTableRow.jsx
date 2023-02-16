import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';
import { Status } from '../../api/utils/constants';

export default function DocumentoEntradaTableRow(props) {
    const { row, onView, onEdit, onRemove } = props;
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
    ];
    const aNotStatus = [Status.PARCIAL, Status.FINALIZADO];

    if (aNotStatus.indexOf(row.status) < 0) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    }
    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.doacao == null || row.doacao === false ? (
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >{row.processo}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Processo</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.ata}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Ata</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.pregao}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Pregão</Typography>}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >{row.empenhoContabil}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Empenho Contábil</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.contrato}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Contrato</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.numeroNotaFiscal}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Nota Fiscal</Typography>}
                            />
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItemText
                            primary={<Typography variant="body2" >Os itens foram Doados</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Doação</Typography>}
                        />

                    </List>
                )}
            </StyledTableCell>
            <StyledTableCell>
                {row.fornecedor.nome}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}