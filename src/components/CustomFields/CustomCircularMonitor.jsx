import React from 'react';

import { Status } from '../../api/utils/constants';
import { blue, green, orange, red, yellow } from '@mui/material/colors';
import { Box, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material';

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

function getClassByStatus(status) {
    switch (status) {
        case Status.AUTORIZADO:
        case Status.ATIVO:
        case Status.FINALIZADO:
            return { backgroundColor: green[400], color: '#ffffff' };
        case Status.EM_ANALISE:
        case Status.PENDENTE:
            return { backgroundColor: yellow[700], color: '#ffffff' };
        case Status.INICIADO:
        case Status.PARCIAL:
            return { backgroundColor: blue[700], color: '#ffffff' };
        case Status.NEGADO:
        case Status.INATIVO:
            return { backgroundColor: red[400], color: '#ffffff' };
        default:
            return { backgroundColor: orange[400], color: '#ffffff' };
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

    return (
        <Card style={getClassByStatus(status)}>
            <CardHeader
                avatar={setPercentual(percentual)}
                title={setTitle(total)}
                subheader={setSubheader(status)}
            />
        </Card>
    );
}