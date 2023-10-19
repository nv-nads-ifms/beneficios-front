import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    IconButton, Tooltip
} from '@mui/material';
import DataService from '../../../api/services/DataServices';
import { DNAStatus } from '../../../api/utils/constants';
import { deleteModalMessage, saveModalMessage, swalWithBootstrapButtons } from '../../../api/utils/modalMessages';

import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { objectContext } from '../../../contexts/objectContext';

function DNAFormDialog(props) {
    const {
        children, id_value,
        texto_titulo_formulario,
        datacontrol, objectfilefieldname,
        open,
        data_source_url,
        on_edit_func, on_close_func } = props;

    const { object, setObject, emptyObject } = React.useContext(objectContext);

    const dataService = React.useMemo(
        () => new DataService(`/${data_source_url}`),
        [data_source_url]);

    const [buttonStatus, setButtonStatus] = React.useState(false);
    React.useEffect(() => {
        setButtonStatus(datacontrol === DNAStatus.VIEW);
    }, [datacontrol]);

    React.useEffect(() => {
        if ((Array.isArray(id_value) && id_value.length === 0) ||  id_value <= 0) {
            setObject(emptyObject);
        } else {
            dataService.getById(Array.isArray(id_value) ? id_value.join("/") : id_value)
                .then(response => {
                    if (response.hasOwnProperty('status') && response.status === 404) {
                        swalWithBootstrapButtons.fire('Ooops!', `Dados não encontrados!`, 'error');
                        on_close_func();
                    } else {
                        setObject(response.data);
                    }
                });
        }
    }, [dataService, emptyObject, id_value, on_close_func, setObject]);

    const handleSave = React.useCallback(() => {
        saveModalMessage(
            () => {
                if (objectfilefieldname) {
                    return dataService.saveWithFile(id_value, object, objectfilefieldname);
                }
                return dataService.save(id_value, object);
            },
            () => on_close_func())
    }, [dataService, id_value, object, objectfilefieldname, on_close_func]);

    const handleDelete = React.useCallback(() => {
        deleteModalMessage(null,
            () => dataService.delete(id_value),
            () => on_close_func());
    }, [dataService, id_value, on_close_func]);

    const actions = React.useMemo(() => [
        { icon: <DeleteIcon fontSize='large' />, name: 'Excluir os dados do formulário', handle: handleDelete, disabled: !buttonStatus },
        { icon: <EditIcon fontSize='large' />, name: 'Habilitar os campos para alteração', handle: on_edit_func, disabled: !buttonStatus },
        { icon: <SaveIcon fontSize='large' />, name: 'Salvar os dados do formulário', handle: handleSave, disabled: buttonStatus },
        { icon: <CancelIcon fontSize='large' />, name: 'Fechar', handle: on_close_func, disabled: false },
    ], [buttonStatus, handleDelete, handleSave, on_close_func, on_edit_func]);

    return (
        <Dialog
            open={open}
            onClose={on_close_func}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
        >
            <DialogTitle>{texto_titulo_formulario}</DialogTitle>
            <Divider variant='middle' />
            <DialogContent>
                <Box sx={{ p: 1, m: 1 }}>
                    {children}
                </Box>
            </DialogContent>
            <Divider variant='middle' />
            <DialogActions>
                {actions.map((action) => (
                    <Tooltip key={action.name} title={action.name}>
                        <IconButton
                            key={action.name}
                            onClick={action.handle}
                            disabled={action.disabled}
                        >
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </DialogActions>
        </Dialog>
    );
}

DNAFormDialog.propTypes = {
    // children: PropTypes.element.isRequired,
    id_value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    texto_titulo_formulario: PropTypes.string.isRequired,
    data_source_url: PropTypes.string.isRequired,
    datacontrol: PropTypes.oneOf([DNAStatus.VIEW, DNAStatus.EDIT]).isRequired,
    objectfilefieldname: PropTypes.string,
    on_edit_func: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    on_close_func: PropTypes.func.isRequired
}

export default DNAFormDialog;