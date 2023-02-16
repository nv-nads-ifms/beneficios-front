import React from 'react';
import Moment from 'moment';
import { makeStyles } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import DeleteIconButton from '../../../components/CustomIconButtons/DeleteIconButton';

const useStyles = makeStyles({
    cell: {
        width: "150px",
    }
});

export default function ProntuarioFamiliaTableRowComponent(props) {
    const { disabled, row, onRemoveRow } = props;
    const classes = useStyles();

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.pessoa.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.parentesco.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.pessoa.nascimento).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell className={classes.cell}>
                {row.pessoa.idade} anos
            </StyledTableCell>
            {onRemoveRow != null && !disabled && (
                <StyledTableCell align="center" >
                    <DeleteIconButton
                        tooltip="Excluir registro"
                        onClick={() => onRemoveRow(row)} />
                </StyledTableCell>
            )}
        </StyledTableRow>
    );

}