import React from 'react';
import {
    Avatar, List, ListItem, ListItemAvatar, ListItemText,
    Tooltip, Typography
} from '@mui/material';
import { ChipIcon } from '../../../api/format';
import { emptyBaseObject } from '../../../api/utils/constants';

export default function ListContatoView(props) {
    const { contatoPessoa } = props;

    const tipoContato = React.useMemo(() => {
        if (contatoPessoa != null) {
            return contatoPessoa.tipoContato;
        }
        return emptyBaseObject;
    }, [contatoPessoa]);

    return (
        <List dense={true}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={tipoContato.nome}>
                        <Avatar>
                            {ChipIcon(tipoContato.nome)}
                        </Avatar>
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle2">
                            {contatoPessoa.descricao}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption" color="textSecondary">
                            {tipoContato.nome}
                        </Typography>
                    }
                />
            </ListItem>
        </List >
    );
}