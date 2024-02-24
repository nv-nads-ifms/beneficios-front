import React from 'react';
import Moment from 'moment';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

function PessoaNomeColumn(params) {
    const { row, value } = params;

    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar
                    aria-label="pessoa"
                    src={"data:image/png;base64," + row.foto} />
            </ListItemAvatar>
            <ListItemText 
                primary={value}
                secondary={`Nascimento: ${Moment(row.nascimento).format('DD/MM/Y')}`} />
        </ListItem>
    );
}

export default PessoaNomeColumn;