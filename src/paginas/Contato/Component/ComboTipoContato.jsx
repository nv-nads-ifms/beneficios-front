import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import ContatoService from '../../../services/ContatoService';
import ContatoCadastroModal from './ContatoCadastroModal';

export default function ComboTipoContato(props) {
    const { id, value, erros, callback } = props;
    const [tipoContato, setTipoContato] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setTipoContato(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setTipoContato(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={tipoContato}
                retrieveDataFunction={ContatoService.getListaContatos}
                label="Tipo de Contato"
                placeholder="<< Selecione um Tipo de Contato >>"
                error={erros.documentoDto}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <ContatoCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}