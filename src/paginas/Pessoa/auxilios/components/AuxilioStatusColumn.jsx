import React from 'react';
import { Status } from '../../../../api/utils/constants';
import ChipStatus from '../../../../components/CustomButtons/ChipStatus';

function AuxilioStatusColumn(params) {
    const { row } = params;
    
    const [status, setStatus] = React.useState('');
    const [label, setLabel] = React.useState('');

    const isDemitido = React.useMemo(() => {
        return !(row.demissao === '' || row.demissao == null);
    }, [row]);

    React.useEffect(() => {
        if (!isDemitido) {
            setLabel('Ativo');
            setStatus(Status.ATIVO);
        } else {
            setLabel('Encerrado');
            setStatus(Status.INATIVO);
        }
    }, [isDemitido]);
    
    return (
        <ChipStatus label={label} status={status} />
    );
}

export default AuxilioStatusColumn;