import React from 'react';
import { House } from '@mui/icons-material';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Moment from "moment";
import { ccyFormat } from '../../../../api/format';

function MoradiaCondicaoColumn(params) {
    const { row, value } = params;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <House />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={row.tipoMoradia.nome}
                secondary={
                    <React.Fragment>
                        <Typography variant="body2">
                            Ocupada em: {Moment(row.dataOcupacao).format('DD/MM/Y')}
                            {!(row.dataSaida == null || row.dataSaida === '') && (
                                <Typography variant="body2">
                                    Desocupada em: {Moment(row.dataSaida).format('DD/MM/Y')}
                                </Typography>
                            )}
                        </Typography>
                        <Typography variant="body2">
                            {value.nome} no valor de {ccyFormat(row.valor)}.
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default MoradiaCondicaoColumn;