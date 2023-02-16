import React from 'react';
import { Chip, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { green, orange, red, yellow } from "@material-ui/core/colors";
import { Status } from "../../api/utils/constants";

const useStyle = makeStyles({
    orange: { backgroundColor: orange[400], color: '#ffffff' },
    yellow: { backgroundColor: yellow[700], color: '#ffffff' },
    red: { backgroundColor: red[400], color: '#ffffff' },
    green: { backgroundColor: green[400], color: '#ffffff' },
    blue: { backgroundColor: blue[700], color: '#ffffff' },
});

export default function ChipStatus(props) {
    const { label, status } = props;
    const classes = useStyle();
    const texto = label != null ? label : status;

    switch (status) {
        case Status.ABERTO:
            return <Chip label={texto} />;
        case Status.EM_ANALISE:
        case Status.PENDENTE:
            return <Chip label={texto} className={classes.yellow} />;
        case Status.INICIADO:
        case Status.PARCIAL:
            return <Chip label={texto} className={classes.blue} />;
        case Status.NEGADO:
        case Status.INATIVO:
            return <Chip label={texto} className={classes.red} />;
        default:
            return <Chip label={texto} className={classes.green} />;
    }
}