import React from 'react';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import FuncionarioService from '../../services/FuncionarioService';

export default function ComboFuncionario(props) {
    const { id, value, erro, callback, label } = props;
    const [funcionario, setFuncionario] = React.useState(value);

    React.useEffect(() => {
        setFuncionario(value);
    }, [value]);

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                value={funcionario}
                retrieveDataFunction={FuncionarioService.getListaFuncionarios}
                label={label}
                placeholder="<< Selecione um funcionário >>"
                error={erro}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome }
            />
        </React.Fragment>
    );
}