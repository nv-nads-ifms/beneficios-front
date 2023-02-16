import React from 'react';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import UnidadeAtendimentoService from '../../services/UnidadeAtendimentoService';

export default function ComboUnidadeAtendimento(props) {
    const { id, value, disabled, callback, label } = props;
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(value);

    React.useEffect(() => {
        setUnidadeAtendimento(value);
    }, [value]);

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                value={unidadeAtendimento}
                retrieveDataFunction={UnidadeAtendimentoService.getListaUnidadeAtendimentos}
                label={label}
                placeholder="<< Selecione uma Unidade de Atendimento >>"
                disabled={disabled}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.numeroDaUnidade + " - " +
                                     option.nome + (option.matriz ? " [Matriz]" : "")}
            />
        </React.Fragment>
    );
}