import React from 'react';
import {
    Avatar, List, ListItem, ListItemAvatar, ListItemText,
    makeStyles, Tooltip, Typography
} from '@material-ui/core';
import { ChipIcon } from '../../../api/format';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        // boxShadow: '3px 3px 10px 3px #bbb',
    },
    inline: {
        display: 'inline',
    },
}));

export default function ListContatoView(props) {
    const { contatoPessoa } = props;
    const classes = useStyles();
    const tipoContato = contatoPessoa.tipoContatoDto;

    return (
        <List className={classes.root} dense={true}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={tipoContato.descricao}>
                        <Avatar>
                            {ChipIcon(tipoContato.descricao)}
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
                            {tipoContato.descricao}
                        </Typography>
                    }
                />
            </ListItem>
        </List >
    );
}