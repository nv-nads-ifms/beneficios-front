import React from 'react';
import { Checkbox, FormControlLabel, Switch } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";

function PerfilMenuTableRow(props) {
    const { checkedList, row, onChangeStatus, handleToggle } = props;

    const labelId = `transfer-list-all-item-${row.id}-label`;

    const SwitchPermissionComponent = (props) => {
        const { checked, rowId, name } = props;
        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={(event) => onChangeStatus(event, rowId)}
                        name={name}
                        color="primary"
                        size="medium"
                    />
                }
            />
        );
    }

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <Checkbox
                    onClick={handleToggle}
                    checked={checkedList.indexOf(row) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            </StyledTableCell>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                <SwitchPermissionComponent
                    checked={row.ler}
                    rowId={row.id}
                    name="ler" />
            </StyledTableCell>
            <StyledTableCell>
                <SwitchPermissionComponent
                    checked={row.escrever}
                    rowId={row.id}
                    name="escrever" />
            </StyledTableCell>
            <StyledTableCell >
                <SwitchPermissionComponent
                    checked={row.remover}
                    rowId={row.id}
                    name="remover" />
            </StyledTableCell>
        </StyledTableRow>
    );

}

export default PerfilMenuTableRow;