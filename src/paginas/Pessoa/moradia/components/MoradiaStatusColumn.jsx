import React from 'react';
import { Status } from '../../../../api/utils/constants';
import ChipStatus from '../../../../components/CustomButtons/ChipStatus';

function MoradiaStatusColumn(params) {
    const { row } = params;
    
    const [status, setStatus] = React.useState('');
    const [label, setLabel] = React.useState('');

    const isOcupado = React.useMemo(() => {
        return row.dataSaida == null || row.dataSaida === '';
    }, [row]);

    React.useEffect(() => {
        if (isOcupado) {
            setLabel('Ocupado');
            setStatus(Status.ATIVO);
        } else {
            setLabel('Desocupado');
            setStatus(Status.INATIVO);
        }
    }, [isOcupado]);
    
    return (
        <ChipStatus label={label} status={status} />
    );
}

export default MoradiaStatusColumn;