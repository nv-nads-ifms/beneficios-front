import React from 'react';
import DocumentoService from '../../../services/DocumentoService';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import DocumentoCadastroModal from './DocumentoCadastroModal';

export default function ComboTipoDocumento(props) {
    const { id, value, erros, callback } = props;
    const [tipoDocumento, setTipoDocumento] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setTipoDocumento(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setTipoDocumento(value);
        callback(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={tipoDocumento}
                retrieveDataFunction={DocumentoService.getListaDocumentos}
                label="Documento"
                placeholder="<< Selecione um Documento >>"
                error={erros.documentoDto}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.descricao}
                onShowInputModal={onShowCadastro}
            />

            <DocumentoCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}