import React from 'react';
import {
    makeStyles, Box, Card, CardHeader, CircularProgress,
    Typography, Divider
} from '@material-ui/core';
import { Status } from '../../api/utils/constants';
import { blue, green, orange, red, yellow } from '@material-ui/core/colors';

const boxSx = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const useStyle = makeStyles({
    orange: { backgroundColor: orange[400], color: '#ffffff' },
    yellow: { backgroundColor: yellow[700], color: '#ffffff' },
    red: { backgroundColor: red[400], color: '#ffffff' },
    green: { backgroundColor: green[400], color: '#ffffff' },
    blue: { backgroundColor: blue[700], color: '#ffffff' },
});

function getClassByStatus(classes, status) {
    switch (status) {
        case Status.AUTORIZADO:
        case Status.ATIVO:
        case Status.FINALIZADO:
            return classes.green;
        case Status.EM_ANALISE:
        case Status.PENDENTE:
            return classes.yellow;
        case Status.INICIADO:
        case Status.PARCIAL:
            return classes.blue;
        case Status.NEGADO:
        case Status.INATIVO:
            return classes.red;
        default:
            return classes.orange;
    }
}

function setTitle(value) {
    return (
        <Typography align="center" variant="h3" style={{ fontWeight: 500 }}>
            {value}
        </Typography>
    );
}

function setSubheader(value) {
    return (
        <React.Fragment>
            <Divider />
            <Typography align="center" variant="body2" component="div" color="textSecondary" >
                {value}
            </Typography>
        </React.Fragment>
    );
}

function setPercentual(value) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size={75} variant="determinate" value={value} />
            <Box sx={boxSx}>
                <Typography align="center" variant="body1" component="div" color="text.secondary">
                    {`${value}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function CustomCircularMonitor(props) {
    const { status, total, percentual } = props;
    const classes = useStyle();

    return (
        <Card className={getClassByStatus(classes, status)}>
            <CardHeader
                avatar={setPercentual(percentual)}
                title={setTitle(total)}
                subheader={setSubheader(status)}
            />
        </Card>
    );
}