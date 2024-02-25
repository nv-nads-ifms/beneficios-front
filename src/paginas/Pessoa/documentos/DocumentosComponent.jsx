import React from 'react';

import ChipDocumentoComponent from './ChipDocumentoComponent';
import DocumentoFormComponent from './DocumentoFormComponent'
import { objectContext } from '../../../contexts/objectContext';
import { Avatar, Card, CardContent, CardHeader, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Add, Contacts } from '@mui/icons-material';
import { setFieldValue } from '../../../api/utils/util';
import { swalWithBootstrapButtons } from '../../../api/utils/modalMessages';

export default function DocumentosComponent(props) {
    const { disabled } = props;

    /* Recupera o objeto Pessoa/Fornecedor */
    const { object, setObject } = React.useContext(objectContext);
    const [documentos, setDocumentos] = React.useState([]);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (object != null) {
            setDocumentos(object.titular.documentos);
        } else {
            setDocumentos([]);
        }
    }, [object]);

    const updateDocumentos = (list) => {
        setFieldValue('documentos', list, setObject, object);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = documentos.filter(obj => !(
            obj.numero === value.numero &&
            obj.tipoDocumento.id === value.tipoDocumento.id
        ));
        updateDocumentos(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        let list = [];
        list = list.concat(documentos);
        const index = list.findIndex(obj => (
            obj.numero === value.numero &&
            obj.tipoDocumento.id === value.tipoDocumento.id
        ));

        if (index !== -1) {
            swalWithBootstrapButtons.fire(
                'Ooops!',
                `O Documento informado já foi adicionado.`,
                'warning'
            );
        } else {
            list.push(value);
            updateDocumentos(list);
        }
    }

    const isEmpty = () => {
        if (documentos.length === 0) {
            return true;
        }
        const count = documentos.map(obj => obj.deleted ? 1 : 0)
            .reduce((acc, cur) => acc + cur);

        return count === documentos.length;
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="documentos">
                            <Contacts fontSize="default" />
                        </Avatar>
                    }
                    title="Documentos"
                    action={
                        <Tooltip title={"Adicionar um novo documento"}>
                            <IconButton
                                aria-label="Adicionar Documento"
                                disabled={disabled}
                                onClick={handleOpen}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    <Stack direction={'row'} spacing={1}>
                        {documentos.map((obj, index) => {
                            return <ChipDocumentoComponent
                                key={index}
                                disabled={disabled}
                                documento={obj}
                                onDelete={() => handleDelete(obj)} />

                        })}
                    </Stack>
                    {isEmpty() &&
                        (<Typography variant="body1" color="textSecondary" component="p">
                            Documento inexistente
                        </Typography>)}
                </CardContent>
            </Card>

            <DocumentoFormComponent
                openModal={open}
                onSave={handleSave}
                onClose={handleClose}
            />
        </React.Fragment>
    );
}