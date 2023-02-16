import React from 'react';
import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

const useStyles = makeStyles({
    cell: {
        width: "150px",
    }
});

function PerfilTableRow(props) {

    const { row, onChangeStatus, handleEdit, handleRemove, handleView } = props;
    const classes = useStyles();

    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => handleView(row.id) },
        { label: 'Alterar', type: ButtonType.EDIT, action: () => handleEdit(row.id) },
        { label: 'Excluir', type: ButtonType.DELETE, action: () => handleRemove(row.id) },
    ];

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.nome}
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
                    label="Ativo"
                />
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}

export default PerfilTableRow;