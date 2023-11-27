import React from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts';
import ChipDocumentoComponent from './ChipDocumentoComponent';
import DocumentoFormComponent from './DocumentoFormComponent'

export default function DocumentosComponent(props) {
    const { documentos, disabled, callback } = props;
    const [open, setOpen] = React.useState(false);
    const [documento, setDocumento] = React.useState(null);

    const handleOpen = () => {
        setDocumento(null);
        setOpen(true);
    };

    const handleEdit = (event, value) => {
        setDocumento(value);
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = documentos.map(obj => {
            if (obj.numero === value.numero &&
                obj.documento.id === value.documento.id) {
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
        const index = documentos.findIndex(obj => (
            obj.numero === value.numero &&
            obj.documento.id === value.documento.id
        ));

        if (index !== -1) {
            documentos[index] = value;
        } else {
            documentos.push(value);
        }
        setDocumento(value);
        callback(documentos);
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
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="documentos">
                            <ContactsIcon fontSize="default" />
                        </Avatar>
                    }
                    title="Documentos"
                    action={
                        callback != null &&
                        <Tooltip title={"Adicionar um novo documento"}>
                            <IconButton
                                aria-label="Adicionar Documento"
                                disabled={disabled}
                                onClick={handleOpen}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    {documentos.map((obj, index) => {
                        if (callback != null && !obj.deleted) {
                            return <ChipDocumentoComponent
                                key={index}
                                disabled={disabled}
                                documento={obj}
                                onEdit={(event, value) => handleEdit(event, obj)}
                                onDelete={() => handleDelete(obj)} />

                        } else if (callback == null) {
                            return <ChipDocumentoComponent
                                key={index}
                                disabled={disabled}
                                documento={obj} />

                        }
                        return obj;
                    })}
                    {isEmpty() &&
                        (<Typography variant="body1" color="textSecondary" component="p">
                            Documento inexistente
                        </Typography>)}
                </CardContent>
            </Card>
            <DocumentoFormComponent
                openModal={open}
                value={documento}
                callback={handleSave}
                onClose={handleClose} />
        </div>
    );
}