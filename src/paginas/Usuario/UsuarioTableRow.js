import React from 'react';
import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

const useStyles = makeStyles({
    cell: {
        width: "150px",
    }
});

export default function UsuarioTableRow(props) {
    const { row, onChangeStatus, onChangeBloqueio, handleView,
        handleEdit, handleRemove } = props;
    const classes = useStyles();

    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => handleView(row) },
        { label: 'Alterar', type: ButtonType.EDIT, action: () => handleEdit(row) },
        { label: 'Excluir', type: ButtonType.DELETE, action: () => handleRemove(row) },
    ];

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.id}
            </StyledTableCell>
            <StyledTableCell>
                {row.funcionario.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.email}
            </StyledTableCell>
            <StyledTableCell className={classes.cell}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={row.status === "ATIVO"}
                            onChange={(event) => onChangeStatus(event, row.id)}
                            name="status"
                            color="primary"
                            size="medium"
                        />
                    }
                    label={row.status}
                />
            </StyledTableCell>
            <StyledTableCell className={classes.cell}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={row.enabled}
                            onChange={(event) => onChangeBloqueio(event, row.id)}
                            name="enabled"
                            color="primary"
                            size="medium"
                        />
                    }
                    label={row.enabled ? "Autorizado" : "Bloqueado"}
                />
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}