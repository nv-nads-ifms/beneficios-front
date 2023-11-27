import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import OrgaoExpedidorCadastroModal from './OrgaoExpedidorCadastroModal';
import OrgaoExpedidorService from '../../../services/OrgaoExpedidorService';

export default function ComboOrgaoExpedidor(props) {
    const { id, value, erros, callback } = props;
    const [orgaoExpedidor, setOrgaoExpedidor] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setOrgaoExpedidor(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setOrgaoExpedidor(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={orgaoExpedidor}
                retrieveDataFunction={OrgaoExpedidorService.getListaOrgaosExpedidores}
                label="Órgão Expedidor"
                placeholder="<< Selecione um Órgão Expedidor >>"
                error={erros}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <OrgaoExpedidorCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}