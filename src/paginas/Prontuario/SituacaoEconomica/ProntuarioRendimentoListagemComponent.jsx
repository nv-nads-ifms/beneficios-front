import React from "react";
import { Grid, TableCell, TableRow, Typography } from "@material-ui/core";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import ProntuarioRendimentoTableRowComponent from "./ProntuarioRendimentoTableRowComponent";
import { ccyFormat } from "../../../api/format";
import { createListaAuxilios, createListaRendimentos } from "../../../models/Prontuario";
import ProntuarioAuxilioTableRowComponent from "./ProntuarioAuxilioTableRowComponent";

const rendimentoCols = [
    { id: 'status', label: 'Status' },
    { id: 'parentesco', label: 'Parentesco' },
    { id: 'nome', label: 'Nome' },
    { id: 'condicaoTrabalho', label: 'Condição de trabalho' },
    { id: 'valor', label: 'Valor' },
];

const auxilioCols = [
    { id: 'status', label: 'Status' },
    { id: 'parentesco', label: 'Parentesco' },
    { id: 'nome', label: 'Nome' },
    { id: 'programaGoverno', label: 'Benefício/Programa de Governo' },
    { id: 'valor', label: 'Valor' },
];

export default function ProntuarioRendimentoListagemComponent(props) {
    const { prontuario } = props;
    const [rendimentos, setRendimentos] = React.useState([]);
    const [auxilios, setAuxilios] = React.useState([]);

    React.useEffect(() => {
        setRendimentos(createListaRendimentos(prontuario));
        setAuxilios(createListaAuxilios(prontuario));
    }, [prontuario]);

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <SimpleTable
                    emptyRows={rendimentos.length === 0}
                    columns={rendimentoCols}
                    notShowActions
                >
                    {rendimentos.map((row, key) => {
                        return (
                            <ProntuarioRendimentoTableRowComponent
                                key={"row-" + key}
                                row={row} />
                        );
                    })}
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Typography variant="h6" color="textPrimary" component="span">
                                Subtotal:
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6" color="textPrimary" component="span">
                                {ccyFormat(prontuario.valorTotalRendimentos)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </SimpleTable>
            </Grid>
            <Grid item>
                <SimpleTable
                    emptyRows={auxilios.length === 0}
                    columns={auxilioCols}
                    notShowActions
                >
                    {auxilios.map((row, key) => {
                        return (
                            <ProntuarioAuxilioTableRowComponent
                                key={"row-" + key}
                                row={row} />
                        );
                    })}
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Typography variant="h6" color="textPrimary" component="span">
                                Subtotal:
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6" color="textPrimary" component="span">
                                {ccyFormat(prontuario.valorTotalAuxilios)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </SimpleTable>
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Grid container spacing={0} direction="column" alignItems="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textPrimary" component="span">
                                    Valor total:
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={0} direction="column" alignItems="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textPrimary" component="span">
                                    {ccyFormat(prontuario.valorTotalRendimentos + prontuario.valorTotalAuxilios)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}