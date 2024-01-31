import React from 'react';
import { LocationOn } from '@mui/icons-material';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

function MoradiaEnderecoColumn(params) {
    const { value } = params;
console.log(value)
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <LocationOn />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body2">
                        {`${value.logradouroNome}, ${value.numero}${value.complemento != null ? ', ' : ''}`} {value.complemento}
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        <Typography variant="body2" color="textSecondary">
                            {value.bairroNome}, {value.cidadeNome} - {value.ufSigla}
                        </Typography>
                        {(value.referencia != null && value.referencia !== '') && (
                            <Typography variant="body2" color="textSecondary">
                                <b>Referência:</b> {value.referencia}
                            </Typography>
                        )}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default MoradiaEnderecoColumn;