import React from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts';
import ContatoFormComponent from './ContatoFormComponent';
import ChipContatoComponent from './ChipContatoComponent';

export default function ContatosComponent(props) {
    const { contatos, disabled, callback } = props;
    const [open, setOpen] = React.useState(false);
    const [contato, setContato] = React.useState(null);

    const handleOpen = () => {
        setContato(null);
        setOpen(true);
    };

    const handleEdit = (event, value) => {
        setContato(value);
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = contatos.map(obj => {
            if (obj.tipoContatoDto.id === value.tipoContatoDto.id &&
                obj.descricao === value.descricao) {
                obj.deleted = true;
            }
            return obj;
        });
        callback(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        const index = contatos.findIndex(obj => (
            obj.tipoContatoDto.id === value.tipoContatoDto.id &&
            obj.descricao === value.descricao
        ));

        if (index !== -1) {
            contatos[index] = value;
        } else {
            contatos.push(value);
        }
        setContato(value);
        callback(contatos);
    }

    const isEmpty = () => {
        if (contatos.length === 0) {
            return true;
        }
        const count = contatos.map(obj => obj.deleted ? 1 : 0)
            .reduce((acc, cur) => acc + cur);

        return count === contatos.length;
    }

    return (
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="contatos">
                            <ContactsIcon fontSize="default" />
                        </Avatar>
                    }
                    title="Contatos"
                    action={
                        callback != null &&
                        <Tooltip title={"Adicionar um novo contato"}>
                            <IconButton
                                aria-label="Adicionar Contato"
                                disabled={disabled}
                                onClick={handleOpen}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    {contatos.map((obj, index) => {
                        if (callback != null && !obj.deleted) {
                            return <ChipContatoComponent
                                key={index}
                                contato={obj}
                                disabled={disabled}
                                onEdit={(event, value) => handleEdit(event, obj)}
                                onDelete={() => handleDelete(obj)} />
                        } else if (callback == null) {
                            return <ChipContatoComponent
                                key={index}
                                contato={obj}
                                disabled={disabled} />
                        }
                        return obj;
                    })}
                    {isEmpty() &&
                        (<Typography variant="body1" color="textSecondary" component="p">
                            Contato inexistente
                        </Typography>)}
                </CardContent>
            </Card>
            <ContatoFormComponent
                openModal={open}
                value={contato}
                callback={handleSave}
                onClose={handleClose} />
        </div>
    );
}