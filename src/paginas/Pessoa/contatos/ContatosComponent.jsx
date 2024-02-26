import React from 'react';

import ContatoFormComponent from './ContatoFormComponent';
import ChipContatoComponent from './ChipContatoComponent';
import { objectContext } from '../../../contexts/objectContext';
import { setFieldValue } from '../../../api/utils/util';
import { Avatar, Card, CardContent, CardHeader, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Add, Contacts } from '@mui/icons-material';
import { swalWithBootstrapButtons } from '../../../api/utils/modalMessages';

export default function ContatosComponent(props) {
    const { disabled } = props;

    /* Recupera o objeto Pessoa/Fornecedor */
    const { object, setObject } = React.useContext(objectContext);
    const [contatos, setContatos] = React.useState([]);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (object != null) {
            if (object.hasOwnProperty('titular'))
                setContatos(object.titular.contatos);
            else
                setContatos(object.contatos);

        } else {
            setContatos([]);
        }
    }, [object]);


    const updateContatos = (list) => {
        setFieldValue('contatos', list, setObject, object);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = contatos.filter(obj => !(
            obj.tipoContato.id === value.tipoContato.id &&
            obj.descricao === value.descricao
        ));
        updateContatos(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        let list = [];
        list = list.concat(contatos);

        const index = list.findIndex(obj => (
            obj.tipoContato.id === value.tipoContato.id &&
            obj.descricao === value.descricao
        ));

        if (index !== -1) {
            swalWithBootstrapButtons.fire(
                'Ooops!',
                `O Contato informado já foi adicionado.`,
                'warning'
            );
        } else {
            list.push(value);
            updateContatos(list);
        }
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
        <React.Fragment>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="contatos">
                            <Contacts fontSize="default" />
                        </Avatar>
                    }
                    title="Contatos"
                    action={
                        <Tooltip title={"Adicionar um novo contato"}>
                            <IconButton
                                aria-label="Adicionar Contato"
                                disabled={disabled}
                                onClick={handleOpen}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    <Stack direction={'row'} spacing={1}>
                        {contatos.map((obj, index) => {
                            return <ChipContatoComponent
                                key={index}
                                contato={obj}
                                disabled={disabled}
                                onDelete={() => handleDelete(obj)} />
                        })}
                    </Stack>
                    {isEmpty() &&
                        (<Typography variant="body1" color="textSecondary" component="p">
                            Contato inexistente
                        </Typography>)}
                </CardContent>
            </Card>

            <ContatoFormComponent
                openModal={open}
                onSave={handleSave}
                onClose={handleClose} />
        </React.Fragment>
    );
}