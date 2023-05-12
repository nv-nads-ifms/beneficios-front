import React from 'react';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import PerfilService from '../../services/PerfilService';

export default function ComboPerfil(props) {
    const { id, value, erro, callback, label } = props;
    const [perfil, setPerfil] = React.useState(value);

    React.useEffect(() => {
        setPerfil(value);
    }, [value]);

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                value={perfil}
                retrieveDataFunction={PerfilService.getListaPerfis}
                label={label}
                placeholder="<< Selecione um perfil >>"
                error={erro}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome }
            />
        </React.Fragment>
    );
}