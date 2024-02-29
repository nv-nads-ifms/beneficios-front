import React from 'react';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

export default function ComboUnidadeAtendimento(props) {
    const { id, value, disabled, callback, label } = props;
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(value);

    React.useEffect(() => {
        setUnidadeAtendimento(value);
    }, [value]);

    return (
        <DNAAutocomplete
            id={id}
            path="unidades-de-atendimento"
            placeholder="<< Selecione uma Unidade de Atendimento >>"
            input_label={label}
            value={unidadeAtendimento}
            disabled={disabled}
            onChange={(event, newValue) => callback(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.numeroDaUnidade + " - " +
                option.nome + (option.matriz ? " [Matriz]" : "")}
        />
    );
}