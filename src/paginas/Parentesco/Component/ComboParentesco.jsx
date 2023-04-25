import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import ParentescoService from '../../../services/ParentescoService';
import ParentescoCadastroModal from './ParentescoCadastroModal';

export default function ComboParentesco(props) {
    const { disabled, id, value, erros, callback } = props;
    const [parentesco, setParentesco] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setParentesco(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setParentesco(value);
        callback(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                disabled={disabled}
                length={length}
                value={parentesco}
                retrieveDataFunction={ParentescoService.getListaParentescos}
                label="Parentesco"
                placeholder="<< Selecione um Parentesco >>"
                error={erros}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <ParentescoCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}